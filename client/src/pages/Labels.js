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
import axios from "axios";
import ConfirmDialog from "components/ConfirmDialog";
import MUIDataTable from "mui-datatables";

const Labels = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const reload = () => window.location.reload();

  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();

  function getLabels() {
    axios.get("/api/labels").then((res) => {
      setLabels(res.data);
    });
  }

  useEffect(() => {
    getLabels();
  }, []);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: { display: "excluded", filter: false },
    },
    {
      name: "name",
      label: "Label Name",
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
                  to={`/labels/edit/${tableMeta.rowData[0]}`}
                >
                  <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/labels/delete/${tableMeta.rowData[0]}`}
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

    const label = { name };

    const response = await fetch("/api/labels", {
      method: "POST",
      body: JSON.stringify(label),
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
      console.log("new label added");
      setOpen(false);
      reload();
    }
  };

  function deleteLabel() {
    axios
      .delete(`/api/labels/${deleteData?._id}`)
      .then((res) => {
        getLabels();
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
      <ThemeProvider theme={getMuiTheme}>
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
            {labels && (
              <MUIDataTable
                width="100%"
                title={
                  <div className="tableHeader">
                    Labels
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleClickOpen}
                    >
                      Add new label
                    </Button>
                  </div>
                }
                data={labels}
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
        deleteFunction={deleteLabel}
      />

      <Dialog
        PaperProps={{ sx: { width: "40%" } }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Label</DialogTitle>
          {error && <div className="error">{error}</div>}
          <DialogContent>
            <DialogContentText>Enter the label name:</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Label Name"
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

export default Labels;

// import { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   InputBase,
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   Paper,
//   styled,
//   IconButton,
// } from "@mui/material";
// import { Send, Search, Delete } from "@mui/icons-material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ConfirmDialog from "components/ConfirmDialog";

// const Labels = () => {
//   const [open, setOpen] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteData, setDeleteData] = useState({});

//   const [labels, setLabels] = useState([]);
//   const navigate = useNavigate();

//   const [query, setQuery] = useState("");

//   const keys = ["name"];

//   function getLabels() {
//     axios.get("/api/labels").then((res) => {
//       setLabels(res.data);
//     });
//   }

//   useEffect(() => {
//     getLabels();
//   }, []);

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//       width: 600,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     "&:nth-of-type(even)": {
//       backgroundColor: "#ffffff",
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   const [pg, setpg] = useState(0);
//   const [rpg, setrpg] = useState(15);

//   function handleChangePage(event, newpage) {
//     setpg(newpage);
//   }

//   function handleChangeRowsPerPage(event) {
//     setrpg(parseInt(event.target.value, 10));
//     setpg(0);
//   }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [name, setName] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const label = { name };

//     const response = await fetch("/api/labels", {
//       method: "POST",
//       body: JSON.stringify(label),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//     }
//     if (response.ok) {
//       setName("");
//       setError(null);
//       console.log("new label added");
//     }
//   };

//   function deleteLabel() {
//     axios
//       .delete(`/api/labels/${deleteData?._id}`)
//       .then((res) => {
//         getLabels();
//         console.log(res.json);
//         setOpenDelete(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   console.log(deleteData);

//   const handleOpenDelete = (label) => {
//     setOpenDelete(true);
//     setDeleteData(label);
//   };

//   return (
//     <div className="home">
//       <div className="list-top">
//         <h2>Labels</h2>
//         <InputBase
//           placeholder="Search labels"
//           startAdornment={
//             <Search fontSize="small" sx={{ marginRight: "8px" }} />
//           }
//           className="searchInput"
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <Button variant="outlined" onClick={handleClickOpen}>
//           ADD LABEL
//         </Button>
//       </div>

//       <div className="labels-content">
//         <TableContainer component={Paper}>
//           <Table sx={{ width: 400 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell width="400px">Label Name</StyledTableCell>
//                 <StyledTableCell align="center" width="100px">
//                   Actions
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {labels
//                 .filter((label) =>
//                   keys.some((key) => label[key].toLowerCase().includes(query))
//                 )
//                 .slice(pg * rpg, pg * rpg + rpg)
//                 .map((label) => (
//                   <StyledTableRow
//                     key={label._id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <StyledTableCell component="th" scope="row">
//                       {label.name}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => navigate(`/labels/edit/${label._id}`)}
//                       >
//                         <EditIcon sx={{ fontSize: "20px" }} />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleOpenDelete(label)}
//                       >
//                         <Delete sx={{ fontSize: "20px" }} />
//                       </IconButton>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           sx={{
//             ".MuiTablePagination-toolbar": {
//               backgroundColor: "#dedede",
//               color: "rgb(41, 39, 39)",
//               height: "35px",
//             },
//           }}
//           rowsPerPageOptions={[10, 15, 25]}
//           component="div"
//           count={labels.length}
//           rowsPerPage={rpg}
//           page={pg}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>

//       <ConfirmDialog
//         open={openDelete}
//         closeDialog={() => setOpenDelete(false)}
//         title={deleteData?.name}
//         deleteFunction={deleteLabel}
//       />

//       <Dialog
//         PaperProps={{ sx: { width: "40%" } }}
//         open={open}
//         onClose={handleClose}
//       >
//         <form onSubmit={handleSubmit}>
//           <DialogTitle>Add Label</DialogTitle>
//           {error && <div className="error">{error}</div>}
//           <DialogContent>
//             <DialogContentText>Enter the label name:</DialogContentText>

//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Label Name"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               fullWidth
//               variant="standard"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               style={{
//                 backgroundColor: "orange",
//                 color: "#000",
//                 fontWeight: "bold",
//                 marginRight: "25px",
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" endIcon={<Send />}>
//               Save
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </div>
//   );
// };

// export default Labels;
