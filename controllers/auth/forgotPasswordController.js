const { makeRandom } = require("../../helpers/randomString");
const { user } = require("../../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

module.exports = {
  resetPassWithoutButton: async (req, res) => {
    const { email_user = "" } = req.body;
    if (email_user == "") {
      return res.status(400).json({
        status: 400,
        message: "fill email",
      });
    }

    let email = email_user;

    const findUser = await user.findOne({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        status: 404,
        message: `user with email ${email_user} not found`,
      });
    }

    const arrEmail = email.split("@");
    let password = makeRandom(5);
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const update = await user.update(
      {
        password: encryptedPassword,
      },
      {
        where: {
          email: email_user,
        },
      }
    );

    if (update) {
      fs.readFile(
        "./emails/resetPassword.html",
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
          var template = handlebars.compile(html);
          var dataEmail = {
            email: email,
            password: password,
          };
          console.log(dataEmail);
          var html2send = template(dataEmail);

          const mail = {
            from: "arijohand@gmail.com",
            to: email,
            subject: `hello ${arrEmail[0]}`,
            html: html2send,
          };

          transporter.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`email has been sent to ${info.response}`);
            }
          });
        }
      );
    }
    return res.status(200).json({
      status: 200,
      message: "success sent forgot password mail",
    });
  },
};
