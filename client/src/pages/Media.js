import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import axios from "axios";
import MUIDataTable from "mui-datatables";

const Media = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const reload = () => window.location.reload();

  const [media, setMedia] = useState([]);
  const navigate = useNavigate();

  function getMedia() {
    axios.get("/api/media").then((res) => {
      setMedia(res.data);
    });
  }

  useEffect(() => {
    getMedia();
  }, []);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: { display: "excluded", filter: false },
    },
    {
      name: "name",
      label: "Media Name",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <IconButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/media/edit/${tableMeta.rowData[0]}`}
                >
                  <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/media/delete/${tableMeta.rowData[0]}`}
                >
                  <DeleteForeverIcon
                    sx={{ color: "#c62828", fontSize: "20px" }}
                  />
                </Link>
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyRow: {
          styleOverrides: {
            root: {
              "&:nth-of-type(odd)": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            },
          },
        },
      },
    });

  const options = {
    filterType: "textField",
    fixedHeader: true,
    sort: true,
    search: true,
    rowsPerPage: 10,
    selectableRowsHeader: false,
    selectableRows: "none",
    expandableRows: false,
    expandableRowsOnClick: false,
    rowsPerPageOptions: [10, 15],
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const media = { name };

    const response = await fetch("/api/media", {
      method: "POST",
      body: JSON.stringify(media),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setError(null);
      console.log("new media type added");
      setOpen(false);
      reload();
    }
  };

  function deleteMedia() {
    axios
      .delete(`/api/media/${deleteData?._id}`)
      .then((res) => {
        getMedia();
        console.log(res.json);
        setOpenDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(deleteData);

  return (
    <Box className="home">
      <ThemeProvider theme={getMuiTheme}>
        <>
          <Box
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: "#000000",
                color: "#ffffff",
                borderBottom: "none",
              },
              margin: "40px auto 0 auto",
            }}
          >
            {media && (
              <MUIDataTable
                width="100%"
                title={
                  <div className="tableHeader">
                    Media Types
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleClickOpen}
                    >
                      Add new media type
                    </Button>
                  </div>
                }
                data={media}
                columns={columns}
                options={options}
              />
            )}
          </Box>
        </>
      </ThemeProvider>

      <ConfirmDialog
        open={openDelete}
        closeDialog={() => setOpenDelete(false)}
        title={deleteData?.name}
        deleteFunction={deleteMedia}
      />

      <Dialog
        PaperProps={{ sx: { width: "40%" } }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Media Type</DialogTitle>
          {error && <div className="error">{error}</div>}
          <DialogContent>
            <DialogContentText>Enter the media type:</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Media Type"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
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
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Media;
