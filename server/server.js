require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// routes
const recordingRoutes = require("./routes/recordings");
const performanceRoutes = require("./routes/performances");
const composerRoutes = require("./routes/composers");
const mediaRoutes = require("./routes/media");
const labelRoutes = require("./routes/labels");
const categoryRoutes = require("./routes/categories");

// express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/recordings", recordingRoutes);
app.use("/api/performances", performanceRoutes);
app.use("/api/composers", composerRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/categories", categoryRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
