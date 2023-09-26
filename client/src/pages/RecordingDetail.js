import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const RecordingDetail = () => {
  const [recording, setRecording] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecording = async () => {
      const response = await fetch(`/api/recordings/${id}`);
      const json = await response.json();

      if (response.ok) {
        setRecording(json);
      }
    };

    fetchRecording();
  }, []);

  return (
    <Box sx={{ marginTop: "30px" }}>
      {/* <h3>Recording Detail</h3> */}

      <Box
        sx={{
          width: "80vw",
          margin: "0 auto",
          border: "1px solid #000000",
          paddingBottom: "30px",
          backgroundColor: "#ffffff",
        }}
      >
        <Box align="center" className="details">
          <h2>{recording.composer}</h2>
          <h3>{recording.composition}</h3>
          {recording.artists && recording.artists.trim() !== "" && (
            <h4 className="artists">
              <div>Artist(s): {recording.artists}</div>
            </h4>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item sm={12} md={4} align="center">
            {recording.coverImage === "" ? (
              <img
                src={`/assets/covers/no-image.jpg`}
                className="coverImage"
                alt="Cover"
              />
            ) : (
              <img
                src={`/assets/covers/${recording.coverImage}`}
                className="coverImage"
                alt="Cover"
              />
            )}
          </Grid>

          <Grid item xs={12} md={4} className="details">
            {recording.conductor && recording.conductor.trim() !== "" && (
              <p>
                <b>Conductor</b>: {recording.conductor}
              </p>
            )}
            <p>
              <b>Media</b>: {recording.media}
            </p>
            <p>
              <b>Label</b>: {recording.label}
            </p>
            <p>
              <b>Work Category</b>: {recording.workCategory}
            </p>
            {recording.source && recording.source.trim() !== "" && (
              <p>
                <b>Source</b>: {recording.source}
              </p>
            )}
            {recording.value &&
              recording.value.trim() !== "" &&
              recording.value === "0.00"}
            <p>
              <b>Value</b>: ${recording.value}
            </p>
          </Grid>
          <Grid item xs={12} md={4} className="details">
            {recording.ensemble && recording.ensemble.trim() !== "" && (
              <p>
                <b>Ensemble</b>: {recording.ensemble}
              </p>
            )}
            <p>
              <b>Digital</b>: {recording.digital}
            </p>
            <p>
              <b>Catalog Number</b>: {recording.catalogNumber}
            </p>
            <p>
              <b>File Category</b>: {recording.fileCategory}
            </p>
            {recording.tapeNumber && recording.tapeNumber.trim() !== "" && (
              <p>
                <b>CD-R /Tape Number</b>: {recording.tapeNumber}
              </p>
            )}
            <p>
              <b>Purchase Date</b>:{" "}
              {dayjs(recording.purchaseDate).format("MMMM D, YYYY")}
            </p>
          </Grid>

          <Grid item xs={12} md={12} align="center" className="details">
            <p>
              <b>Location</b>:{" "}
              {recording.location === "Fallston, MD"
                ? "Fallston, MD"
                : "Cortez, CO"}
            </p>
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/recordings")}
            >
              Return to Recordings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default RecordingDetail;
