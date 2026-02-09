/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import {
  useGetInspectionReportQuery,
  useAddBiddingCarWithoutImageMutation,
} from "../../../services/inspectorapi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EngineVideo = ({ setCheckstep }) => {
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "EngineVideo",
  });

  const [addBiddingCarWithoutImage] =
    useAddBiddingCarWithoutImageMutation();

  const [engineStatus, setEngineStatus] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  /* ---------- Prefill from API ---------- */
  useEffect(() => {
    const item = data?.object?.find(
      (i) => i.subtype === "EngineVideo"
    );

    if (item?.documentLink) {
      setEngineStatus(item.comment);
      // cache busting so refreshed page loads latest video
      setUploadedVideo(`${item.documentLink}?t=${Date.now()}`);
    }
  }, [data]);

  /* ---------- Step validation ---------- */
  useEffect(() => {
    setCheckstep(!!engineStatus);
  }, [engineStatus, setCheckstep]);

  /* ---------- Cleanup preview blob ---------- */
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* ---------- Upload video with progress ---------- */
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("image", file); // backend expects "image"

    try {
      await axios.post(
        "https://api8081.dostenterprises.com/uploadFileBidCar/add",
        formData,
        {
          params: {
            documentType: "InspectionReport",
            beadingCarId,
            doc: "",
            doctype: "EngineVideo",
            subtype: "EngineVideo",
            comment: engineStatus,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded * 100) /
                progressEvent.total
            );
            setUploadProgress(percent);
          },
          timeout: 10 * 60 * 1000, // 10 minutes
        }
      );

      toast.success("Video uploaded successfully");
      setPreviewUrl(null);
      refetch();
    } catch (err) {
      toast.error("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------- Submit without video ---------- */
  const handleSubmitWithoutVideo = async () => {
    if (!engineStatus) {
      toast.error("Select Engine Video status");
      return;
    }

    const fd = new FormData();
    fd.append("beadingCarId", beadingCarId);
    fd.append("doctype", "EngineVideo");
    fd.append("subtype", "EngineVideo");
    fd.append("comment", engineStatus);
    fd.append("documentType", "InspectionReport");
    fd.append("doc", "");

    try {
      await addBiddingCarWithoutImage({ formDataToSend1: fd });
      toast.success("Saved without video");
      refetch();
    } catch {
      toast.error("Submit failed");
    }
  };

  return (
    <div>
      <Typography variant="h4" className="font-bold pb-5">
        Engine Video
      </Typography>

      <FormControl fullWidth required>
        <InputLabel>Engine Video</InputLabel>
        <Select
          value={engineStatus}
          onChange={(e) => setEngineStatus(e.target.value)}
        >
          <MenuItem value="Ok">Ok</MenuItem>
          <MenuItem value="EngineVideo">Engine Video</MenuItem>
        </Select>
      </FormControl>

      <div className="flex gap-5 mt-4 items-center">
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={handleSubmitWithoutVideo}
        >
          Submit Without Video
        </Button>

        <label className="cursor-pointer flex items-center">
          <input
            type="file"
            accept="video/*"
            hidden
            ref={fileInputRef}
            onChange={handleVideoUpload}
          />
          <CloudUploadIcon />
          <span className="ml-2">Upload Video</span>
        </label>
      </div>

      {/* ---------- Upload Progress ---------- */}
      {uploading && (
        <div style={{ marginTop: 15 }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
          />
          <Typography variant="body2" align="center">
            Uploading: {uploadProgress}%
          </Typography>
        </div>
      )}

      {/* ---------- Video Preview ---------- */}
      {(previewUrl || uploadedVideo) && (
        <video
          key={previewUrl || uploadedVideo}
          src={previewUrl || uploadedVideo}
          controls
          preload="metadata"
          style={{
            maxWidth: "35%",
            marginTop: 20,
            borderRadius: 8,
          }}
        />
      )}
    </div>
  );
};

export default EngineVideo;
