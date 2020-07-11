const express = require("express");
const cors = require("cors");
const db = require("./config/mongoose");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(cors());

app.use("/", routes);
app.use("/uploads/:filename", express.static(__dirname + "/uploads"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
