import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditMedia = () => {
  const [media, setMedia] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch(`/api/media/${id}`);
      const json = await response.json();

      if (response.ok) {
        setMedia(json);
      }
    };

    fetchMedia();
  }, []);

  const updateMedia = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/media/${id}`, {
        name: media,
      });
      navigate("/media");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="title">Media Types</h2>
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
        <h2 className="subtitle">Edit Media</h2>
        <p className="has-text-centered">{msg}</p>

        <form>
          <div className="editLabel">Media Name</div>

          <input
            type="text"
            className="form-input"
            value={media.name}
            onChange={(e) => setMedia(e.target.value)}
          />

          <Stack direction="row" spacing={2} display="block" marginTop={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={updateMedia}
            >
              Update
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={() => navigate("/media")}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default EditMedia;
