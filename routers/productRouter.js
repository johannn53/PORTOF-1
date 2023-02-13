const router = require("express").Router();
const product = require("../controllers/productController");
const auth = require("../middlewares/auth");

router.get("/api/v0/allProduct", product.getProduct);
router.get("/api/v0/product/:id", product.getById);
router.get("/api/v0/products", product.getByName);
router.post("/api/v0/product", auth, product.addProduct);
router.delete("/api/v0/product/:id", auth, product.deleteById);
router.put("/api/v0/product/:id", product.updateProduct);

module.exports = router;
