import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPerformance = () => {
  const [performance, setPerformance] = useState([]);
  // const [composerData, setComposerData] = useState([]);
  // const [categoryData, setCategoryData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [performanceDate, setPerformanceDate] = useState(
    performance.performanceDate
  );
  const [composer, setComposer] = useState(performance.composer);
  const [composition, setComposition] = useState(performance.composition);
  const [artists, setArtists] = useState(performance.artists);
  const [conductor, setConductor] = useState(performance.conductor);
  const [ensemble, setEnsemble] = useState(performance.ensemble);
  const [concertHall, setConcertHall] = useState(performance.concertHall);
  const [city, setCity] = useState(performance.city);
  const [state, setState] = useState(performance.state);
  const [workCategory, setWorkCategory] = useState(performance.workCategory);
  const [notes, setNotes] = useState(performance.notes);

  console.log(id);

  useEffect(() => {
    const fetchPerformance = async () => {
      const response = await fetch(`/api/performances/${id}`);
      const json = await response.json();

      if (response.ok) {
        setPerformance(json);
      }
    };

    fetchPerformance();
  }, [id]);

  const updatePerformance = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/performances/${id}`, {
        composer: composer,
        performanceDate: performanceDate,
        composition: composition,
        artists: artists,
        conductor: conductor,
        ensemble: ensemble,
        concertHall: concertHall,
        city: city,
        state: state,
        workCategory: workCategory,
        notes: notes,
      });
      navigate("/performances");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // useEffect(() => {
  //   const fetchComposerData = async () => {
  //     const response = await fetch("/api/composers");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setComposerData(json);
  //     }
  //     console.log(json);
  //   };

  //   fetchComposerData();
  // }, []);

  // useEffect(() => {
  //   const fetchCategoryData = async () => {
  //     const response = await fetch("/api/categories");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setCategoryData(json);
  //     }
  //     console.log(json);
  //   };

  //   fetchCategoryData();
  // }, []);

  return (
    <div>
      <h1 className="title">Performances</h1>
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
        <h2 className="subtitle">Edit Performance</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <Grid container spacing={3}>
            <Grid item sm={12} md={8} align="left">
              <label className="inputLabel">Composer: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.composer}
                onChange={(e) => setComposer(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">Performance Date: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.performanceDate}
                onChange={(e) => setPerformanceDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="left">
              <label className="inputLabel">Composition: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.composition}
                onChange={(e) => setComposition(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} align="left">
              <label className="inputLabel">Artist(s): </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.artists}
                onChange={(e) => setArtists(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} align="left">
              <label className="inputLabel">Conductor: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.conductor}
                onChange={(e) => setConductor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="left">
              <label className="inputLabel">Ensemble: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.ensemble}
                onChange={(e) => setEnsemble(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} align="left">
              <label className="inputLabel">Concert Hall: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.concertHall}
                onChange={(e) => setConcertHall(e.target.value)}
              />
            </Grid>

            <Grid item sm={12} md={4} align="left">
              <label className="inputLabel">City: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} md={4} align="left">
              <label className="inputLabel">State: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4} align="left">
              <label className="inputLabel">Work Category: </label>
              <input
                type="text"
                className="editInput"
                defaultValue={performance.workCategory}
                onChange={(e) => setWorkCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="left">
              <label className="inputLabel">Concert Notes: </label>
              <textarea
                rows="3"
                cols="10"
                className="editInput"
                defaultValue={performance.notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updatePerformance}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/performances")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditPerformance;
