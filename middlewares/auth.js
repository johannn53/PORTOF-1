const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(403).json({
        message: "access denied",
      });

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded.type == "refresh_token") {
      return res.status(400).json({
        message: "invalid token",
      });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
