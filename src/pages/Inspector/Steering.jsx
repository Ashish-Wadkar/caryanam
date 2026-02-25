/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  Typography,
  Button,
  Modal,
  makeStyles,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  useGetInspectionReportQuery,
  useInspectionReportMutation,
} from "../../services/inspectorapi";
import { useParams } from "react-router-dom";
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UploadImage4 from "../../ui/UploadImageComponents/UploadImage4";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    maxWidth: "90%",
    maxHeight: "90%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
}));

// ─── Image Compression Helper ────────────────────────────────────────────────
// Compresses an image File to the given quality (0.0 – 1.0).
// 0.5 = 50% quality → typically reduces a 30 MB image to 2–5 MB.
const compressImage = (file, quality = 0.5) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            // ✅ View compression result in browser DevTools → Console tab
            console.log(
              `🗜️ Compressed: ${file.name} | Original: ${(file.size / 1024 / 1024).toFixed(2)} MB → Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`,
            );
            resolve(compressedFile);
          },
          "image/jpeg",
          quality,
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
// ─────────────────────────────────────────────────────────────────────────────

const Steering = ({ setCheckstep }) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Steering",
  });

  const [formData, setFormData] = useState({
    Steering: "",
    Brake: "",
    Suspension: "",
  });

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const [uploadedImages, setUploadedImages] = useState({
    Steerings: null,
    Brakes: null,
    Suspensions: null,
  });

  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable, setSelectedLable] = useState("");
  const [inspectionReport] = useInspectionReportMutation();
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "Steering":
          setFormData((prev) => ({ ...prev, Steering: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Steerings: item.documentLink,
          }));
          break;
        case "Brake":
          setFormData((prev) => ({ ...prev, Brake: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Brakes: item.documentLink }));
          break;
        case "Suspension":
          setFormData((prev) => ({ ...prev, Suspension: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Suspensions: item.documentLink,
          }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  if (
    formData.Brake !== "" &&
    formData.Steering !== "" &&
    formData.Suspension !== ""
  ) {
    setCheckstep(true);
  } else {
    setCheckstep(false);
  }

  // ─── handleFileChange (with 50% compression) ────────────────────────────────
  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    let file;
    let imageData;
    if (!event?.target) {
      file = event;
      imageData = file;
    } else {
      file = event.target.files[0];
    }

    if (!file) return;

    // Compress image to 50% quality before uploading
    const compressedFile = await compressImage(file, 0.5);

    const formDataToSend = new FormData();
    formDataToSend.append("image", compressedFile);

    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;
      setFormData({ ...formData, [fieldName]: imageData });

      if (lables) {
        const inspectionData = {
          documentType: "Inspection Report",
          beadingCarId: beadingCarId,
          doc: "",
          doctype: "Steering",
          subtype: lables,
          comment: selectfiled,
        };

        try {
          const res = await inspectionReport({
            inspectionData,
            formDataToSend,
          });
          refetch();

          if (res.data?.message === "success") {
            toast.success("Data Uploaded", { autoClose: 500 });
            setLables("");
            setSelectfiled("");
          } else {
            toast.error("Data Upload failed", { autoClose: 500 });
          }
        } catch (error) {
          alert("Data not Uploaded");
        }
      } else {
        toast.error("Input is required", { autoClose: 2000 });
      }
    };
    // Read the compressed file for preview
    reader.readAsDataURL(compressedFile);
  };
  // ────────────────────────────────────────────────────────────────────────────

  const handleSubmitWithoutImage = async () => {
    if (lables) {
      const formDataToSend1 = new FormData();
      formDataToSend1.append("beadingCarId", beadingCarId);
      formDataToSend1.append("doctype", "Steering");
      formDataToSend1.append("subtype", lables);
      formDataToSend1.append("comment", selectfiled);
      formDataToSend1.append("documentType", "InspectionReport");
      formDataToSend1.append("doc", "");

      try {
        const res = await addBiddingCarWithoutImage({ formDataToSend1 });
        refetch();

        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
          setLables("");
          setSelectfiled("");
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
      } catch (error) {
        toast.error("Data not Uploaded", { autoClose: 500 });
      }
    } else {
      toast.error("Input is required", { autoClose: 2000 });
    }
  };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key);
  };

  const fileInputRef = useRef(null);

  const handleCaptureImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ─── handleImageClick (with 50% compression + preview) ──────────────────────
  const handleImageClick = async (event) => {
    // If called with a string (image URL preview click), do nothing
    if (typeof event === "string") return;

    const file = event.target.files[0];
    if (!file) return;

    // Compress image to 50% quality before uploading
    const compressedFile = await compressImage(file, 0.5);

    // Generate a local preview URL and map lables → uploadedImages key
    const previewURL = URL.createObjectURL(compressedFile);
    if (lables) {
      const labelToImageKey = {
        Steering: "Steerings",
        Brake: "Brakes",
        Suspension: "Suspensions",
      };
      const imageKey = labelToImageKey[lables];
      if (imageKey) {
        setUploadedImages((prev) => ({ ...prev, [imageKey]: previewURL }));
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", compressedFile);

    const inspectionData = {
      documentType: "InspectionReport",
      beadingCarId: beadingCarId,
      doc: "",
      doctype: "Steering",
      subtype: lables,
      comment: selectfiled,
    };

    try {
      const res = await inspectionReport({ inspectionData, formDataToSend });
      refetch();

      if (res.data?.message === "success") {
        toast.success("Data Uploaded", { autoClose: 500 });
      } else {
        toast.error("Data Upload failed", { autoClose: 500 });
      }
    } catch (error) {
      toast.error("Data not Uploaded", { autoClose: 500 });
    }
  };
  // ────────────────────────────────────────────────────────────────────────────

  const handleReset = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
    setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null }));
    setLables("");
    setSelectfiled("");
  };

  return (
    <div>
      <div className="p-4">
        <Typography variant="h4" className="text-black font-bold pb-5">
          Steering
        </Typography>
        <Grid container spacing={3}>
          {/* Steering */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Steering</InputLabel>
              <Select
                required
                name="Steering"
                value={formData.Steering}
                onChange={handleChange}
              >
                <MenuItem value="Ok">Ok</MenuItem>
                <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <div className="flex gap-5">
              <Button
                onClick={handleSubmitWithoutImage}
                size="small"
                variant="contained"
                color="success"
                style={{ marginTop: "10px" }}
              >
                Submit Without image
              </Button>
              <label
                htmlFor="upload-Steering"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
              </label>
              <Button
                onClick={() => handleReset("Steering")}
                size="small"
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px" }}
              >
                Reset
              </Button>
            </div>
            {uploadedImages.Steerings && (
              <img
                src={uploadedImages.Steerings}
                alt="Uploaded"
                style={{
                  maxWidth: "20%",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            )}
          </Grid>

          {/* Brake */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Brake</InputLabel>
              <Select
                required
                name="Brake"
                value={formData.Brake}
                onChange={handleChange}
              >
                <MenuItem value="Ok">Ok</MenuItem>
                <MenuItem value="Noisy">Noisy</MenuItem>
                <MenuItem value="Hard Noise">Hard Noise</MenuItem>
                <MenuItem value="Not Working">Not Working</MenuItem>
              </Select>
            </FormControl>
            <div className="flex gap-5">
              <Button
                onClick={handleSubmitWithoutImage}
                size="small"
                variant="contained"
                color="success"
                style={{ marginTop: "10px" }}
              >
                Submit Without image
              </Button>
              <label
                htmlFor="upload-Brake"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
              </label>
              <Button
                onClick={() => handleReset("Brake")}
                size="small"
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px" }}
              >
                Reset
              </Button>
            </div>
            {uploadedImages.Brakes && (
              <img
                src={uploadedImages.Brakes}
                alt="Uploaded"
                style={{
                  maxWidth: "20%",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            )}
          </Grid>

          {/* Suspension */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Suspension</InputLabel>
              <Select
                required
                name="Suspension"
                value={formData.Suspension}
                onChange={handleChange}
              >
                <MenuItem value="Ok">Ok</MenuItem>
                <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                <MenuItem value="Weak">Weak</MenuItem>
                <MenuItem value="Not Working">Not Working</MenuItem>
              </Select>
            </FormControl>
            <div className="flex gap-5">
              <Button
                onClick={handleSubmitWithoutImage}
                size="small"
                variant="contained"
                color="success"
                style={{ marginTop: "10px" }}
              >
                Submit Without image
              </Button>
              <label
                htmlFor="upload-Suspension"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
              </label>
              <Button
                onClick={() => handleReset("Suspension")}
                size="small"
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px" }}
              >
                Reset
              </Button>
            </div>
            {uploadedImages.Suspensions && (
              <img
                src={uploadedImages.Suspensions}
                alt="Uploaded"
                style={{
                  maxWidth: "20%",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            )}
          </Grid>
        </Grid>
      </div>

      {/* Modal for camera capture */}
      <Modal open={captureModalOpen} onClose={() => setCaptureModalOpen(false)}>
        <div className={classes.paper}>
          <UploadImage4
            isOpen={captureModalOpen}
            onClose={() => setCaptureModalOpen(false)}
            onCapture={handleCaptureImage}
            handleCaptureImage={handleFileChange}
            selectfiled={selectedLable}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Steering;
