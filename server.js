const express = require("express");
const app = express();
const { json } = require("sequelize");
const port = process.env.PORT || 8899;
require("dotenv").config();

const indexRouter = require("./routers/indexRouter");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
