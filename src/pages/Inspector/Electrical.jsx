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

const Electrical = ({ setCheckstep }) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Eletrical",
  });

  const [formData, setFormData] = useState({
    FourPowerWindows: "",
    AirBagFeatures: "",
    MusicSystem: "",
    Sunroof: "",
    ABS: "",
    InteriorParkingSensor: "",
    Electricalwiring: "",
  });

  const [images, setImages] = useState({
    FourPowerWindowss: null,
    AirBagFeaturess: null,
    MusicSystems: null,
    Sunroofs: null,
    ABSs: null,
    InteriorParkingSensors: null,
    Electricalwirings: null,
  });

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable, setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("");
  const [inspectionReport] = useInspectionReportMutation();

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
        case "FourPowerWindows":
          setFormData((prev) => ({ ...prev, FourPowerWindows: item.comment }));
          setImages((prev) => ({
            ...prev,
            FourPowerWindowss: item.documentLink,
          }));
          break;
        case "AirBagFeatures":
          setFormData((prev) => ({ ...prev, AirBagFeatures: item.comment }));
          setImages((prev) => ({
            ...prev,
            AirBagFeaturess: item.documentLink,
          }));
          break;
        case "MusicSystem":
          setFormData((prev) => ({ ...prev, MusicSystem: item.comment }));
          setImages((prev) => ({ ...prev, MusicSystems: item.documentLink }));
          break;
        case "Sunroof":
          setFormData((prev) => ({ ...prev, Sunroof: item.comment }));
          setImages((prev) => ({ ...prev, Sunroofs: item.documentLink }));
          break;
        case "ABS":
          setFormData((prev) => ({ ...prev, ABS: item.comment }));
          setImages((prev) => ({ ...prev, ABSs: item.documentLink }));
          break;
        case "InteriorParkingSensor":
          setFormData((prev) => ({
            ...prev,
            InteriorParkingSensor: item.comment,
          }));
          setImages((prev) => ({
            ...prev,
            InteriorParkingSensors: item.documentLink,
          }));
          break;
        case "Electricalwiring":
          setFormData((prev) => ({ ...prev, Electricalwiring: item.comment }));
          setImages((prev) => ({
            ...prev,
            Electricalwirings: item.documentLink,
          }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  if (
    formData.ABS !== "" &&
    formData.AirBagFeatures !== "" &&
    formData.Electricalwiring !== "" &&
    formData.FourPowerWindows !== "" &&
    formData.InteriorParkingSensor !== "" &&
    formData.MusicSystem !== "" &&
    formData.Sunroof !== ""
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
          doctype: "Eletrical",
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
      formDataToSend1.append("doctype", "Eletrical");
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

    // Generate a local preview URL and map lables → images key
    const previewURL = URL.createObjectURL(compressedFile);
    if (lables) {
      const labelToImageKey = {
        FourPowerWindows: "FourPowerWindowss",
        AirBagFeatures: "AirBagFeaturess",
        MusicSystem: "MusicSystems",
        Sunroof: "Sunroofs",
        ABS: "ABSs",
        InteriorParkingSensor: "InteriorParkingSensors",
        Electricalwiring: "Electricalwirings",
      };
      const imageKey = labelToImageKey[lables];
      if (imageKey) {
        setImages((prev) => ({ ...prev, [imageKey]: previewURL }));
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", compressedFile);

    const inspectionData = {
      documentType: "InspectionReport",
      beadingCarId: beadingCarId,
      doc: "",
      doctype: "Eletrical",
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
    setImages((prev) => ({ ...prev, [fieldName + "s"]: null }));
    setLables("");
    setSelectfiled("");
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5">
        Electricals
      </Typography>
      <Grid container spacing={3}>
        {/* Four Power Windows */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Four Power Windows</InputLabel>
            <Select
              required
              name="FourPowerWindows"
              value={formData.FourPowerWindows}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-FourPowerWindows"
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
              onClick={() => handleReset("FourPowerWindows")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.FourPowerWindowss && (
            <img
              src={images.FourPowerWindowss}
              alt="Four Power Windows uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* Air Bag Features */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Air Bag Features</InputLabel>
            <Select
              required
              name="AirBagFeatures"
              value={formData.AirBagFeatures}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-AirBagFeatures"
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
              onClick={() => handleReset("AirBagFeatures")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.AirBagFeaturess && (
            <img
              src={images.AirBagFeaturess}
              alt="Air Bag Features uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* Music System */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Music System</InputLabel>
            <Select
              required
              name="MusicSystem"
              value={formData.MusicSystem}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-MusicSystem"
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
              onClick={() => handleReset("MusicSystem")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.MusicSystems && (
            <img
              src={images.MusicSystems}
              alt="Music System uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* Sunroof */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Sunroof</InputLabel>
            <Select
              required
              name="Sunroof"
              value={formData.Sunroof}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-Sunroof"
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
              onClick={() => handleReset("Sunroof")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.Sunroofs && (
            <img
              src={images.Sunroofs}
              alt="Sunroof uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* ABS */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>ABS</InputLabel>
            <Select
              required
              name="ABS"
              value={formData.ABS}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-ABS"
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
              onClick={() => handleReset("ABS")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.ABSs && (
            <img
              src={images.ABSs}
              alt="ABS uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* Interior Parking Sensor */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Interior Parking Sensor</InputLabel>
            <Select
              required
              name="InteriorParkingSensor"
              value={formData.InteriorParkingSensor}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-InteriorParkingSensor"
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
              onClick={() => handleReset("InteriorParkingSensor")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.InteriorParkingSensors && (
            <img
              src={images.InteriorParkingSensors}
              alt="Interior Parking Sensor uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
          )}
        </Grid>

        {/* Electrical Wiring */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Electrical Wiring</InputLabel>
            <Select
              required
              name="Electricalwiring"
              value={formData.Electricalwiring}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              htmlFor="upload-Electricalwiring"
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
              onClick={() => handleReset("Electricalwiring")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {images.Electricalwirings && (
            <img
              src={images.Electricalwirings}
              alt="Electrical Wiring uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
            />
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

export default Electrical;
