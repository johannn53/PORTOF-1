const { makeRandom } = require("../../helpers/randomString");
const { user, email_token } = require("../../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

module.exports = {
  inviteWIthVerifMail: async (req, res) => {
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
        verified: false,
        roles: "admin",
        password: encryptedPassword,
      });

      if (create) {
        let token = makeRandom(20);

        const createToken = await email_token.create({
          user_id: create.dataValues.id,
          token: token,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        fs.readFile(
          "./emails/invite-2.html",
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
              url: `http://localhost:8899/user/verification/${token}`,
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
  confirmVerified: async (req, res) => {
    const { token } = req.params;
    const checkEmailToken = await email_token.findOne({
      where: {
        token: token,
      },
    });

    if (!checkEmailToken) {
      res.render("verifikasi-email-fail");
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

    res.render("verifikasi-email");
  },
};
