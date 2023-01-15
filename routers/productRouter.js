const router = require("express").Router();
const product = require("../controllers/productController");
const auth = require("../middlewares/auth");

router.get("/product", product.getProduct);
router.post("/product", auth, product.addProduct);
router.get("/product/:id", product.getById);
router.get("/products/", product.getByName);

module.exports = router;
