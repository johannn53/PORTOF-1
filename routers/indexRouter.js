const router = require("express").Router();

const registerRouter = require("../routers/auth/registerRouter");
const inviteUser = require("../routers/auth/inviteUserRouter");
const loginRouter = require("../routers/auth/loginRouter");
const userRouter = require("../routers/auth/userRouter");
const product = require("./productRouter");
const upload = require("./uploadRouter");

router.use(registerRouter);
router.use(loginRouter);
router.use(inviteUser);
router.use(userRouter);
router.use(product);
router.use(upload);

module.exports = router;
