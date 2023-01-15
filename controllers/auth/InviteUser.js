const { makeRandom } = require("../../helpers/randomString");
const { user } = require("../../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

module.exports = {
  inviteUserWithoutButton: async (req, res) => {
    const { list_user = [] } = req.body;
    if (list_user.length < 1) {
      return res.status(400).json({
        status: 400,
        message: "No recipient found",
      });
    }

    for (let i = 0; i < list_user.length; i++) {
      let email = list_user[i];
      const userData = await user.findOne({
        where: {
          email: email,
        },
      });

      if (userData) {
        return res.status(400).json({
          status: 400,
          message: `Email ${email} sudah terdaftar`,
        });
      }

      const arrEmail = email.split("@"); // dava@gmail.com -> ['dava','gmail.com']

      let password = makeRandom(10);
      const encryptedPassword = bcrypt.hashSync(password, 10);

      const create = await user.create({
        name: arrEmail[0],
        email: email,
        is_verified: true,
        roles: "admin",
        password: encryptedPassword,
      });

      if (create) {
        fs.readFile(
          "./emails/inviteWithoutButton.html",
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
            var template = handlebars.compile(html); // add this line
            var dataEmail = {
              email: email,
              password: password,
            };
            console.log(dataEmail);
            var html2send = template(dataEmail);

            const mail = {
              from: "ariJohan@gmail.com",
              to: email,
              subject: `Hello ${arrEmail[0]}, segera login ke apps`, // tambahkan nama di subject
              html: html2send, // add this line
              // text:'Are you okay ?',
            };

            transporter.sendMail(mail, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Email has been sent: " + info.response);
              }
            });
          }
        );
      }
    }
    return res.status(200).json({ status: 200, message: "Successfull invite" });
  },
};
