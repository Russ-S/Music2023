import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [category, setCategory] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/categories/${id}`);
      const json = await response.json();

      if (response.ok) {
        setCategory(json);
      }
    };

    fetchCategory();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/categories/${id}`, {
        name: category,
      });
      navigate("/categories");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="title">Categories</h2>

      <Box
        align="center"
        sx={{
          width: "40%",
          border: "1px solid #000",
          borderRadius: "5px",
          bgcolor: "#FFF8DC",
          padding: "16px",
          margin: "0 auto",
        }}
      >
        <h2 className="subtitle">Edit Category</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <div className="editLabel">Category Name</div>

          <input
            type="text"
            className="form-input"
            value={category.name}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updateCategory}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/categories")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditCategory;
