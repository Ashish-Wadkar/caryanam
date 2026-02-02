import  { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { IoVideocamOutline, IoChevronBack } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadVideo = ({ onClose, handleCaptureVideo, selectfield }) => {
  const [stream, setStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const MAX_DURATION_MS = 10 * 1000; // 10 seconds

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: true
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }

      // choose a supported mimeType
      let options = {};
      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        options = { mimeType: "video/webm;codecs=vp9" };
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        options = { mimeType: "video/webm;codecs=vp8" };
      } else {
        options = { mimeType: "video/webm" };
      }

      const recorder = new MediaRecorder(s, options);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        toast.error(`Recording error: ${event.error.name}`);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: options.mimeType });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        // stop camera tracks
        s.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
      toast.error("Cannot access camera/microphone.");
    }
  };

  const startRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && stream) {
      setRecordedChunks([]); // reset
      recorder.start();
      setRecording(true);

      timerRef.current = setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
          setRecording(false);
        }
      }, MAX_DURATION_MS);
    } else {
      toast.error("Camera not initialized.");
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      clearTimeout(timerRef.current);
      recorder.stop();
      setRecording(false);
    }
  };

  const handleUpload = () => {
    if (!recordedChunks.length) {
      toast.error("No video recorded to upload.");
      return;
    }
    const blob = new Blob(recordedChunks, { type: (mediaRecorderRef.current?.mimeType || "video/webm") });
    const file = new File([blob], "recorded_video.webm", { type: blob.type });
    handleCaptureVideo(file, selectfield, videoURL);
    toast.success("Video ready for upload.");
  };

  const handleBackClick = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    clearTimeout(timerRef.current);
    mediaRecorderRef.current = null;
    setStream(null);
    setRecordedChunks([]);
    setVideoURL(null);
    setRecording(false);
    onClose();
  };

  const handleReRecord = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    clearTimeout(timerRef.current);
    setRecordedChunks([]);
    setVideoURL(null);
    setRecording(false);
    // restart camera
    startCamera();
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      clearTimeout(timerRef.current);
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {!stream && !videoURL ? (
        <div className="cursor-pointer flex flex-col items-center">
          <IoVideocamOutline className="w-16 h-16 mb-4 text-gray-600" />
          <Button className="mt-2" onClick={startCamera}>
            Open Camera & Mic
          </Button>
        </div>
      ) : videoURL ? (
        <div className="flex flex-col items-center">
          <video
            src={videoURL}
            controls
            className="object-cover w-full max-w-xs mt-4"
          />
          <div className="flex space-x-4 mt-4">
            <Button size="md" onClick={handleReRecord}>
              Re-record
            </Button>
            <Button size="md" onClick={handleUpload}>
              Upload Video
            </Button>
          </div>
          <Button
            size="md"
            className="mt-4 flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" /> Back
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="object-cover w-full max-w-xs"
          />
          {!recording ? (
            <Button size="md" className="mt-4" onClick={startRecording}>
              Start Recording (10s)
            </Button>
          ) : (
            <Button size="md" className="mt-4" onClick={stopRecording}>
              Stop Recording Now
            </Button>
          )}
          <Button
            size="md"
            className="mt-4 flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" /> Back
          </Button>
        </div>
      )}
    </div>
  );
};

UploadVideo.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleCaptureVideo: PropTypes.func.isRequired,
  selectfield: PropTypes.string
};

UploadVideo.defaultProps = {
  selectfield: ""
};

export default UploadVideo;



// import  { useState, useRef, useEffect } from "react";
// import PropTypes from "prop-types";
// import { IoVideocamOutline, IoChevronBack } from "react-icons/io5";
// import { Button } from "@material-tailwind/react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UploadVideo = ({ onClose, handleCaptureVideo, selectfield }) => {
//   const [stream, setStream] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [videoURL, setVideoURL] = useState(null);

//   const videoRef = useRef(null);
//   const timerRef = useRef(null);
//   const MAX_DURATION_MS = 10 * 1000; // 10 seconds

//   const startCamera = async () => {
//     try {
//       const s = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//         audio: true
//       });
//       setStream(s);
//       if (videoRef.current) {
//         videoRef.current.srcObject = s;
//       }
//       const options = { mimeType: "video/webm; codecs=vp8,opus" };
//       const recorder = new MediaRecorder(s, options);

//       recorder.ondataavailable = (e) => {
//         if (e.data && e.data.size > 0) {
//           setRecordedChunks((prev) => prev.concat(e.data));
//         }
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(recordedChunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         setVideoURL(url);
//         s.getTracks().forEach((track) => track.stop());
//       };

//       mediaRecorderRef.current = recorder;
//     } catch (err) {
//       console.error("Error accessing camera/mic:", err);
//       toast.error("Cannot access camera/microphone.");
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorderRef.current && stream) {
//       setRecordedChunks([]);
//       mediaRecorderRef.current.start();
//       setRecording(true);

//       timerRef.current = setTimeout(() => {
//         if (mediaRecorderRef.current.state === "recording") {
//           mediaRecorderRef.current.stop();
//           setRecording(false);
//         }
//       }, MAX_DURATION_MS);
//     } else {
//       toast.error("Camera not initialized.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
//       clearTimeout(timerRef.current);
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const handleUpload = () => {
//     if (!recordedChunks.length) {
//       toast.error("No video recorded to upload.");
//       return;
//     }
//     const blob = new Blob(recordedChunks, { type: "video/webm" });
//     const file = new File([blob], "recorded_video.webm", { type: blob.type });
//     handleCaptureVideo(file, selectfield, videoURL);
//     toast.success("Video ready for upload.");
//   };

//   const handleBackClick = () => {
//     if (stream) {
//       stream.getTracks().forEach((t) => t.stop());
//     }
//     clearTimeout(timerRef.current);
//     mediaRecorderRef.current = null;
//     setStream(null);
//     setRecordedChunks([]);
//     setVideoURL(null);
//     setRecording(false);
//     onClose();
//   };

//   const handleReRecord = () => {
//     if (stream) {
//       stream.getTracks().forEach((t) => t.stop());
//     }
//     clearTimeout(timerRef.current);
//     setRecordedChunks([]);
//     setVideoURL(null);
//     setRecording(false);
//     startCamera();
//   };

//   useEffect(() => {
//     if (stream && videoRef.current) {
//       videoRef.current.srcObject = stream;
//     }
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((t) => t.stop());
//       }
//       clearTimeout(timerRef.current);
//     };
//   }, [stream]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//       {!stream && !videoURL ? (
//         <div className="cursor-pointer flex flex-col items-center">
//           <IoVideocamOutline className="w-16 h-16 mb-4 text-gray-600" />
//           <Button className="mt-2" onClick={startCamera}>
//             Open Camera & Mic
//           </Button>
//         </div>
//       ) : videoURL ? (
//         <div className="flex flex-col items-center">
//           <video
//             src={videoURL}
//             controls
//             className="object-cover w-full max-w-xs mt-4"
//           />
//           <div className="flex space-x-4 mt-4">
//             <Button size="md" onClick={handleReRecord}>
//               Re-record
//             </Button>
//             <Button size="md" onClick={handleUpload}>
//               Upload Video
//             </Button>
//           </div>
//           <Button
//             size="md"
//             className="mt-4 flex items-center"
//             onClick={handleBackClick}
//           >
//             <IoChevronBack className="w-5 h-5" /> Back
//           </Button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             className="object-cover w-full max-w-xs"
//           />
//           {!recording ? (
//             <Button size="md" className="mt-4" onClick={startRecording}>
//               Start Recording
//             </Button>
//           ) : (
//             <Button size="md" className="mt-4" onClick={stopRecording}>
//               Stop Recording Now
//             </Button>
//           )}
//           <Button
//             size="md"
//             className="mt-4 flex items-center"
//             onClick={handleBackClick}
//           >
//             <IoChevronBack className="w-5 h-5" /> Back
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// UploadVideo.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   handleCaptureVideo: PropTypes.func.isRequired,
//   selectfield: PropTypes.string
// };

// UploadVideo.defaultProps = {
//   selectfield: ""
// };

// export default UploadVideo;
