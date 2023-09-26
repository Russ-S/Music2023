import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import { Box, Button, Grid } from "@mui/material";

const DeleteCategory = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/categories/${id}`);
      const json = await response.json();

      if (response.ok) {
        setCategory(json);
        console.log(setCategory);
      }
    };

    fetchCategory();
  }, [id]);

  function getCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  function deleteCategory() {
    axios
      .delete(`/api/categories/${deleteData?._id}`)
      .then((res) => {
        getCategories();
        setOpenDelete(false);
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenDelete = (category) => {
    setOpenDelete(true);
    setDeleteData(category);
  };

  return (
    <div>
      <Box sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            width: "80vw",
            margin: "0 auto",
            border: "1px solid #000000",
            paddingBottom: "30px",
            backgroundColor: "#ffffff",
          }}
        >
          <Box align="center" sx={{ color: "#ff0000" }}>
            <h1>Delete Category</h1>
          </Box>

          <Box align="center" className="delete">
            <h2>{category.name}</h2>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Button
                type="reset"
                size="large"
                variant="contained"
                color="warning"
                onClick={() => navigate("/categories")}
                sx={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="error"
                onClick={() => handleOpenDelete(category)}
                sx={{ marginLeft: "20px" }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ConfirmDialog
        open={openDelete}
        closeDialog={() => setOpenDelete(false)}
        title={deleteData?.name}
        deleteFunction={deleteCategory}
      />
    </div>
  );
};
export default DeleteCategory;
