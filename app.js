require("dotenv").config();
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers/index");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});