const router = require("express").Router();
const login = require("../../controllers/auth/loginController");

router.post("/login", login.login);

module.exports = router;
