import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import { Box, Button, Grid } from "@mui/material";

const DeleteComposer = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [composer, setComposer] = useState([]);
  const [composers, setComposers] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchComposer = async () => {
      const response = await fetch(`/api/composers/${id}`);
      const json = await response.json();

      if (response.ok) {
        setComposer(json);
        console.log(setComposer);
      }
    };

    fetchComposer();
  }, [id]);

  function getComposers() {
    axios.get("/api/composers").then((res) => {
      setComposers(res.data);
    });
  }

  function deleteComposer() {
    axios
      .delete(`/api/composers/${deleteData?._id}`)
      .then((res) => {
        getComposers();
        setOpenDelete(false);
        navigate("/composers");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenDelete = (composer) => {
    setOpenDelete(true);
    setDeleteData(composer);
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
            <h1>Delete Composer</h1>
          </Box>

          <Box align="center" className="delete">
            <h2>{composer.name}</h2>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Button
                type="reset"
                size="large"
                variant="contained"
                color="warning"
                onClick={() => navigate("/composers")}
                sx={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="error"
                onClick={() => handleOpenDelete(composer)}
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
        deleteFunction={deleteComposer}
      />
    </div>
  );
};
export default DeleteComposer;
