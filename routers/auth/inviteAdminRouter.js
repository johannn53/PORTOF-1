const router = require("express").Router();
const inviteAdmin = require("../../controllers/auth/InviteAdmin");
const auth = require("../../middlewares/auth");

router.post("/user/invite/admin", auth, inviteAdmin.inviteAdminWithoutButton);

module.exports = router;
