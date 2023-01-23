// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const multer = require("multer");
// const cloudinaryConfig = require("../config/cloudinaryConfig");

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./uploads");
//   },
//   filename: function (req, file, callback) {
//     const myArray = file.originalname.split(".");
//     const ekstensi = myArray[myArray.length - 1];
//     callback(null, Date.now() + "." + ekstensi);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, callback) {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       return callback(null, true);
//     }
//     callback(null, false);
//     return callback(new Error("only file with type png, jpg, jpeg allowed"));
//   },
//   limits: {
//     //sekitar 1 mb
//     fileSize: 1000000,
//   },
// });

// const uploadVid = multer({
//   storage: storage,
//   fileFilter: function (req, file, callback) {
//     if (file.mimetype === "video/mp4") {
//       return callback(null, true);
//     }
//     callback(null, false);
//     return callback(new Error("only video with mov allowed"));
//   },
//   limits: {
//     fileSize: 5000000,
//   },
// });

// async function uploadCloudinary(filePath) {
//   let result;
//   try {
//     result = await cloudinaryConfig.uploader.upload(filePath, {
//       folder: "TEST PROJECT 1",
//       resource_type: "video",
//       use_filename: true,
//     });
//     fs.unlinkSync(filePath);
//     return result.url;
//   } catch (error) {
//     fs.unlinkSync(filePath);
//     return null;
//   }
// }

// module.exports = {
//   uploadSingle: async (req, res) => {
//     const uploadSingleImage = upload.single("image");
//     uploadSingleImage(req, res, async function (err) {
//       if (err) {
//         return res.json({ message: err.message });
//       }
//       const uploadImage = await uploadCloudinary(req.file.path);
//       if (uploadImage) {
//         return res.json({
//           message: "Upload berhasil",
//           url: uploadImage,
//         });
//       }
//       res.json({
//         message: "Upload gagal",
//       });
//     });
//   },

//   uploadMultiple: async (req, res) => {
//     let urls = [];
//     const uploadMultipleImage = upload.array("photos", 2);
//     uploadMultipleImage(req, res, async function (err) {
//       if (err) {
//         return res.json({ message: "max 2 files" });
//       }
//       for (const file of req.files) {
//         const uploadImage = await uploadCloudinary(file.path);
//         if (uploadImage) {
//           urls.push(uploadImage);
//         }
//       }
//       res.json({ response: urls });
//     });
//   },

//   uploadVideo: async (req, res) => {
//     const uploadSingleVid = uploadVid.single("video");
//     uploadSingleVid(req, res, async function (err) {
//       if (err) {
//         return res.json({ message: err.message });
//       }
//       const uploadVid = await uploadCloudinary(req.file.path);
//       if (uploadVid) {
//         return res.json({
//           message: "Upload berhasil",
//           url: uploadVid,
//         });
//       }
//       res.json({
//         message: "Upload gagal",
//       });
//     });
//   },
// };

const cloudinary = require("../config/cloudinaryConfig");

module.exports = {
  //SINGLE UPLOAD
  uploadImagePdf: async (req, res) => {
    try {
      const upload = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "TEST PROJECT 1",
        allowed_formats: ["png", "pdf", "jpeg"],
        unique_filename: false,
      });

      return res.json({
        message: "upload berhasil",
        file: upload.secure_url,
      });
    } catch (err) {
      return res.json({
        message: err.message,
      });
    }
  },

  uploadVid: async (req, res) => {
    try {
      const upload = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "TEST PROJECT 1",
        resource_type: "video",
        use_filename: true,
      });
      return res.json({
        success: true,
        file: upload.secure_url,
      });
    } catch (err) {
      return res.json({
        message: err.message,
      });
    }
  },
};
