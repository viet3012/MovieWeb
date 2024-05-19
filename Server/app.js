const path = require("path");

const express = require("express");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const movieRoute = require("./routes/movie");
app.use("/api/movies", auth, movieRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(5000);
