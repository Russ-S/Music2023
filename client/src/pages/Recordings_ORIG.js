import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  InputBase,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  styled,
  IconButton,
} from "@mui/material";
import { Send, Search, Visibility } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Recordings = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [composerData, setComposerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  // Field values
  const [composer, setComposer] = useState();
  const [coverImage, setCoverImage] = useState();
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
  const [value, setValue] = useState("0.00");
  const [location, setLocation] = useState();

  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");

  const keys = [
    "composer",
    "composition",
    "artists",
    "media",
    "conductor",
    "ensemble",
    "workCategory",
    "catalogNumber",
    "tapeNumber",
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function getRecordings() {
    axios.get("/api/recordings").then((res) => {
      setRecordings(res.data);
    });
  }

  useEffect(() => {
    getRecordings();
  }, []);

  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(15);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/recordings");
  };

  const resetForm = () => {
    setComposer("");
    setCoverImage("");
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
    setValue("0.00");
    setLocation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setComposer("");
      setCoverImage("");
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

  function deleteRecording() {
    axios
      .delete(`/api/recordings/${deleteData?._id}`)
      .then((res) => {
        getRecordings();
        setOpenDelete(false);
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
    <div className="home">
      <div className="list-top">
        <h2>Recordings</h2>
        <InputBase
          placeholder="Search recordings"
          startAdornment={
            <Search fontSize="small" sx={{ marginRight: "8px" }} />
          }
          className="searchInput"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          ADD RECORDING
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Composer</StyledTableCell>
              <StyledTableCell align="left">Composition</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Media</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings
              .filter((recording) =>
                keys.some((key) => recording[key].includes(query))
              )
              .slice(pg * rpg, pg * rpg + rpg)
              .map((recording) => (
                <StyledTableRow
                  key={recording._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {recording.composer}
                  </TableCell>
                  <StyledTableCell align="left">
                    {recording.composition}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {recording.workCategory}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {recording.media}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {recording.location === "Fallston, MD"
                      ? "Fallston, MD"
                      : "Cortez, CO"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      color="success"
                      onClick={() => navigate(`/recordings/${recording._id}`)}
                    >
                      <Visibility sx={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/recordings/edit/${recording._id}`)
                      }
                    >
                      <EditIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDelete(recording)}
                    >
                      <DeleteForeverIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          ".MuiTablePagination-toolbar": {
            backgroundColor: "#dedede",
            color: "rgb(41, 39, 39)",
            height: "35px",
          },
        }}
        rowsPerPageOptions={[10, 15]}
        component="div"
        count={recordings.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ConfirmDialog
        open={openDelete}
        closeDialog={() => setOpenDelete(false)}
        title={deleteData?.composition}
        deleteFunction={deleteRecording}
      />

      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Add Recording</DialogTitle>
          {error && <div className="error">{error}</div>}
          <DialogContentText sx={{ pl: "24px" }}>
            <em>(* Required Fields)</em>
          </DialogContentText>
          <DialogContent>
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
                <TextField
                  id="coverImage"
                  name="coverImage"
                  label="Cover Image"
                  fullWidth
                  onChange={(e) => setCoverImage(e.target.value)}
                  value={coverImage}
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
                    label="Purchase Date"
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
                  default="0.00"
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
          </DialogContent>
          <DialogActions
            sx={{
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <Button
              style={{
                backgroundColor: "orange",
                color: "#000",
                fontWeight: "bold",
                marginRight: "25px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
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
              Add Recording
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Recordings;
