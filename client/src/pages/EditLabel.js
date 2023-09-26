import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditLabel = () => {
  const [label, setLabel] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchLabel = async () => {
      const response = await fetch(`/api/labels/${id}`);
      const json = await response.json();

      if (response.ok) {
        setLabel(json);
      }
    };

    fetchLabel();
  }, []);

  const updateLabel = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/labels/${id}`, {
        name: label,
      });
      navigate("/labels");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="title">Labels</h2>
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
        <h2 className="subtitle">Edit Label</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <div className="editLabel">Label Name</div>

          <input
            type="text"
            className="form-input"
            value={label.name}
            onChange={(e) => setLabel(e.target.value)}
          />

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updateLabel}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/labels")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditLabel;
