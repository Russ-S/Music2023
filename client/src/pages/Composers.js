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
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "components/ConfirmDialog";
import MUIDataTable from "mui-datatables";

const Composers = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [composers, setComposers] = useState([]);

  const reload = () => window.location.reload();

  function getComposers() {
    axios.get("/api/composers").then((res) => {
      setComposers(res.data);
    });
  }

  useEffect(() => {
    getComposers();
  }, []);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: { display: "excluded", filter: false },
    },
    {
      name: "name",
      label: "Composer (Last name, first name (dates)",
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
                  to={`/composers/edit/${tableMeta.rowData[0]}`}
                >
                  <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/composers/delete/${tableMeta.rowData[0]}`}
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
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "of",
      },
    },
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

    const composer = { name };

    const response = await fetch("/api/composers", {
      method: "POST",
      body: JSON.stringify(composer),
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
      console.log("new composer added");
      setOpen(false);
      reload();
    }
  };

  function deleteComposer() {
    axios
      .delete(`/api/composers/${deleteData?._id}`)
      .then((res) => {
        getComposers();
        console.log(res.json);
        setOpenDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(deleteData);

  return (
    <Box className="home">
      <>
        <Box
          sx={{
            "& .MuiTableCell-head": {
              backgroundColor: "#000000",
              color: "#ffffff",
              borderBottom: "none",
            },
            margin: "30px auto 0 auto",
          }}
        >
          {composers && (
            <MUIDataTable
              width="100%"
              title={
                <div className="tableHeader">
                  Composers
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={handleClickOpen}
                  >
                    Add new composer
                  </Button>
                </div>
              }
              data={composers}
              columns={columns}
              options={options}
            />
          )}
        </Box>
      </>

      <ConfirmDialog
        open={openDelete}
        closeDialog={() => setOpenDelete(false)}
        title={deleteData?.name}
        deleteFunction={deleteComposer}
      />

      <Dialog
        PaperProps={{ sx: { width: "40%" } }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Composer</DialogTitle>
          {error && <div className="error">{error}</div>}
          <DialogContent>
            <DialogContentText>
              Enter the composers name and dates in the following format:
              <br />
              <b>
                <em>Brahms, Johannes (1833-1897)</em>
              </b>
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Composer Information"
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

export default Composers;
