const { product } = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  //GET ALL PRODUCT
  getProduct: async (req, res) => {
    const { page, limit } = req.query;

    //TOTAL VIEW PER PAGE
    if (limit == "") {
      return res.status(400).json({
        status: 400,
        message: "fill limit number",
      });
    }
    if (isNaN(limit)) {
      res.status(500).json({
        status: 500,
        message: "input number for limit view product",
      });
    }

    //PAGE
    if (isNaN(page)) {
      res.status(500).json({
        status: 500,
        message: "input number for page",
      });
    }
    if (page == "") {
      return res.status(400).json({
        status: 400,
        message: "fill page number",
      });
    }

    const getProduct = await product.findAndCountAll({
      limit: limit,
      offset: page * limit,
      order: [["id", "asc"]],
    });
    if (getProduct.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "no product found",
      });
    }

    const totalProduct = await product.count();

    res.status(200).json({
      status: 200,
      message: "success get product",
      response: getProduct,
      totalPage: Math.ceil(totalProduct / limit),
    });
  },

  //GET PRODUCT BY ID
  getById: async (req, res) => {
    const { id } = req.params;
    const data = await product.findOne({
      where: {
        id: id,
      },
    });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `no product with id ${id} found`,
      });
    }
    res.status(200).json({
      status: 200,
      message: "success get data",
      response: data,
    });
  },

  //GET PRODUCT BY NAME
  getByName: async (req, res) => {
    const { search = "" } = req.query;
    const data = await product.findAll({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("product_name")),
        {
          [Op.like]: `%${search.toLowerCase()}%`,
        }
      ),
    });
    if (data.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "no product found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success get data",
      response: data,
    });
  },

  //ADD PRODUCT
  addProduct: async (req, res) => {
    const { product_name = "", qty = "", price = "", image = "" } = req.body;
    if (product_name == "" || qty == "" || price == "" || image == "") {
      if (product_name == "") {
        return res.status(500).json({
          status: 500,
          message: "fill product name",
        });
      }
      if (qty == "") {
        return res.status(500).json({
          status: 500,
          message: "fill qty",
        });
      }
      if (price == "") {
        return res.status(500).json({
          status: 500,
          message: "fill price",
        });
      }
      if (image == "") {
        return res.status(500).json({
          status: 500,
          message: "fill product image url",
        });
      }
    }

    const productData = {
      product_name: product_name,
      user_id: req.user.id,
      qty: qty,
      price: price,
      image: image,
    };
    if (productData == null) {
      return res.status(500).json({
        status: 500,
        message: "error add product",
      });
    }
    const saveProduct = await product.create(productData);
    res.status(200).json({
      status: 200,
      message: "success add product",
      response: saveProduct,
    });
  },

  //EDIT / UPDATE PRODUCT
  updateProduct: async (req, res) => {
    const { product_name = "", qty = "", price = "", image = "" } = req.body;
    if (product_name == "" || qty == "" || price == "" || image == "") {
      if (product_name == "") {
        return res.status(500).json({
          status: 500,
          message: "fill product name",
        });
      }
      if (qty == "") {
        return res.status(500).json({
          status: 500,
          message: "fill qty",
        });
      }
      if (price == "") {
        return res.status(500).json({
          status: 500,
          message: "fill price",
        });
      }
    }
    const { id } = req.params;
    const data = await product.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `no product with id ${id} found`,
      });
    }

    const dataEdit = {
      product_name: product_name,
      qty: qty,
      price: price,
      image: image,
    };
    const update = await product.update(dataEdit, {
      where: {
        id: id,
      },
    });

    if (!update) {
      return res.status(500).json({
        status: 500,
        message: "failed updating",
      });
    }

    res.status(200).json({
      status: 200,
      message: "success update product",
      response: dataEdit,
    });
  },

  //DELETE PRODUCT BY ID
  deleteById: async (req, res) => {
    const { id } = req.params;

    const data = await product.findOne({
      where: {
        id: id,
      },
    });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `no product found with id ${id}`,
      });
    }

    const delProd = await product.destroy({
      where: {
        id: id,
      },
    });
    if (!delProd) {
      return res.status(500).json({
        status: 500,
        message: "error deleting product",
      });
    }

    res.status(200).json({
      status: 200,
      message: `success delete product with id ${id}`,
    });
  },
};
