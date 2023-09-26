import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import axios from "axios";

const EditComposer = () => {
  const [composer, setComposer] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchComposer = async () => {
      const response = await fetch(`/api/composers/${id}`);
      const json = await response.json();

      if (response.ok) {
        setComposer(json);
      }
    };

    fetchComposer();
  }, []);

  const updateComposer = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/composers/${id}`, {
        name: composer,
      });
      navigate("/composers");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="title">Composers</h2>
      <Box
        align="center"
        sx={{
          width: "50%",
          border: "1px solid #000",
          borderRadius: "5px",
          bgcolor: "#FFF8DC",
          padding: "16px",
          margin: "0 auto",
        }}
      >
        <h2 className="subtitle">Edit Composer</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <div className="editLabel">
            Composer - Last name, First name (dates)
          </div>

          <input
            type="text"
            className="form-input"
            value={composer.name}
            onChange={(e) => setComposer(e.target.value)}
          />

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updateComposer}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/composers")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};
export default EditComposer;
