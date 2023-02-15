const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 8899;
require("dotenv").config();

const path = require("path");

//IMPORT ROUTER
const indexRouter = require("./routers/indexRouter");

//IMPORT
const passport = require("./lib/passport");

//OAUTH GOOGLE SESSION CONFIG
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUnitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
