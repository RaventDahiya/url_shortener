const express = require("express");
const urlRoutes = require("./routes/url.router.js");
const connectDB = require("./db/connection.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/url", urlRoutes);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
