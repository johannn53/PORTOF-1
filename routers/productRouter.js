const router = require("express").Router();
const product = require("../controllers/productController");
const auth = require("../middlewares/auth");

router.get("/product", product.getProduct);
router.get("/product/:id", product.getById);
router.get("/products/", product.getByName);
router.post("/product", auth, auth, product.addProduct);
router.delete("/product/:id", auth, product.deleteById);
router.put("/product/:id", auth, product.updateProduct);

module.exports = router;
