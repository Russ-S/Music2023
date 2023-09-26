import { useEffect, useState } from "react";
import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";
import { Send } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate } from "react-router-dom";
import {
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddPerformance = () => {
  const [composerData, setComposerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();

  const [performanceDate, setPerformanceDate] = useState("");
  const [composer, setComposer] = useState("");
  const [composition, setComposition] = useState("");
  const [artists, setArtists] = useState("");
  const [conductor, setConductor] = useState("");
  const [ensemble, setEnsemble] = useState("");
  const [concertHall, setConcertHall] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [workCategory, setWorkCategory] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformances = async () => {
      const response = await fetch("/api/performances");
      const json = await response.json();

      if (response.ok) {
        setPerformances(json);
      }
    };

    fetchPerformances();
  }, []);

  useEffect(() => {
    const fetchComposerData = async () => {
      const response = await fetch("/api/composers");
      const json = await response.json();

      if (response.ok) {
        setComposerData(json);
      }
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
    };

    fetchCategoryData();
  }, []);

  const resetForm = () => {
    setComposer("");
    setPerformanceDate("");
    setComposition("");
    setArtists("");
    setConductor("");
    setEnsemble("");
    setConcertHall("");
    setCity("");
    setState("");
    setWorkCategory("");
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const performance = {
      composer,
      performanceDate,
      composition,
      artists,
      conductor,
      ensemble,
      concertHall,
      workCategory,
      city,
      state,
      notes,
    };

    const response = await fetch("/api/performances", {
      method: "POST",
      body: JSON.stringify(performance),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setComposer("");
      setError(null);
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        border: "1px solid #000",
        margin: "5px auto 0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <form className="form">
        <h2>Add Performance</h2>
        {error && <div className="error">{error}</div>}
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <TextField
              required
              label="Select Composer"
              select
              fullWidth
              onChange={(e) => setComposer(e.target.value)}
              value={composer}
              variant="standard"
            >
              {composerData.map((composer) => (
                <MenuItem key={composer._id} value={composer.name}>
                  {composer.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DesktopDatePicker */}
              <DateTimePicker
                label="Performance Date & Time"
                variant="standard"
                components={{
                  OpenPickerIcon: CalendarMonthIcon,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                value={performanceDate}
                onChange={(newValue) => setPerformanceDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="composition"
              name="composition"
              label="Composition"
              fullWidth
              onChange={(e) => setComposition(e.target.value)}
              value={composition}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="artists"
              name="artists"
              label="Artist(s)"
              fullWidth
              onChange={(e) => setArtists(e.target.value)}
              value={artists}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="conductor"
              name="conductor"
              label="Conductor"
              fullWidth
              onChange={(e) => setConductor(e.target.value)}
              value={conductor}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ensemble"
              name="ensemble"
              label="Ensemble"
              fullWidth
              onChange={(e) => setEnsemble(e.target.value)}
              value={ensemble}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="concertHall"
              name="concertHall"
              label="Concert Hall"
              fullWidth
              onChange={(e) => setConcertHall(e.target.value)}
              value={concertHall}
              variant="standard"
            />
          </Grid>

          <Grid item sm={12} md={4}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
              value={city}
              variant="standard"
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              required
              label="Select State"
              select
              fullWidth
              onChange={(e) => setState(e.target.value)}
              value={state}
              variant="standard"
            >
              <MenuItem value="AL">Alabama</MenuItem>
              <MenuItem value="AK">Alaska</MenuItem>
              <MenuItem value="AZ">Arizona</MenuItem>
              <MenuItem value="AR">Arkansas</MenuItem>
              <MenuItem value="CA">California</MenuItem>
              <MenuItem value="CO">Colorado</MenuItem>
              <MenuItem value="CT">Connecticut</MenuItem>
              <MenuItem value="DE">Delaware</MenuItem>
              <MenuItem value="DC">District of Columbia</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
              <MenuItem value="GA">Georgia</MenuItem>
              <MenuItem value="HI">Hawaii</MenuItem>
              <MenuItem value="ID">Idaho</MenuItem>
              <MenuItem value="IL">Illinois</MenuItem>
              <MenuItem value="IN">Indiana</MenuItem>
              <MenuItem value="IA">Iowa</MenuItem>
              <MenuItem value="KS">Kansas</MenuItem>
              <MenuItem value="KY">Kentucky</MenuItem>
              <MenuItem value="LA">Louisiana</MenuItem>
              <MenuItem value="ME">Maine</MenuItem>
              <MenuItem value="MD">Maryland</MenuItem>
              <MenuItem value="MA">Massachussetts</MenuItem>
              <MenuItem value="MI">Michigan</MenuItem>
              <MenuItem value="MN">Minnesota</MenuItem>
              <MenuItem value="MS">Mississippi</MenuItem>
              <MenuItem value="MO">Missouri</MenuItem>
              <MenuItem value="MT">Montana</MenuItem>
              <MenuItem value="NE">Nebraska</MenuItem>
              <MenuItem value="NV">Nevada</MenuItem>
              <MenuItem value="NH">New Hampshire</MenuItem>
              <MenuItem value="NJ">New Jersey</MenuItem>
              <MenuItem value="NM">New Mexico</MenuItem>
              <MenuItem value="NY">New York</MenuItem>
              <MenuItem value="NC">North Carolina</MenuItem>
              <MenuItem value="ND">North Dakota</MenuItem>
              <MenuItem value="OH">Ohio</MenuItem>
              <MenuItem value="OK">Oklahoma</MenuItem>
              <MenuItem value="OR">Oregon</MenuItem>
              <MenuItem value="PA">Pennsylvanina</MenuItem>
              <MenuItem value="RI">Rhode Island</MenuItem>
              <MenuItem value="SC">South Carolina</MenuItem>
              <MenuItem value="SD">South Dakota</MenuItem>
              <MenuItem value="TN">Tennessee</MenuItem>
              <MenuItem value="TX">Texas</MenuItem>
              <MenuItem value="UT">Utah</MenuItem>
              <MenuItem value="VT">Vermont</MenuItem>
              <MenuItem value="VA">Virginia</MenuItem>
              <MenuItem value="WA">Washington</MenuItem>
              <MenuItem value="WV">West Virginia</MenuItem>
              <MenuItem value="WI">Wisconsin</MenuItem>
              <MenuItem value="WY">Wyoming</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              label="Select Work Category"
              select
              fullWidth
              onChange={(e) => setWorkCategory(e.target.value)}
              value={workCategory}
              variant="standard"
            >
              {categoryData.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="notes"
              name="notes"
              label="Concert Notes"
              fullWidth
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              variant="standard"
              placeholder=""
              multiline
              rows={3}
              rowsmax={10}
            />
          </Grid>
        </Grid>

        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Link style={{ textDecoration: "none" }} to="/performances">
            <Button
              style={{
                backgroundColor: "orange",
                color: "#000",
                fontWeight: "bold",
                marginRight: "25px",
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontWeight: "bold",
              marginRight: "25px",
            }}
            onClick={() => resetForm()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<Send />}
            onClick={handleSubmit}
          >
            Add Performance
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default AddPerformance;
