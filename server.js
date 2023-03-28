const express = require("express");
const dotenv = require("dotenv").config;
const connectDb = require("./config/dbConnection");
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");
connectDb();
app.use(express.json());
app.use(errorHandler);
app.use("/posts", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
