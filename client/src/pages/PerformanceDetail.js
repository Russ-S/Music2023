import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const PerformanceDetail = () => {
  const [performance, setPerformance] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPerformance = async () => {
      const response = await fetch(`/api/performances/${id}`);
      const json = await response.json();

      if (response.ok) {
        setPerformance(json);
      }
    };

    fetchPerformance();
  }, []);

  return (
    <Box sx={{ marginTop: "75px" }}>
      <Box
        sx={{
          width: "60vw",
          margin: "0 auto",
          border: "1px solid #000000",
          paddingBottom: "30px",
          backgroundColor: "#ffffff",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <Box align="center" className="details">
          <h2>{performance.composer}</h2>
          <h3>{performance.composition}</h3>
          {performance.artists && performance.artists.trim() !== "" && (
            <h4 className="artists">Artist(s): {performance.artists}</h4>
          )}
          <h4>
            {dayjs(performance.performanceDate).format("dddd MMMM D, YYYY")}
          </h4>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className="details">
            {performance.conductor && performance.conductor.trim() !== "" && (
              <p>
                <b>Conductor</b>: {performance.conductor}
              </p>
            )}
            <p>
              <b>Concert Hall</b>: {performance.concertHall}
            </p>
            <p>
              <b>Work Category</b>: {performance.workCategory}
            </p>
          </Grid>
          <Grid item xs={12} md={6} className="details">
            {performance.ensemble && performance.ensemble.trim() !== "" && (
              <p>
                <b>Ensemble</b>: {performance.ensemble}
              </p>
            )}
            <p>
              <b>City</b>: {performance.city}, {performance.state}
            </p>
            <p>
              <b>Performance Date</b>:{" "}
              {/* {performance.performanceDate} <br /> */}
              {dayjs(performance.performanceDate).format("MM-DD-YYYY")}
            </p>
          </Grid>

          <Grid item xs={12} md={12} className="details">
            <p>
              <b>Concert Notes</b>: {performance.notes}
            </p>
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/performances")}
            >
              Return to Performances
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default PerformanceDetail;
