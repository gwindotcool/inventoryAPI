const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryconfig"); // ✅ fix path/name

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "inventoryFolder",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

module.exports = upload;