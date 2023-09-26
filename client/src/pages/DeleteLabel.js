import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "components/ConfirmDialog";
import { Box, Button, Grid } from "@mui/material";

const DeleteLabel = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [label, setLabel] = useState([]);
  const [labels, setLabels] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchLabel = async () => {
      const response = await fetch(`/api/labels/${id}`);
      const json = await response.json();

      if (response.ok) {
        setLabel(json);
        console.log(setLabel);
      }
    };

    fetchLabel();
  }, [id]);

  function getLabels() {
    axios.get("/api/labels").then((res) => {
      setLabels(res.data);
    });
  }

  function deleteLabel() {
    axios
      .delete(`/api/labels/${deleteData?._id}`)
      .then((res) => {
        getLabels();
        setOpenDelete(false);
        navigate("/labels");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenDelete = (label) => {
    setOpenDelete(true);
    setDeleteData(label);
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
            <h1>Delete Label</h1>
          </Box>

          <Box align="center" className="delete">
            <h2>{label.name}</h2>
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
                onClick={() => handleOpenDelete(label)}
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
        deleteFunction={deleteLabel}
      />
    </div>
  );
};
export default DeleteLabel;
