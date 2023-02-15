const router = require("express").Router();
const passport = require("../../lib/passport");
const login = require("../../controllers/auth/loginController");

router.post("/api/v0/login", login.login);
router.get("/login-page", login.loginPage);

router.get(
  "/api/v0/login-oauth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "https://google.com",
    failureRedirect: "https://discord.com",
  })
);

module.exports = router;
