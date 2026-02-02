/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import WindshieldAndLights from "../WindshieldAndLights";
// import Tyre from "./ExteriorsComponent/Tyre";
import { useEffect, useRef, useState  } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Grid, Typography,Button, Modal, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useGetInspectionReportQuery, useInspectionReportMutation } from '../../../services/inspectorapi';
// ../../services/inspectorapi
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadVideo from '../../../ui/UploadImageComponents/UploadVideo';
import { useAddBiddingCarWithoutImageMutation } from "../../../services/inspectorapi"
// import OtherComponent from "./ExteriorsComponent/OtherComponent"
// import Structure from "./ExteriorsComponent/Structure"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EngineVideo = ({setCheckstep}) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
  
  const { data,refetch } = useGetInspectionReportQuery({ beadingCarId, docType: "EngineVideo" });
  console.log(data)

const [formData, setFormData] = useState({
    EngineVideo: [],
    
  });

 const [uploadedImages, setUploadedImages] = useState({
    EngineVideos: null,
    
  });
  
  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "EngineVideo":
          setFormData((prev) => ({ ...prev, EngineVideo: item.comment }));
          setUploadedImages((prev) => ({ ...prev, EngineVideos: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);
  const [inspectionReport] = useInspectionReportMutation();
  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable ,setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("")

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    imgPreview;
    // console.log(imgPreview);
    let file;
    let imageData;
    if (!event?.target) {
      // console.log("name");
      file = event;
      imageData = file;
    } else {
      file = event.target.files[0];
    }
  
    if (!file) return;
  
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);
  
    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;
      // console.log(imageData);
      setFormData({ ...formData, [fieldName]: imageData });
      if (lables) {
      const inspectionData = {
        documentType: "InspectionReport",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "EngineVideo",
        subtype: lables,
        comment: selectfiled,
      };
  
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        refetch()
        
        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
          setLables('');
          setSelectfiled(''); 
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
      } catch (error) {
        // console.error('Error uploading the file:', error);
        toast.error("Data not Uploaded", { autoClose: 500 });
      }
    } else {
      toast.error("Input is required", { autoClose: 2000 });
    }
    };
    reader.readAsDataURL(file);
  };
  
  
  const handleSubmitWithoutImage = async () => {
    if (lables) {
      const formDataToSend1 = new FormData();
      formDataToSend1.append('beadingCarId', beadingCarId);
      formDataToSend1.append('doctype', "EngineVideo");
      formDataToSend1.append('subtype', lables);
      formDataToSend1.append('comment', selectfiled);
      formDataToSend1.append('documentType', "InspectionReport");
      formDataToSend1.append('doc', "");
  
      try {
        const res = await addBiddingCarWithoutImage({ formDataToSend1 });
        refetch();
        // console.log(res?.data.message);
        if (res?.data.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
          setLables('');
          setSelectfiled('');
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
    setSelectedLable(key)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };
  if (
    formData.EngineVideo.length > 0
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

  const handleImageClick =  async(event)  => {
    // Handle the image upload here
    const file = event.target.files[0];
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);
    
    const inspectionData = {
        documentType: "InspectionReport",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "EngineVideo",
        subtype: lables,
        comment: selectfiled,
      };
  
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        refetch()
       
        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
      } catch (error) {
        // console.error('Error uploading the file:', error);
        toast.error("Data not Uploaded", { autoClose: 500 });
      }
    };

     const handleReset = (fieldName) => {
       setFormData((prev) => ({ ...prev, [fieldName]: "" })); // Reset form field value
       setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null })); // Reset corresponding uploaded image
       setLables(""); // Clear labels
       setSelectfiled(""); // Clear selected field
     };
 
    // if (!data) {
    //   return <div><p>No Data Available</p></div>
    // }
  return (
    <div className="">
      <Typography variant="h4" className="text-black font-bold pb-5">
        Engine Video
      </Typography>

      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}> */}
          <FormControl fullWidth required>
            <InputLabel>Engine Video</InputLabel>
            <Select
              required
              name="EngineVideo"
              value={formData.EngineVideo}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="EngineVideo">Engine Video</MenuItem>
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
              Submit Without video
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
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
                <span className="ml-2">Upload Video</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("EngineVideo")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.EngineVideos && (
            <img
              src={uploadedImages.EngineVideos}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.EngineVideos)}
            />
          )}
        {/* </Grid>
        </Grid> */}
      {/* Modal for displaying clicked image */}
      <Modal
        open={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
        // className={classes.modal}
      >
        <div className={classes.paper}>
          {/* <UploadVideo
            isOpen={captureModalOpen}
            onClose={() => setCaptureModalOpen(false)}
            onCapture={handleCaptureImage}
            handleCaptureImage={handleFileChange}
            selectfiled={selectedLable}
          /> */}

<UploadVideo
  onClose={() => setCaptureModalOpen(false)}
  handleCaptureVideo={handleFileChange}
  selectfield={selectedLable}
/>

        </div>
      </Modal>
    </div>
  );
};

export default EngineVideo;