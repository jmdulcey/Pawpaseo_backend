import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "res-" + uniqueSuffix + ".jpg");
  },
});

const uploadReseña = multer({ storage });

export default uploadReseña;
