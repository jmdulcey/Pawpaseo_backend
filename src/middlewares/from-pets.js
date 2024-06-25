import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "pet-" + uniqueSuffix + ".jpg");
  },
});

const uploadPet = multer({ storage });

export default uploadPet;
