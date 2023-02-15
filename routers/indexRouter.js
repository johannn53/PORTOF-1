const router = require("express").Router();

const resetPassWithoutButton = require("../routers/auth/forgotPasswordRouter");
const registerRouter = require("../routers/auth/registerRouter");
const loginRouter = require("../routers/auth/loginRouter");
// const oauth = require("../routers/auth/loginGoogleRouter");
const userRouter = require("../routers/auth/userRouter");
const inviteAdmin = require("./auth/inviteAdminRouter");
const product = require("./productRouter");
const upload = require("./uploadRouter");

router.use(resetPassWithoutButton);
router.use(registerRouter);
router.use(loginRouter);
router.use(inviteAdmin);
router.use(userRouter);
router.use(product);
router.use(upload);
// router.use(oauth);

module.exports = router;
