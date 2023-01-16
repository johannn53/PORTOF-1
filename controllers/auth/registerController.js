const { user } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { name = "", email = "", password = "", rePassword = "" } = req.body;
    if (name == "" || email == "" || password == "" || rePassword == "") {
      if (name == "") {
        return res.status(500).json({
          status: 500,
          message: "fill name",
        });
      }
      if (email == "") {
        return res.status(500).json({
          status: 500,
          message: "fill email",
        });
      }
      if (password == "") {
        return res.status(500).json({
          status: 500,
          message: "fill password",
        });
      }
      if (rePassword == "") {
        return res.status(500).json({
          status: 500,
          message: "fill rePassword",
        });
      }
    }

    //CHECK USER EXIST
    const checkUser = await user.findOne({
      where: {
        name: name,
      },
    });
    if (checkUser != null) {
      return res.status(500).json({
        status: 500,
        message: "name taken",
      });
    }

    //CHECK EMAIL
    const checkEmail = await user.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail != null) {
      return res.status(500).json({
        status: 500,
        message: "email taken",
      });
    }

    //CHECK PASSWORD STRENGTH
    if (
      !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,6}$/)
    ) {
      return res.status(500).json({
        status: 500,
        message:
          "minimum password length is 4 and max 6. Must contain 1 UPPERCASE, 1 LOWERCASE and special characters(!@#$%^)",
      });
    }

    //CHECK PASSWORD MATCH
    if (rePassword != password) {
      return res.status(500).json({
        status: 500,
        message: "password not match",
      });
    }

    //ENCRYPT PASSWORD
    const encryptedPassword = bcrypt.hashSync(password, 12);

    //DATA REGIST USER
    const dataRegist = {
      name: name,
      email: email,
      password: encryptedPassword,
      roles: "user",
    };

    const saveRegist = await user.create(dataRegist);
    if (saveRegist == null) {
      return res.status(500).json({
        status: 500,
        message: "failed regist",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success register",
    });
  },

  registerPage: async (req, res) => {
    res.render("auth/register");
  },
};
