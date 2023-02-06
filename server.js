const express = require("express");
const app = express();
const port = process.env.PORT || 8899;
require("dotenv").config();
``;
const path = require("path");

const indexRouter = require("./routers/indexRouter");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs"); //login register
app.set("views", path.join(__dirname, "/views/auth")); //verif email success or failed

app.use(indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
