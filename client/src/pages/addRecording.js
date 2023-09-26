import defaultImage from "../no-image.jpg";
import { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecording = () => {
  const [composerData, setComposerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  // Field values
  const [composer, setComposer] = useState();
  const [coverPic, setCoverPic] = useState();
  // const [coverImage, setCoverImage] = useState();
  const [composition, setComposition] = useState();
  const [artists, setArtists] = useState();
  const [conductor, setConductor] = useState();
  const [ensemble, setEnsemble] = useState();
  const [media, setMedia] = useState();
  const [workCategory, setWorkCategory] = useState();
  const [fileCategory, setFileCategory] = useState();
  const [label, setLabel] = useState();
  const [catalogNumber, setCatalogNumber] = useState();
  const [digital, setDigital] = useState();
  const [source, setSource] = useState();
  const [tapeNumber, setTapeNumber] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [value, setValue] = useState();
  const [location, setLocation] = useState();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // const reload = () => window.location.reload();

  function getRecordings() {
    axios.get("/api/recordings").then((res) => {
      setRecordings(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    getRecordings();
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

  useEffect(() => {
    const fetchMediaData = async () => {
      const response = await fetch("/api/media");
      const json = await response.json();

      if (response.ok) {
        setMediaData(json);
      }
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
    };

    fetchLabelData();
  }, []);

  // const [state, setState] = useState({
  //   composer: "",
  //   coverPic: "",
  //   composition: "",
  //   artists: "",
  //   conductor: "",
  //   ensemble: "",
  //   media: "",
  //   workCategory: "",
  //   fileCategory: "",
  //   label: "",
  //   catalogNumber: "",
  //   digital: "",
  //   source: "",
  //   tapeNumber: "",
  //   purchaseDate: "",
  //   value: "",
  //   location: "",
  // });

  // function reset(e) {
  //   e.preventDefault();
  //   setState({  });
  // }

  const resetForm = () => {
    setComposer("");
    setCoverPic({ defaultImage });
    setComposition("");
    setArtists("");
    setConductor("");
    setEnsemble("");
    setMedia("");
    setWorkCategory("");
    setFileCategory("");
    setLabel("");
    setCatalogNumber("");
    setDigital("");
    setSource("");
    setTapeNumber("");
    setPurchaseDate("");
    setValue("");
    setLocation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverImage = coverPic.replace("C:\\fakepath\\", "");

    const recording = {
      composer,
      coverImage,
      composition,
      artists,
      conductor,
      ensemble,
      media,
      workCategory,
      fileCategory,
      label,
      catalogNumber,
      digital,
      source,
      tapeNumber,
      purchaseDate,
      value,
      location,
    };

    const response = await fetch("/api/recordings", {
      method: "POST",
      body: JSON.stringify(recording),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setComposer("");
      setCoverPic("");
      setComposition("");
      setArtists("");
      setConductor("");
      setEnsemble("");
      setMedia("");
      setWorkCategory("");
      setFileCategory("");
      setLabel("");
      setCatalogNumber("");
      setDigital("");
      setSource("");
      setTapeNumber("");
      setPurchaseDate("");
      setValue("");
      setLocation("");
      setError(null);
    }
  };

  // const getDisabled = (e) => {
  //   console.log(media);
  //   if (media === "Compact Disc") return { disabled: true };
  //   return {};
  // };

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
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Add Recording</h2>
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
                <MenuItem
                  key={composer._id}
                  value={composer.name}
                  sx={{ color: "#000000" }}
                >
                  {composer.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField
              type={"file"}
              accept="image/*"
              id="coverImage"
              onChange={(e) => setCoverPic(e.target.value)}
              name="coverImage"
              label="Cover Image"
              fullWidth
              default="no-image.jpg"
              variant="standard"
            />
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

          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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

          <Grid item sm={12} md={4}>
            <TextField
              required
              label="Select Media"
              select
              fullWidth
              onChange={(e) => setMedia(e.target.value)}
              value={media}
              variant="standard"
            >
              {mediaData.map((media) => (
                <MenuItem key={media._id} value={media.name}>
                  {media.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={12} md={4}>
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
          <Grid item sm={12} md={4}>
            <TextField
              required
              label="Select File Category"
              select
              fullWidth
              onChange={(e) => setFileCategory(e.target.value)}
              value={fileCategory}
              variant="standard"
            >
              {categoryData.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Select Label"
              select
              fullWidth
              onChange={(e) => setLabel(e.target.value)}
              value={label}
              variant="standard"
            >
              {labelData.map((label) => (
                <MenuItem key={label._id} value={label.name}>
                  {label.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="catalogNumber"
              name="catalogNumber"
              label="Catalog Number"
              fullWidth
              onChange={(e) => setCatalogNumber(e.target.value)}
              value={catalogNumber}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Select Digital Format"
              select
              fullWidth
              default="None"
              onChange={(e) => setDigital(e.target.value)}
              value={digital}
              variant="standard"
            >
              <MenuItem value="DDD">DDD</MenuItem>
              <MenuItem value="ADD">ADD</MenuItem>
              <MenuItem value="AAD">AAD</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Select Source"
              select
              fullWidth
              // disabled={isFieldDisabled}
              // {...this.getDisabled(true)}
              onChange={(e) => setSource(e.target.value)}
              value={source}
              variant="standard"
            >
              {mediaData.map((media) => (
                <MenuItem key={media._id} value={media.name}>
                  {media.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="tapeNumber"
              name="tapeNumber"
              label="CD-R/Tape Number"
              fullWidth
              onChange={(e) => setTapeNumber(e.target.value)}
              value={tapeNumber}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Purchase/Recorded Date*"
                variant="standard"
                components={{
                  OpenPickerIcon: CalendarMonthIcon,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                value={purchaseDate}
                onChange={(newValue) => setPurchaseDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={1}>
            {/* <TextField /> */}
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="value"
              name="value"
              label="Value"
              fullWidth
              onChange={(e) => setValue(e.target.value)}
              value={value}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              label="Select Location"
              select
              fullWidth
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              variant="standard"
            >
              <MenuItem value="Cortez, CO">Cortez, CO</MenuItem>
              <MenuItem value="Fallston, MD">Fallston, MD</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Link style={{ textDecoration: "none" }} to="/recordings">
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
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Add Recording
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default AddRecording;
