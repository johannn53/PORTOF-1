const router = require("express").Router();
const userVerification = require("../../controllers/auth/userVerificationMail");

router.post("/user/verificationMail", userVerification.inviteWIthVerifMail);
router.get("/user/verification/:token", userVerification.confirmVerified);

module.exports = router;
