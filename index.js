const express = require("express");
const urlRoutes = require("./routes/url.router.js");
const staticRoutes = require("./routes/staticRouter.js");
const connectDB = require("./db/connection.js");
const URL = require("./models/url.models.js");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDB();

app.use("/url", urlRoutes);
app.use("/", staticRoutes);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
