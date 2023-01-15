const router = require("express").Router();
const inviteUser = require("../../controllers/auth/InviteUser");
const auth = require("../../middlewares/auth");

router.post("/user/invite", inviteUser.inviteUserWithoutButton);

module.exports = router;
