const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const { sequelize } = require("./connection");
const Api = require("./router/api");
const Kerjasama = require("./router/kerjasama");

sequelize
  .authenticate()
  .then((db) => {
    console.log("CONNECTION ESTABLISHED! ");
  })
  .catch((err) => {
    console.error("UNABLE TO ESTABLISH CONNECTION: ", err);
  });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", Api);
app.use("/kerjasama", Kerjasama);

app.get("/", (res) => {
  res.send("api-Icei");
});

app.listen(port, () => {
  console.log(`API-Icei listening at http://localhost:${port}`);
});