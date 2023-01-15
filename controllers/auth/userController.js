const { user } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name = "", email = "" } = req.body;
    if (name == "" || email == "") {
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
    if (checkEmail != null) {
      return res.status(400).json({
        status: 400,
        message: "email already exist",
      });
    }

    //UPDATE
    const update = {
      name: name,
      email: email,
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
      response: update,
    });
  },
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
};
