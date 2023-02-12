const router = require("express").Router();
const login = require("../../controllers/auth/loginController");

router.post("/api/v0/login", login.login);
router.get("/login-page", login.loginPage);

module.exports = router;
