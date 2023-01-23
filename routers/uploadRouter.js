const router = require("express").Router();
const upload = require("../controllers/uploadController");
const uploader = require("../multer");

router.post("/uploadImagePdf", uploader.single("file"), upload.uploadImagePdf);
router.post("/uploadVid", uploader.single("file"), upload.uploadVid);

module.exports = router;
