const router = require("express").Router();
const userController = require("../../controllers/auth/userController");
const auth = require("../../middlewares/auth");

router.get("/getById/:id", userController.getById);
router.put("/update/:id", userController.updateUser);
router.get("/getAllUser", userController.getAllUser);
router.get("/getByName/:name", userController.getByName);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/api/v0/resendMail", userController.resendMailVerif);
router.get("user/verification/:token", userController.confirmVerif);
router.get("verified/user", userController.confirmPage);

module.exports = router;
