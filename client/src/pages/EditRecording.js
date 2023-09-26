import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecording = () => {
  const [composerData, setComposerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  const [recording, setRecording] = useState([]);

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Field values
  const [composer, setComposer] = useState(recording.composer);
  const [coverImage, setCoverImage] = useState(recording.coverImage);
  const [composition, setComposition] = useState(recording.composition);
  const [artists, setArtists] = useState(recording.artists);
  const [conductor, setConductor] = useState(recording.conductor);
  const [ensemble, setEnsemble] = useState(recording.ensemble);
  const [media, setMedia] = useState(recording.media);
  const [workCategory, setWorkCategory] = useState(recording.workCategory);
  const [fileCategory, setFileCategory] = useState(recording.fileCategory);
  const [label, setLabel] = useState(recording.label);
  const [catalogNumber, setCatalogNumber] = useState(recording.catalogNumber);
  const [digital, setDigital] = useState(recording.digital);
  const [source, setSource] = useState(recording.source);
  const [tapeNumber, setTapeNumber] = useState(recording.tapeNumber);
  const [purchaseDate, setPurchaseDate] = useState(recording.purchaseDate);
  const [value, setValue] = useState(recording.value);
  const [location, setLocation] = useState(recording.location);

  // console.log(id);

  useEffect(() => {
    const fetchRecording = async () => {
      const response = await fetch(`/api/recordings/${id}`);
      const json = await response.json();

      if (response.ok) {
        setRecording(json);
        // console.log(setRecording);
      }
    };

    fetchRecording();
  }, [id]);

  useEffect(() => {
    const fetchComposerData = async () => {
      const response = await fetch("/api/composers");
      const json = await response.json();

      if (response.ok) {
        setComposerData(json);
      }
      // console.log(json);
    };

    fetchComposerData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await fetch("/api/categories");
      const json = await response.json();

      if (response.ok) {
        setCategoryData(json);
      }
      // console.log(json);
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchMediaData = async () => {
      const response = await fetch("/api/media");
      const json = await response.json();

      if (response.ok) {
        setMediaData(json);
      }
      // console.log(json);
    };

    fetchMediaData();
  }, []);

  useEffect(() => {
    const fetchLabelData = async () => {
      const response = await fetch("/api/labels");
      const json = await response.json();

      if (response.ok) {
        setLabelData(json);
      }
      // console.log(json);
    };

    fetchLabelData();
  }, []);

  const updateRecording = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/recordings/${id}`, {
        composer: composer,
        coverImage: coverImage,
        composition: composition,
        artists: artists,
        conductor: conductor,
        ensemble: ensemble,
        media: media,
        workCategory: workCategory,
        fileCategory: fileCategory,
        label: label,
        catalogNumber: catalogNumber,
        digital: digital,
        source: source,
        tapeNumber: tapeNumber,
        purchaseDate: purchaseDate,
        value: value,
        location: location,
      });
      navigate("/recordings");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Recordings</h1>
      <Box
        align="center"
        sx={{
          width: "80%",
          border: "1px solid #000",
          borderRadius: "5px",
          bgcolor: "#FFF8DC",
          padding: "16px",
          margin: "0 auto",
        }}
      >
        <h2 className="subtitle">Edit Recording</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <Grid container spacing={3}>
            <Grid item sm={12} md={8} align="left">
              <label className="inputLabel">Composer: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.composer}
                onChange={(e) => setComposer(e.target.value)}
              />
              {/* <select
                className="editInput"
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
              >
                {composerData.map((composer) => (
                  <option key={composer._id} value={composer.name}>
                    {composer.name}
                  </option>
                ))}
              </select> */}
            </Grid>
            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">Cover Image: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="left">
              <label className="inputLabel">Composition: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.composition}
                onChange={(e) => setComposition(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} align="left">
              <label className="inputLabel">Artists: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.artists}
                onChange={(e) => setArtists(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6} align="left">
              <label className="inputLabel">Conductor: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.conductor}
                onChange={(e) => setConductor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} align="left">
              <label className="inputLabel">Ensemble: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.ensemble}
                onChange={(e) => setEnsemble(e.target.value)}
              />
            </Grid>

            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">Media: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.media}
                onChange={(e) => setMedia(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">Work Category: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.workCategory}
                onChange={(e) => setWorkCategory(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">File Category: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.fileCategory}
                onChange={(e) => setFileCategory(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Label: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Catalog Number: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.catalogNumber}
                onChange={(e) => setCatalogNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Digital Format: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.digital}
                onChange={(e) => setDigital(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Source: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.source}
                onChange={(e) => setSource(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">CD-R/Tape Number: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.tapeNumber}
                onChange={(e) => setTapeNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Purchase/Record Date: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={1}>
              {/* <TextField /> */}
            </Grid>
            <Grid item xs={12} sm={5} align="left">
              <label className="inputLabel">Value: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={5} align="left">
              <label className="inputLabel">Loaction: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={recording.location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updateRecording}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/recordings")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditRecording;
