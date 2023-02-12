const router = require("express").Router();
const register = require("../../controllers/auth/registerController");

router.get("/verified/user", register.confirmPage); //LANDING PAGE IF TOKEN TRUE
router.get("/register-page", register.registerPage); //LANDING PAGE FOR REGISTER
router.get("/user/verification/:token", register.confirmVerif); //CHECK TOKEN EMAIL TRUE
router.post("/api/v0/user/register", register.registerAutoEmail);

module.exports = router;
