const router = require("express").Router();

const resetPassWithoutButton = require("../routers/auth/forgotPasswordRouter");
const registerRouter = require("../routers/auth/registerRouter");
const inviteAdmin = require("./auth/inviteAdminRouter");
const loginRouter = require("../routers/auth/loginRouter");
const userRouter = require("../routers/auth/userRouter");
const product = require("./productRouter");
const upload = require("./uploadRouter");

router.use(resetPassWithoutButton);
router.use(registerRouter);
router.use(loginRouter);
router.use(inviteAdmin);
router.use(userRouter);
router.use(product);
router.use(upload);

module.exports = router;
