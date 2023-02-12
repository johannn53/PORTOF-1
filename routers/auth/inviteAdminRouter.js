const router = require("express").Router();
const inviteAdmin = require("../../controllers/auth/InviteAdmin");
const auth = require("../../middlewares/auth");

router.post(
  "/api/v0/user/invite/admin",
  auth,
  inviteAdmin.inviteAdminWithoutButton
);
router.post(
  "/api/v0/user/invite/adminWithButton",
  inviteAdmin.inviteAdminWithButton
);
router.get("/admin/verification/:token", inviteAdmin.confirmVerif);
router.get("/verified/admin", inviteAdmin.confirmPage);

module.exports = router;
