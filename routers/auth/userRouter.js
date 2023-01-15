const router = require("express").Router();
const userController = require("../../controllers/auth/userController");
const auth = require("../../middlewares/auth");

router.put("/update/:id", userController.updateUser);
router.get("/getAllUser", userController.getAllUser);
router.get("/getById/:id", userController.getById);
router.get("/getByName/:name", userController.getByName);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
