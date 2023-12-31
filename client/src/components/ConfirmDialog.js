import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function ConfirmDialog({ open, closeDialog, title, deleteFunction }) {
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        maxWidth="md"
        scroll="body"
        onClose={closeDialog}
        // onBackdropClick={closeDialog}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
          <IconButton
            size="medium"
            onClick={closeDialog}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            X
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5">Delete {title}</Typography>
                <Typography variant="body1">
                  Are you sure you want to delete {title}? <br />
                </Typography>
                <Typography variant="h6">This cannot be reversed!</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <Button
                onClick={closeDialog}
                size="medium"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={deleteFunction}
                size="medium"
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ConfirmDialog;
