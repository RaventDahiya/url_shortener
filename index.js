const express = require("express");
const urlRoutes = require("./routes/url.router.js");
const staticRoutes = require("./routes/staticRouter.js");
const connectDB = require("./db/connection.js");
const URL = require("./models/url.models.js");
const path = require("path");
const userRoutes = require("./routes/user.router.js");
const cookieParser = require("cookie-parser");
const {
  restrictToLoggedInUserOnly,
  checkAuth,
} = require("./middlewares/auth.middleware.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDB();

app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/", checkAuth, staticRoutes);
app.use("/user", userRoutes);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
