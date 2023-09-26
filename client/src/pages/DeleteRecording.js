import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import { Box, Button, Grid } from "@mui/material";

const DeleteRecording = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [recording, setRecording] = useState([]);

  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Field values
  const [composer, setComposer] = useState(recording.composer);
  const [composition, setComposition] = useState(recording.composition);

  console.log(id);

  useEffect(() => {
    const fetchRecording = async () => {
      const response = await fetch(`/api/recordings/${id}`);
      const json = await response.json();

      if (response.ok) {
        setRecording(json);
        console.log(setRecording);
      }
    };

    fetchRecording();
  }, [id]);

  function getRecordings() {
    axios.get("/api/recordings").then((res) => {
      setRecordings(res.data);
    });
  }

  function deleteRecording() {
    axios
      .delete(`/api/recordings/${deleteData?._id}`)
      .then((res) => {
        getRecordings();
        setOpenDelete(false);
        navigate("/recordings");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenDelete = (recording) => {
    setOpenDelete(true);
    setDeleteData(recording);
  };

  return (
    <div>
      <Box sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            width: "80vw",
            margin: "0 auto",
            border: "1px solid #000000",
            paddingBottom: "30px",
            backgroundColor: "#ffffff",
          }}
        >
          <Box align="center" sx={{ color: "#ff0000" }}>
            <h1>Delete Recording</h1>
          </Box>
          <Box align="center" className="delete">
            <h2>
              {recording.composer}
              <br />
              {recording.composition}
            </h2>
            {recording.artists && recording.artists.trim() !== "" && (
              <h4 className="artists">
                <div>Artist(s): {recording.artists}</div>
              </h4>
            )}
          </Box>

          <Grid container spacing={2}>
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
                  className="deleteCoverImage"
                  alt="Cover"
                />
              )}
            </Grid>

            <Grid item xs={12} md={4} className="deleteDetails">
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
            <Grid item xs={12} md={4} className="deleteDetails">
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
                <b>Purchase Date</b>: {recording.purchaseDate}
              </p>
            </Grid>

            <Grid item xs={12} md={12} align="center" className="deleteDetails">
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
                size="large"
                variant="contained"
                color="warning"
                onClick={() => navigate("/recordings")}
                sx={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="error"
                onClick={() => handleOpenDelete(recording)}
                sx={{ marginLeft: "20px" }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ConfirmDialog
        open={openDelete}
        closeDialog={() => setOpenDelete(false)}
        title={deleteData?.composition}
        deleteFunction={deleteRecording}
      />
    </div>
  );
};
export default DeleteRecording;
