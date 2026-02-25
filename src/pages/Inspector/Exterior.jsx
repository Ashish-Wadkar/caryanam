/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import WindshieldAndLights from "./ExteriorsComponent/WindshieldAndLights";
import Tyre from "./ExteriorsComponent/Tyre";
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
import OtherComponent from "./ExteriorsComponent/OtherComponent";
import Structure from "./ExteriorsComponent/Structure";
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

const Exterior = ({ setCheckstep }) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Exterior",
  });
  console.log(data);

  const [formData, setFormData] = useState({
    BonnetHood: [],
    RightDoorFront: [],
    LeftDoorFront: [],
    RightFender: [],
    LeftQuarterPanel: [],
    RightQuarterPanel: [],
    Roof: [],
    DickyDoor: [],
    LeftDoorRear: [],
    RightDoorRear: [],
    LHSFrontTyre: [],
    RHSFrontTyre: [],
    LHSRearTyre: [],
    RHSRearTyre: [],
    SpareTyre: [],
    Windshield: [],
    Light: [],
    FrontBumper: [],
    RearBumper: [],
    LHSHeadlight: [],
    RHSHeadlight: [],
    LHSTaillight: [],
    RHSTaillight: [],
    HeadLightSupport: [],
    RadiatorSupport: [],
    AlloyWheel: [],
    CowlTop: [],
    BootFloor: [],
    RightApronLEG: [],
    LeftApronLEG: [],
    RightApron: [],
    LeftApron: [],
    LeftPillar: [],
    RightPillar: [],
    RightPillarA: [],
    RightPillarB: [],
    RightPillarC: [],
    LeftFender: [],
    LeftPillarA: [],
    LeftPillarB: [],
    LeftPillarC: [],
    FrontWindshield: [],
    RearWindshield: [],
    LHSORVM: [],
    RHSORVM: [],
    customLHSORVM: "",
    customRHSORVM: "",
    CarPoolingon: [],
    customCARPOOLING: "",
    LHSRunningBorder: [],
    RHSRunningBorder: [],
    UpperCrossMember: [],
    customUpperCM: "",
    //new added
    UnderBody: "",
    RightSide: "",
    LeftSide: "",
    RearSide: "",
    EngineMotor: "",
    FrontSide: "",
  });

  const [uploadedImages, setUploadedImages] = useState({
    BonnetHoods: null,
    RightDoorFronts: null,
    LeftDoorFronts: null,
    RightFenders: null,
    LeftQuarterPanels: null,
    RightQuarterPanels: null,
    Roofs: null,
    DickyDoors: null,
    LeftDoorRears: null,
    RightDoorRears: null,
    LHSFrontTyres: null,
    RHSFrontTyres: null,
    LHSRearTyres: null,
    RHSRearTyres: null,
    SpareTyres: null,
    Windshields: null,
    FrontWindshield: null,
    RearWindshield: null,
    Lights: null,
    FrontBumpers: null,
    RearBumpers: null,
    LHSHeadlights: null,
    RHSHeadlights: null,
    LHSTaillights: null,
    RHSTaillights: null,
    HeadLightSupports: null,
    RadiatorSupports: null,
    AlloyWheels: null,
    CowlTops: null,
    BootFloors: null,
    RightApronLEGs: null,
    LeftApronLEGs: null,
    RightAprons: null,
    LeftAprons: null,
    LeftPillars: null,
    RightPillars: null,
    RightPillarA: null,
    RightPillarB: null,
    RightPillarC: null,
    LeftFender: null,
    LeftPillarA: null,
    LeftPillarB: null,
    LeftPillarC: null,
    LHSORVM: null,
    RHSORVM: null,
    CarPoolingon: null,
    LHSRunningBorder: null,
    RHSRunningBorder: null,
    UpperCrossMember: null,
    //add value
    UnderBody: null,
    RightSide: null,
    LeftSide: null,
    RearSide: null,
    EngineMotor: null,
    FrontSide: null,
  });

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "BonnetHood":
          setFormData((prev) => ({ ...prev, BonnetHood: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            BonnetHoods: item.documentLink,
          }));
          break;
        case "RightDoorFront":
          setFormData((prev) => ({ ...prev, RightDoorFront: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RightDoorFronts: item.documentLink,
          }));
          break;
        case "LeftDoorFront":
          setFormData((prev) => ({ ...prev, LeftDoorFront: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeftDoorFronts: item.documentLink,
          }));
          break;
        case "RightFender":
          setFormData((prev) => ({ ...prev, RightFender: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RightFenders: item.documentLink,
          }));
          break;
        case "LeftQuarterPanel":
          setFormData((prev) => ({ ...prev, LeftQuarterPanel: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeftQuarterPanels: item.documentLink,
          }));
          break;
        case "RightQuarterPanel":
          setFormData((prev) => ({ ...prev, RightQuarterPanel: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RightQuarterPanels: item.documentLink,
          }));
          break;
        case "Roof":
          setFormData((prev) => ({ ...prev, Roof: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Roofs: item.documentLink }));
          break;
        case "DickyDoor":
          setFormData((prev) => ({ ...prev, DickyDoor: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            DickyDoors: item.documentLink,
          }));
          break;
        case "LeftDoorRear":
          setFormData((prev) => ({ ...prev, LeftDoorRear: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeftDoorRears: item.documentLink,
          }));
          break;
        case "RightDoorRear":
          setFormData((prev) => ({ ...prev, RightDoorRear: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RightDoorRears: item.documentLink,
          }));
          break;
        case "LeftFender":
          setFormData((prev) => ({ ...prev, LeftFender: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeftFender: item.documentLink,
          }));
          break;
        case "UnderBody":
          setFormData((prev) => ({ ...prev, UnderBody: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            UnderBody: item.documentLink,
          }));
          break;
        case "RightSide":
          setFormData((prev) => ({ ...prev, RightSide: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RightSide: item.documentLink,
          }));
          break;
        case "LeftSide":
          setFormData((prev) => ({ ...prev, LeftSide: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeftSide: item.documentLink,
          }));
          break;
        case "FrontSide":
          setFormData((prev) => ({ ...prev, FrontSide: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            FrontSide: item.documentLink,
          }));
          break;
        case "RearSide":
          setFormData((prev) => ({ ...prev, RearSide: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            RearSide: item.documentLink,
          }));
          break;
        case "EngineMotor":
          setFormData((prev) => ({ ...prev, EngineMotor: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            EngineMotor: item.documentLink,
          }));
          break;

        default:
          break;
      }
    });
  }, [data]);
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

  // ─── handleFileChange (with 50% compression) ────────────────────────────────
  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    imgPreview;
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
        let finalComment = selectfiled;
        if (lables === "LHSORVM" && selectfiled === "Other") {
          finalComment = formData.customLHSORVM || "";
          if (!finalComment.trim()) {
            toast.error(
              "Please enter the custom value for LHS ORVM before uploading",
              { autoClose: 2000 }
            );
            return;
          }
        }
        if (lables === "RHSORVM" && selectfiled === "Other") {
          finalComment = formData.customRHSORVM || "";
          if (!finalComment.trim()) {
            toast.error(
              "Please enter the custom value for RHS ORVM before uploading",
              { autoClose: 2000 }
            );
            return;
          }
        }
        if (lables === "CarPoolingon" && selectfiled === "Other") {
          finalComment = formData.customCARPOOLING || "";
          if (!finalComment.trim()) {
            toast.error(
              "Please enter the custom value for Car Pooling before uploading",
              { autoClose: 2000 }
            );
            return;
          }
        }
        if (lables === "UpperCrossMember" && selectfiled === "Other") {
          finalComment = formData.customUpperCM || "";
          if (!finalComment.trim()) {
            toast.error(
              "Please enter the custom value for Upper Cross Member before uploading",
              { autoClose: 2000 }
            );
            return;
          }
        }
        const inspectionData = {
          documentType: "InspectionReport",
          beadingCarId: beadingCarId,
          doc: "",
          doctype: "Exterior",
          subtype: lables,
          comment: finalComment,
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
          toast.error("Data not Uploaded", { autoClose: 500 });
        }
      } else {
        toast.error("Input is required", { autoClose: 2000 });
      }
    };
    // Read the compressed file for preview
    reader.readAsDataURL(compressedFile);
  };
  // ────────────────────────────────────────────────────────────────────────────

  const handleSubmitWithoutImage = async (fieldName) => {
    const subtype = fieldName || lables;
    let selectedValue = fieldName ? formData[fieldName] : selectfiled;

    // Handle arrays - extract the first value if array, otherwise use the value as-is
    if (Array.isArray(selectedValue)) {
      selectedValue = selectedValue.length > 0 ? selectedValue[0] : "";
    }

    // If value is base64 image data (from upload), treat as no selection for "submit without image"
    if (
      typeof selectedValue === "string" &&
      selectedValue.startsWith("data:")
    ) {
      selectedValue = "";
    }

    if (
      !subtype ||
      !selectedValue ||
      (typeof selectedValue === "string" && !selectedValue.trim())
    ) {
      toast.error("Please select an option from the dropdown first", {
        autoClose: 2000,
      });
      return;
    }

    let finalComment = selectedValue;

    if (subtype === "LHSORVM" && selectedValue === "Other") {
      finalComment = formData.customLHSORVM || "";
      if (!finalComment.trim()) {
        toast.error("Please enter the custom value for LHS ORVM", {
          autoClose: 2000,
        });
        return;
      }
    }
    if (subtype === "RHSORVM" && selectedValue === "Other") {
      finalComment = formData.customRHSORVM || "";
      if (!finalComment.trim()) {
        toast.error("Please enter the custom value for RHS ORVM", {
          autoClose: 2000,
        });
        return;
      }
    }
    if (subtype === "CarPoolingon" && selectedValue === "Other") {
      finalComment = formData.customCARPOOLING || "";
      if (!finalComment.trim()) {
        toast.error("Please enter the custom value for Car Pooling", {
          autoClose: 2000,
        });
        return;
      }
    }
    if (subtype === "UpperCrossMember" && selectedValue === "Other") {
      finalComment = formData.customUpperCM || "";
      if (!finalComment.trim()) {
        toast.error("Please enter the custom value for Upper Cross Member", {
          autoClose: 2000,
        });
        return;
      }
    }

    const formDataToSend1 = new FormData();
    formDataToSend1.append("beadingCarId", beadingCarId);
    formDataToSend1.append("doctype", "Exterior");
    formDataToSend1.append("subtype", subtype);
    formDataToSend1.append("comment", finalComment);
    formDataToSend1.append("documentType", "InspectionReport");
    formDataToSend1.append("doc", "");

    try {
      const res = await addBiddingCarWithoutImage({ formDataToSend1 });
      refetch();

      if (res?.data?.message === "success") {
        toast.success("Data Uploaded", { autoClose: 500 });
      } else {
        toast.error("Data Upload failed", { autoClose: 500 });
      }
    } catch (error) {
      toast.error("Data not Uploaded", { autoClose: 500 });
    }
  };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name.startsWith("custom")) return;
    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };
  if (
    formData.BonnetHood.length > 0 &&
    formData.RightDoorFront.length > 0 &&
    formData.LeftDoorFront.length > 0 &&
    formData.RightFender.length > 0 &&
    formData.LeftQuarterPanel.length > 0 &&
    formData.RightQuarterPanel.length > 0 &&
    formData.Roof.length > 0 &&
    formData.DickyDoor.length > 0 &&
    formData.LeftDoorRear.length > 0 &&
    formData.RightDoorRear.length > 0 &&
    formData.LHSFrontTyre.length > 0 &&
    formData.RHSFrontTyre.length > 0 &&
    formData.LHSRearTyre.length > 0 &&
    formData.RHSRearTyre.length > 0 &&
    formData.SpareTyre.length > 0 &&
    formData.Windshield.length > 0 &&
    formData.Light.length > 0 &&
    formData.FrontBumper.length > 0 &&
    formData.RearBumper.length > 0 &&
    formData.LHSHeadlight.length > 0 &&
    formData.RHSHeadlight.length > 0 &&
    formData.LHSTaillight.length > 0 &&
    formData.RHSTaillight.length > 0 &&
    formData.HeadLightSupport.length > 0 &&
    formData.RadiatorSupport.length > 0 &&
    formData.AlloyWheel.length > 0 &&
    formData.CowlTop.length > 0 &&
    formData.BootFloor.length > 0 &&
    formData.RightApronLEG.length > 0 &&
    formData.LeftApronLEG.length > 0 &&
    formData.RightApron.length > 0 &&
    formData.LeftApron.length > 0 &&
    formData.LeftPillar.length > 0 &&
    formData.RightPillar.length > 0 &&
    formData.RightPillarA.length > 0 &&
    formData.RightPillarB.length > 0 &&
    formData.RightPillarC.length > 0 &&
    formData.LeftFender.length > 0 &&
    formData.LeftPillarA.length > 0 &&
    formData.LeftPillarB.length > 0 &&
    formData.LeftPillarC.length > 0 &&
    formData.FrontWindshield.length > 0 &&
    formData.RearWindshield.length > 0 &&
    formData.LHSORVM.length > 0 &&
    formData.RHSORVM.length > 0 &&
    formData.CarPoolingon.length > 0 &&
    formData.LHSRunningBorder.length > 0 &&
    formData.RHSRunningBorder.length > 0 &&
    formData.UpperCrossMember.length > 0 &&
    formData.UnderBody.length > 0 &&
    formData.RightSide.length > 0 &&
    formData.FrontSide.length > 0 &&
    formData.LeftSide.length > 0 &&
    formData.RearSide.length > 0 &&
    formData.EngineMotor.length > 0
  ) {
    setCheckstep(true);
  } else {
    setCheckstep(false);
  }

  const fileInputRef = useRef(null);

  const handleCaptureImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ─── handleImageClick (with 50% compression) ────────────────────────────────
  const handleImageClick = async (event) => {
    // If called with a string (image URL preview click), do nothing
    if (typeof event === "string") return;

    const file = event.target.files[0];
    if (!file) return;

    // Compress image to 50% quality before uploading
    const compressedFile = await compressImage(file, 0.5);

    // Generate a local preview URL from the compressed file and store it
    // so the user can immediately see the uploaded image on the page
    const previewURL = URL.createObjectURL(compressedFile);
    if (lables) {
      // Map the field label to the matching uploadedImages key
      const labelToImageKey = {
        BonnetHood: "BonnetHoods",
        RightDoorFront: "RightDoorFronts",
        LeftDoorFront: "LeftDoorFronts",
        RightFender: "RightFenders",
        LeftQuarterPanel: "LeftQuarterPanels",
        RightQuarterPanel: "RightQuarterPanels",
        Roof: "Roofs",
        DickyDoor: "DickyDoors",
        LeftDoorRear: "LeftDoorRears",
        RightDoorRear: "RightDoorRears",
        LeftFender: "LeftFender",
        UnderBody: "UnderBody",
        RightSide: "RightSide",
        LeftSide: "LeftSide",
        FrontSide: "FrontSide",
        RearSide: "RearSide",
        EngineMotor: "EngineMotor",
        LHSFrontTyre: "LHSFrontTyres",
        RHSFrontTyre: "RHSFrontTyres",
        LHSRearTyre: "LHSRearTyres",
        RHSRearTyre: "RHSRearTyres",
        SpareTyre: "SpareTyres",
        Windshield: "Windshields",
        FrontWindshield: "FrontWindshield",
        RearWindshield: "RearWindshield",
        Light: "Lights",
        FrontBumper: "FrontBumpers",
        RearBumper: "RearBumpers",
        LHSHeadlight: "LHSHeadlights",
        RHSHeadlight: "RHSHeadlights",
        LHSTaillight: "LHSTaillights",
        RHSTaillight: "RHSTaillights",
        HeadLightSupport: "HeadLightSupports",
        RadiatorSupport: "RadiatorSupports",
        AlloyWheel: "AlloyWheels",
        CowlTop: "CowlTops",
        BootFloor: "BootFloors",
        RightApronLEG: "RightApronLEGs",
        LeftApronLEG: "LeftApronLEGs",
        RightApron: "RightAprons",
        LeftApron: "LeftAprons",
        LeftPillar: "LeftPillars",
        RightPillar: "RightPillars",
        RightPillarA: "RightPillarA",
        RightPillarB: "RightPillarB",
        RightPillarC: "RightPillarC",
        LeftPillarA: "LeftPillarA",
        LeftPillarB: "LeftPillarB",
        LeftPillarC: "LeftPillarC",
        LHSORVM: "LHSORVM",
        RHSORVM: "RHSORVM",
        CarPoolingon: "CarPoolingon",
        LHSRunningBorder: "LHSRunningBorder",
        RHSRunningBorder: "RHSRunningBorder",
        UpperCrossMember: "UpperCrossMember",
      };
      const imageKey = labelToImageKey[lables];
      if (imageKey) {
        setUploadedImages((prev) => ({ ...prev, [imageKey]: previewURL }));
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", compressedFile);

    let finalComment = selectfiled;
    if (lables === "LHSORVM" && selectfiled === "Other") {
      finalComment = formData.customLHSORVM || "";
      if (!finalComment.trim()) {
        toast.error(
          "Please enter the custom value for LHS ORVM before uploading"
        );
        return;
      }
    }
    if (lables === "RHSORVM" && selectfiled === "Other") {
      finalComment = formData.customRHSORVM || "";
      if (!finalComment.trim()) {
        toast.error(
          "Please enter the custom value for RHS ORVM before uploading"
        );
        return;
      }
    }
    if (lables === "CarPoolingon" && selectfiled === "Other") {
      finalComment = formData.customCARPOOLING || "";
      if (!finalComment.trim()) {
        toast.error(
          "Please enter the custom value for Car Pooling before uploading"
        );
        return;
      }
    }
    if (lables === "UpperCrossMember" && selectfiled === "Other") {
      finalComment = formData.customUpperCM || "";
      if (!finalComment.trim()) {
        toast.error(
          "Please enter the custom value for Upper Cross Member before uploading"
        );
        return;
      }
    }
    const inspectionData = {
      documentType: "InspectionReport",
      beadingCarId: beadingCarId,
      doc: "",
      doctype: "Exterior",
      subtype: lables,
      comment: finalComment,
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
    <div className="">
      <Typography variant="h4" className="text-black font-bold pb-5">
        Exterior Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Bonnet Hood */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Bonnet / Hood</InputLabel>
            <Select
              required
              name="BonnetHood"
              value={formData.BonnetHood}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("BonnetHood")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("BonnetHood")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.BonnetHoods && (
            <img
              src={uploadedImages.BonnetHoods}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Right Door Front */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Door Front</InputLabel>
            <Select
              required
              name="RightDoorFront"
              value={formData.RightDoorFront}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RightDoorFront")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("RightDoorFront")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightDoorFronts && (
            <img
              src={uploadedImages.RightDoorFronts}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Left Door Front */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Door Front</InputLabel>
            <Select
              required
              name="LeftDoorFront"
              value={formData.LeftDoorFront}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("LeftDoorFront")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("LeftDoorFront")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftDoorFronts && (
            <img
              src={uploadedImages.LeftDoorFronts}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Right Fender */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Fender</InputLabel>
            <Select
              required
              name="RightFender"
              value={formData.RightFender}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RightFender")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("RightFender")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightFenders && (
            <img
              src={uploadedImages.RightFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Left Quarter Panel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Quarter Panel</InputLabel>
            <Select
              required
              name="LeftQuarterPanel"
              value={formData.LeftQuarterPanel}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("LeftQuarterPanel")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("LeftQuarterPanel")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftQuarterPanels && (
            <img
              src={uploadedImages.LeftQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Right Quarter Panel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Quarter Panel</InputLabel>
            <Select
              required
              name="RightQuarterPanel"
              value={formData.RightQuarterPanel}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RightQuarterPanel")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("RightQuarterPanel")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightQuarterPanels && (
            <img
              src={uploadedImages.RightQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Roof */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Roof</InputLabel>
            <Select
              name="Roof"
              required
              value={formData.Roof}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("Roof")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("Roof")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Roofs && (
            <img
              src={uploadedImages.Roofs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Dicky Door */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Dicky Door</InputLabel>
            <Select
              required
              name="DickyDoor"
              value={formData.DickyDoor}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("DickyDoor")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("DickyDoor")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.DickyDoors && (
            <img
              src={uploadedImages.DickyDoors}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Left Door Rear */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Door Rear</InputLabel>
            <Select
              required
              name="LeftDoorRear"
              value={formData.LeftDoorRear}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("LeftDoorRear")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("LeftDoorRear")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftDoorRears && (
            <img
              src={uploadedImages.LeftDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Right Door Rear */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Door Rear</InputLabel>
            <Select
              required
              name="RightDoorRear"
              value={formData.RightDoorRear}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RightDoorRear")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("RightDoorRear")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightDoorRears && (
            <img
              src={uploadedImages.RightDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Left Fender */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Fender</InputLabel>
            <Select
              required
              name="LeftFender"
              value={formData.LeftFender}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("LeftFender")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-MusicSystems"
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
              onClick={() => handleReset("LeftFender")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftFender && (
            <img
              src={uploadedImages.LeftFender}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Under Body */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Under Body</InputLabel>
            <Select
              required
              name="UnderBody"
              value={formData.UnderBody}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("UnderBody")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-UnderBody"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("UnderBody")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.UnderBody && (
            <img
              src={uploadedImages.UnderBody}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Side</InputLabel>
            <Select
              required
              name="RightSide"
              value={formData.RightSide}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RightSide")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-RightSide"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("RightSide")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightSide && (
            <img
              src={uploadedImages.RightSide}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Front Side */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Front Side</InputLabel>
            <Select
              required
              name="FrontSide"
              value={formData.FrontSide}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("FrontSide")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-FrontSide"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("FrontSide")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.FrontSide && (
            <img
              src={uploadedImages.FrontSide}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Left Side */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Side</InputLabel>
            <Select
              required
              name="LeftSide"
              value={formData.LeftSide}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("LeftSide")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-LeftSide"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("LeftSide")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftSide && (
            <img
              src={uploadedImages.LeftSide}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Rear Side */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Rear Side</InputLabel>
            <Select
              required
              name="RearSide"
              value={formData.RearSide}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("RearSide")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-RearSide"
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
              <CloudUploadIcon />
              <span className="ml-2">Upload Image</span>
            </label>
            <Button
              onClick={() => handleReset("RearSide")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RearSide && (
            <img
              src={uploadedImages.RearSide}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        {/* Engine Motor */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Engine Motor</InputLabel>
            <Select
              required
              name="EngineMotor"
              value={formData.EngineMotor}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Good Condition">Good Condition</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={() => handleSubmitWithoutImage("EngineMotor")}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            <label
              htmlFor="upload-EngineMotor"
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
              onClick={() => handleReset("EngineMotor")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.EngineMotor && (
            <img
              src={uploadedImages.EngineMotor}
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

      {/* Modal for displaying clicked image */}
      <Modal
        open={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
      >
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

      <WindshieldAndLights
        handleImageClick={handleImageClick}
        fileInputRef={fileInputRef}
        handleCameraModal={handleCameraModal}
        userRole={userRole}
        handleCaptureImage={handleCaptureImage}
        handleSubmitWithoutImage={handleSubmitWithoutImage}
        data={data}
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        captureModalOpen={captureModalOpen}
        setCaptureModalOpen={setCaptureModalOpen}
        selectedLable={selectedLable}
        setSelectfiled={setSelectfiled}
        handleChange={handleChange}
      />
      <Tyre setCheckstep={setCheckstep} />
      <OtherComponent
        handleImageClick={handleImageClick}
        fileInputRef={fileInputRef}
        handleCameraModal={handleCameraModal}
        userRole={userRole}
        handleCaptureImage={handleCaptureImage}
        handleSubmitWithoutImage={handleSubmitWithoutImage}
        data={data}
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        captureModalOpen={captureModalOpen}
        setCaptureModalOpen={setCaptureModalOpen}
        selectedLable={selectedLable}
        setSelectfiled={setSelectfiled}
        handleChange={handleChange}
      />

      <Structure
        handleImageClick={handleImageClick}
        fileInputRef={fileInputRef}
        handleCameraModal={handleCameraModal}
        userRole={userRole}
        handleCaptureImage={handleCaptureImage}
        handleSubmitWithoutImage={handleSubmitWithoutImage}
        data={data}
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        captureModalOpen={captureModalOpen}
        setCaptureModalOpen={setCaptureModalOpen}
        selectedLable={selectedLable}
        setSelectfiled={setSelectfiled}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Exterior;