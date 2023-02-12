const router = require("express").Router();
const forgotPassword = require("../../controllers/auth/forgotPasswordController");

router.post("/api/v0/resetPassword", forgotPassword.resetPassWithoutButton);

module.exports = router;
