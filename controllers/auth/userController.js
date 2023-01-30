const { makeRandom } = require("../../helpers/randomString");
const { user, email_token } = require("../../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

module.exports = {
  getAllUser: async (req, res) => {
    const { page, limit } = req.query;

    //LIMIT VIEW
    if (limit == "") {
      return res.status(400).json({
        status: 400,
        message: "fill number for limit view user",
      });
    }
    if (isNaN(limit)) {
      return res.status(400).json({
        status: 400,
        message: "fill number f",
      });
    }

    //PAGE NUMBER
    if (page == "") {
      return res.status(400).json({
        status: 400,
        message: "fill number page",
      });
    }
    if (isNaN(page)) {
      res.status(400).json({
        status: 400,
        message: "input page number",
      });
    }

    //GET ALL
    const allUser = await user.findAndCountAll({
      limit: limit,
      offset: page * limit,
      order: [["id", "asc"]],
    });

    if (allUser.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "no user found",
      });
    }

    const totalUser = await user.count();
    res.status(200).json({
      status: 200,
      message: "success get all user",
      response: allUser,
      totalPage: Math.ceil(totalUser / limit),
    });
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const getUser = await user.findOne({
      where: {
        id: id,
      },
    });
    if (!getUser) {
      return res.status(404).json({
        status: 400,
        message: `user with id ${id} not found`,
      });
    }

    res.status(200).json({
      status: 200,
      message: `success get user with id ${id}`,
      response: [
        `id: ${getUser.id}`,
        `name: ${getUser.name}`,
        `email: ${getUser.email}`,
      ],
    });
  },

  getByName: async (req, res) => {
    const { name } = req.params;
    const getName = await user.findOne({
      where: {
        name: name,
      },
    });
    if (!getName) {
      return res.status(404).json({
        status: 404,
        message: `no user with name ${name} exist`,
      });
    }
    return res.status(200).json({
      status: 200,
      message: `success get user with name ${name}`,
      response: [
        `id: ${getName.id}`,
        `name: ${getName.name}`,
        `email: ${getName.email}`,
      ],
    });
  },

  //UPDATE BY ID
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name = "", email = "", password = "", rePassword = "" } = req.body;
    if (name == "" || email == "" || password == "" || rePassword == "") {
      if (name == "") {
        return res.status(400).json({
          status: 400,
          message: "fill name",
        });
      }
      if (email == "") {
        return res.status(400).json({
          status: 400,
          message: "fill email",
        });
      }
      if (password == "") {
        return res.status(400).json({
          status: 400,
          message: "fill password",
        });
      }
      if (rePassword == "") {
        return res.status(400).json({
          status: 400,
          message: "fill re-entered password",
        });
      }
    }

    //CHECK USER EXIST
    const checkUser = await user.findOne({
      where: {
        id: id,
      },
    });
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: `user with id ${id} not found`,
      });
    }

    //CHECK EMAIL EXIST
    const checkEmail = await user.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail.length > 1) {
      return res.status(400).json({
        status: 400,
        message: "doubled email",
      });
    }

    if (password != rePassword) {
      return res.status(400).json({
        status: 400,
        message: "password does not match",
      });
    }

    //ENCRYPT PASSWORD
    const encryptedPassword = bcrypt.hashSync(password, 12);

    //UPDATE
    const update = {
      name: name,
      email: email,
      password: encryptedPassword,
    };
    const saveUpdate = await user.update(update, {
      where: {
        id: id,
      },
    });
    if (!saveUpdate) {
      res.status(500).json({
        status: 500,
        message: "failed update",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success updating",
      response: null,
    });
  },

  //DELETE BY ID
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const delUser = await user.destroy({
      where: {
        id: id,
      },
    });
    if (!delUser) {
      return res.status(404).json({
        status: 404,
        message: `no user with id ${id}`,
      });
    }
    res.status(200).json({
      status: 200,
      message: "success delete user",
    });
  },

  resendMailVerif: async (req, res) => {
    const { email = "" } = req.body;
    if (email == "") {
      return res.status(500).json({
        status: 500,
        message: "fill email",
      });
    }

    //FIND USER
    const data = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `account with email ${email} not found`,
      });
    }

    //TOKEN
    const token = makeRandom(10);
    const createToken = await email_token.create({
      user_id: data.dataValues.id,
      token: token,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    fs.readFile(
      "./emails/resendVerifToken.html",
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
          email: email,
          url: `http://localhost:8899/user/verification/${token}`,
          // url: `http://localhost:8899/admin/verification/`,
        };
        console.log(dataEmail);
        var html2send = template(dataEmail);
        const mail = {
          from: "ariJohan@gmail.com",
          to: email,
          subject: `hello ${email}, verify your account`,
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
    return res.status(200).json({
      status: 200,
      message: "success resend email verification",
    });
  },

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
};
