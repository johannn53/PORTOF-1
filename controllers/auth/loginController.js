const { user } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "secretkeyjwt";

module.exports = {
  login: async (req, res) => {
    const { name = "", password = "" } = req.body;
    if (name == "" || password == "") {
      if (name == "") {
        return res.status(500).json({
          status: 500,
          message: "fill name",
        });
      }
    }
    if (password == "") {
      return res.status(500).json({
        status: 500,
        message: "fill password",
      });
    }

    //CHECK USER EXIST
    const checkUser = await user.findOne({
      where: {
        name: name,
      },
    });
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    //CHECK PASSWORD MATCH
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (checkPassword == false) {
      return res.status(500).json({
        status: 500,
        message: "wrong username or password",
      });
    }

    //MAKE TOKEN
    const accessToken = jwt.sign(
      {
        id: checkUser.id,
        name: checkUser.name,
        roles: checkUser.roles,
        type: "access_token",
      },
      secretKey,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        id: checkUser.id,
        name: checkUser.name,
        roles: checkUser.roles,
        type: "refresh_token",
      },
      secretKey,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      status: 200,
      message: "success login",
      id: checkUser.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  },
  loginPage: async (req, res) => {
    res.render("login");
  },
};
