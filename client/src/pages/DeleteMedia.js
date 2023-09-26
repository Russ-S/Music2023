import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import { Box, Button, Grid } from "@mui/material";

const DeleteMedia = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [media, setMedia] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch(`/api/media/${id}`);
      const json = await response.json();

      if (response.ok) {
        setMedia(json);
        console.log(setMedia);
      }
    };

    fetchMedia();
  }, [id]);

  function getMedia() {
    axios.get("/api/media").then((res) => {
      setMedia(res.data);
    });
  }

  function deleteMedia() {
    axios
      .delete(`/api/media/${deleteData?._id}`)
      .then((res) => {
        getMedia();
        setOpenDelete(false);
        navigate("/media");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenDelete = (media) => {
    setOpenDelete(true);
    setDeleteData(media);
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
            <h1>Delete Media Type</h1>
          </Box>

          <Box align="center" className="delete">
            <h2>{media.name}</h2>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Button
                type="reset"
                size="large"
                variant="contained"
                color="warning"
                onClick={() => navigate("/media")}
                sx={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="error"
                onClick={() => handleOpenDelete(media)}
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
        deleteFunction={deleteMedia}
      />
    </div>
  );
};
export default DeleteMedia;
