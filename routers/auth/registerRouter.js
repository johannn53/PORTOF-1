const router = require("express").Router();
const register = require("../../controllers/auth/registerController");

router.post("/register/user", register.registerAutoEmail);
router.get("/user/verification/:token", register.confirmVerif);
router.get("/verified/user", register.confirmPage);
router.get("/register", register.registerPage);

module.exports = router;
