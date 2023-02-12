const { user, email_token } = require("../../models");
const bcrypt = require("bcrypt");
const { makeRandom } = require("../../helpers/randomString");
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

module.exports = {
  registerAutoEmail: async (req, res) => {
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
      verified: false,
    };

    const saveRegist = await user.create(dataRegist);
    if (saveRegist == null) {
      return res.status(500).json({
        status: 500,
        message: "failed regist",
      });
    }

    if (saveRegist) {
      let token = makeRandom(20);
      const createToken = await email_token.create({
        user_id: saveRegist.dataValues.id,
        token: token,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      fs.readFile(
        "./emails/userRegisVerif.html",
        { encoding: "utf-8" },
        function (err, html) {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.USER_MAIL,
              pass: process.env.USER_PASS,
            },
          });

          //DATA FOR EJS
          var template = handlebars.compile(html);
          var dataEmail = {
            name: name,
            email: email,
            password: encryptedPassword,
            url: `http://localhost:8899/user/verification/${token}`,
          };
          console.log(dataEmail);
          var html2send = template(dataEmail);

          const mail = {
            from: "ariJohan@gmail.com",
            to: email,
            subject: `hello ${name}, verify your account`,
            html: html2send,
          };

          transporter.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`email has been sent to: ${info.response}`);
            }
          });
        }
      );
    }
    return res.status(200).json({
      status: 200,
      message: "success register",
    });
  },

  //CHECK TOKEN FROM EMAIL TRUE
  confirmVerif: async (req, res) => {
    const { token } = req.params;
    const checkEmailToken = await email_token.findOne({
      where: {
        token: token,
      },
    });
    if (!checkEmailToken) {
      res.render("verifikasi-email-failed");
    }

    const userId = checkEmailToken.dataValues.user_id;
    const update = await user.update(
      {
        verified: true,
        updatedAt: new Date(),
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (!update) {
      res.render("verifikasi-email-fail");
    }

    res.render("verifiedPage");
  },

  confirmPage: async (req, res) => {
    res.render("verifiedPage");
  },

  registerPage: async (req, res) => {
    res.render("register");
  },
};
