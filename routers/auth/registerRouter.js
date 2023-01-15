const router = require("express").Router();
const register = require("../../controllers/auth/registerController");

router.post("/register", register.register);

module.exports = router;
