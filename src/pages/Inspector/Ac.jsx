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
  SnackbarContent,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  useGetInspectionReportQuery,
  useInspectionReportMutation,
} from "../../services/inspectorapi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UploadImage4 from "../../ui/UploadImageComponents/UploadImage4";
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi";
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
              `🗜️ Compressed: ${file.name} | Original: ${(file.size / 1024 / 1024).toFixed(2)} MB → Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
            );
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
// ─────────────────────────────────────────────────────────────────────────────

const Ac = ({ setCheckstep }) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "AC",
  });

  const [formData, setFormData] = useState({
    ACCooling: [],
    Heater: [],
    ClimateControlAC: [],
    AcVent: [],
  });

  const [uploadedImages, setUploadedImages] = useState({
    ACCoolings: null,
    Heaters: null,
    ClimateControlACs: null,
    AcVents: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [inspectionReport] = useInspectionReportMutation();
  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation();
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable, setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("");

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "ACCooling":
          setFormData((prev) => ({ ...prev, ACCooling: item.comment }));
          setUploadedImages((prev) => ({ ...prev, ACCoolings: item.documentLink }));
          break;
        case "Heater":
          setFormData((prev) => ({ ...prev, Heater: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Heaters: item.documentLink }));
          break;
        case "ClimateControlAC":
          setFormData((prev) => ({ ...prev, ClimateControlAC: item.comment }));
          setUploadedImages((prev) => ({ ...prev, ClimateControlACs: item.documentLink }));
          break;
        case "AcVent":
          setFormData((prev) => ({ ...prev, AcVent: item.comment }));
          setUploadedImages((prev) => ({ ...prev, AcVents: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);

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
          doctype: "AC",
          subtype: lables,
          comment: selectfiled,
        };

        try {
          const res = await inspectionReport({ inspectionData, formDataToSend });
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
      formDataToSend1.append("doctype", "AC");
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

  if (
    formData.ACCooling.length > 0 &&
    formData.AcVent.length > 0 &&
    formData.ClimateControlAC.length > 0 &&
    formData.Heater.length > 0
  ) {
    setCheckstep(true);
  } else {
    setCheckstep(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
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
        ACCooling: "ACCoolings",
        Heater: "Heaters",
        ClimateControlAC: "ClimateControlACs",
        AcVent: "AcVents",
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
      doctype: "AC",
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

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5">
        AC
      </Typography>
      <Grid container spacing={3}>

        {/* AC Cooling */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>AC Cooling</InputLabel>
            <Select
              required
              name="ACCooling"
              value={formData.ACCooling}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Misfiring">Ineffective</MenuItem>
              <MenuItem value="Long cranking due to weak Compression">Not Working</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: "10px" }}>
              Submit Without image
            </Button>
            <label htmlFor="upload-ACCooling" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageClick} />
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button onClick={() => handleReset("ACCooling")} size="small" variant="outlined" color="secondary" style={{ marginTop: "10px" }}>
              Reset
            </Button>
          </div>
          {uploadedImages.ACCoolings && (
            <img src={uploadedImages.ACCoolings} alt="Uploaded" style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }} />
          )}
        </Grid>

        {/* Heater */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Heater</InputLabel>
            <Select
              required
              name="Heater"
              value={formData.Heater}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Misfiring">Ineffective</MenuItem>
              <MenuItem value="Long cranking due to weak Compression">Not Working</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: "10px" }}>
              Submit Without image
            </Button>
            <label htmlFor="upload-Heater" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageClick} />
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button onClick={() => handleReset("Heater")} size="small" variant="outlined" color="secondary" style={{ marginTop: "10px" }}>
              Reset
            </Button>
          </div>
          {uploadedImages.Heaters && (
            <img src={uploadedImages.Heaters} alt="Uploaded" style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }} />
          )}
        </Grid>

        {/* Climate Control AC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Climate Control AC</InputLabel>
            <Select
              required
              name="ClimateControlAC"
              value={formData.ClimateControlAC}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Misfiring">Ineffective</MenuItem>
              <MenuItem value="Long cranking due to weak Compression">Not Working</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: "10px" }}>
              Submit Without image
            </Button>
            <label htmlFor="upload-ClimateControlAC" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageClick} />
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button onClick={() => handleReset("ClimateControlAC")} size="small" variant="outlined" color="secondary" style={{ marginTop: "10px" }}>
              Reset
            </Button>
          </div>
          {uploadedImages.ClimateControlACs && (
            <img src={uploadedImages.ClimateControlACs} alt="Uploaded" style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }} />
          )}
        </Grid>

        {/* AC Vent */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Ac Vent</InputLabel>
            <Select
              required
              name="AcVent"
              value={formData.AcVent}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: "10px" }}>
              Submit Without image
            </Button>
            <label htmlFor="upload-AcVent" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageClick} />
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button onClick={() => handleReset("AcVent")} size="small" variant="outlined" color="secondary" style={{ marginTop: "10px" }}>
              Reset
            </Button>
          </div>
          {uploadedImages.AcVents && (
            <img src={uploadedImages.AcVents} alt="Uploaded" style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }} />
          )}
        </Grid>

      </Grid>

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

export default Ac;