const router = require("express").Router();
const forgotPassword = require("../../controllers/auth/forgotPasswordController");

router.post("/resetPassword", forgotPassword.resetPassWithoutButton);

module.exports = router;
