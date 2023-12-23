"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const TaskRoutes = require("./routes/task-routes");
const app = express();

app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(bodyParser.json());

app.use("/api", TaskRoutes.routes);
app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);