/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useGetInspectionReportQuery } from "../../services/inspectorapi";

const InteriorSection = () => {
  const [formData, setFormData] = useState({
    LeatherSeat: "",
    Odometer: "",
    Dashboard: "",
    CabinFloor: "",
    InstrumentCluster: "",
    ReverseCameraSensor: "",
    SeatCover: "",
  });

  const [uploadedImages, setUploadedImages] = useState({
    LeatherSeats: null,
    Odometers: null,
    CabinFloors: null,
    Dashboards: null,
    InstrumentClusters: null,
    ReverseCameraSensors: null,
    SeatCover: null,
  });

  const { beadingCarId } = useParams();

  const { data } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Interior",
  });

  useEffect(() => {
    if (!data?.object) return;

    const updatedForm = {};
    const updatedImages = {};

    data.object.forEach((item) => {
      switch (item.subtype) {
        case "LeatherSeat":
          updatedForm.LeatherSeat = item.comment;
          updatedImages.LeatherSeats = item.documentLink;
          break;

        case "Odometer":
          updatedForm.Odometer = item.comment;
          updatedImages.Odometers = item.documentLink;
          break;

        case "CabinFloor":
          updatedForm.CabinFloor = item.comment;
          updatedImages.CabinFloors = item.documentLink;
          break;

        case "Dashboard":
          updatedForm.Dashboard = item.comment;
          updatedImages.Dashboards = item.documentLink;
          break;

        case "InstrumentCluster":
          updatedForm.InstrumentCluster = item.comment;
          updatedImages.InstrumentClusters = item.documentLink;
          break;

        case "ReverseCameraSensor":
          updatedForm.ReverseCameraSensor = item.comment;
          updatedImages.ReverseCameraSensors = item.documentLink;
          break;

        case "SeatCover":
          updatedForm.SeatCover = item.comment;
          updatedImages.SeatCover = item.documentLink;
          break;

        default:
          break;
      }
    });

    setFormData((prev) => ({ ...prev, ...updatedForm }));
    setUploadedImages((prev) => ({ ...prev, ...updatedImages }));
  }, [data]);

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5">
        Interior
      </Typography>

      <div className="bg-white border-2 rounded-md shadow-md p-7 -mt-2">
        <Grid container spacing={5}>
          
          {/* Leather Seat */}
          <Grid item xs={12} sm={6}>
            <Typography>Leather Seat : {formData.LeatherSeat}</Typography>
            {uploadedImages.LeatherSeats && (
              <img
                src={uploadedImages.LeatherSeats}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Odometer */}
          <Grid item xs={12} sm={6}>
            <Typography>Odometer : {formData.Odometer}</Typography>
            {uploadedImages.Odometers && (
              <img
                src={uploadedImages.Odometers}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Cabin Floor */}
          <Grid item xs={12} sm={6}>
            <Typography>Cabin Floor : {formData.CabinFloor}</Typography>
            {uploadedImages.CabinFloors && (
              <img
                src={uploadedImages.CabinFloors}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Dashboard */}
          <Grid item xs={12} sm={6}>
            <Typography>Dashboard : {formData.Dashboard}</Typography>
            {uploadedImages.Dashboards && (
              <img
                src={uploadedImages.Dashboards}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Instrument Cluster */}
          <Grid item xs={12} sm={6}>
            <Typography>
              Instrument Cluster : {formData.InstrumentCluster}
            </Typography>
            {uploadedImages.InstrumentClusters && (
              <img
                src={uploadedImages.InstrumentClusters}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Reverse Camera */}
          <Grid item xs={12} sm={6}>
            <Typography>
              Reverse Camera/Sensor : {formData.ReverseCameraSensor}
            </Typography>
            {uploadedImages.ReverseCameraSensors && (
              <img
                src={uploadedImages.ReverseCameraSensors}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

          {/* Seat Cover */}
          <Grid item xs={12} sm={6}>
            <Typography>Seat Cover : {formData.SeatCover}</Typography>
            {uploadedImages.SeatCover && (
              <img
                src={uploadedImages.SeatCover}
                alt=""
                style={{ maxWidth: "20%", marginTop: "10px" }}
              />
            )}
          </Grid>

        </Grid>
      </div>
    </div>
  );
};

export default InteriorSection;
