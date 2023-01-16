const router = require("express").Router();
const register = require("../../controllers/auth/registerController");

router.post("/register", register.register);
router.get("/register", register.registerPage);

module.exports = router;
