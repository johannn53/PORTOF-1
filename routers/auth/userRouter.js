const router = require("express").Router();
const userController = require("../../controllers/auth/userController");
const auth = require("../../middlewares/auth");

router.put("/api/v0/user/update/:id", userController.updateUser);
router.get("/api/v0/user/getAll", userController.getAllUser);
router.get("verified/user", userController.confirmPage); //LANDING PAGE FOR SUCCESS VERIF
router.get("/api/v0/user/name/:name", userController.getByName);
router.delete("/api/v0/user/delete/:id", userController.deleteUser);
router.get("/api/v0/user/id/:id", userController.getById);
router.post("/api/v0/resendMail", userController.resendMailVerif);
router.get("user/verification/:token", userController.confirmVerif); //CHECK TOKEN TRUE / FALSE

module.exports = router;
