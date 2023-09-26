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

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [categories, setCategories] = useState([]);

  const reload = () => window.location.reload();

  function getCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: { display: "excluded", filter: false },
    },
    {
      name: "name",
      label: "Category Name",
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
                  to={`/categories/edit/${tableMeta.rowData[0]}`}
                >
                  <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/categories/delete/${tableMeta.rowData[0]}`}
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
    rowsPerPageOptions: [10, 15, 25],
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

    const category = { name };

    const response = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(category),
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
      console.log("new category added");
      setOpen(false);
      reload();
    }
  };

  function deleteCategory() {
    axios
      .delete(`/api/categories/${deleteData?._id}`)
      .then((res) => {
        getCategories();
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
            {categories && (
              <MUIDataTable
                width="100%"
                title={
                  <div className="tableHeader">
                    Categories
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleClickOpen}
                    >
                      Add new category
                    </Button>
                  </div>
                }
                data={categories}
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
        deleteFunction={deleteCategory}
      />

      <Dialog
        PaperProps={{ sx: { width: "40%" } }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Category</DialogTitle>
          {error && <div className="error">{error}</div>}
          <DialogContent>
            <DialogContentText>Enter the category name:</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
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

export default Categories;

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
// import ConfirmDialog from "components/ConfirmDialog";
// import axios from "axios";

// const Categories = () => {
//   const [open, setOpen] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteData, setDeleteData] = useState({});

//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   const [query, setQuery] = useState("");

//   const keys = ["name"];

//   function getCategories() {
//     axios.get("/api/categories").then((res) => {
//       setCategories(res.data);
//     });
//   }

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//       width: 700,
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

//     const category = { name };

//     const response = await fetch("/api/categories", {
//       method: "POST",
//       body: JSON.stringify(category),
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
//       console.log("new category added");
//     }
//   };

//   function deleteCategory() {
//     axios
//       .delete(`/api/categories/${deleteData?._id}`)
//       .then((res) => {
//         getCategories();
//         console.log(res.json);
//         setOpenDelete(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   console.log(deleteData);

//   const handleOpenDelete = (category) => {
//     setOpenDelete(true);
//     setDeleteData(category);
//   };

//   return (
//     <div className="home">
//       <div className="list-top">
//         <h2>Categories</h2>
//         <InputBase
//           placeholder="Search categories"
//           startAdornment={
//             <Search fontSize="small" sx={{ marginRight: "8px" }} />
//           }
//           className="searchInput"
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <Button variant="outlined" onClick={handleClickOpen}>
//           ADD CATEGORY
//         </Button>
//       </div>

//       <div className="categories-content">
//         <TableContainer component={Paper}>
//           <Table sx={{ width: 400 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell width="400px">Category Name</StyledTableCell>
//                 <StyledTableCell align="center" width="100px">
//                   Actions
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {categories
//                 .filter((category) =>
//                   keys.some((key) =>
//                     category[key].toLowerCase().includes(query)
//                   )
//                 )
//                 .slice(pg * rpg, pg * rpg + rpg)
//                 .map((category) => (
//                   <StyledTableRow
//                     key={category._id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <StyledTableCell component="th" scope="row">
//                       {category.name}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() =>
//                           navigate(`/categories/edit/${category._id}`)
//                         }
//                       >
//                         <EditIcon sx={{ fontSize: "20px" }} />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleOpenDelete(category)}
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
//           count={categories.length}
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
//         deleteFunction={deleteCategory}
//       />

//       <Dialog
//         PaperProps={{ sx: { width: "40%" } }}
//         open={open}
//         onClose={handleClose}
//       >
//         <form onSubmit={handleSubmit}>
//           <DialogTitle>Add Category</DialogTitle>
//           {error && <div className="error">{error}</div>}
//           <DialogContent>
//             <DialogContentText>Enter the category name:</DialogContentText>

//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Category Name"
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

// export default Categories;
