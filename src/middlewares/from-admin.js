import multer from "multer";
import cloudinary from "../cloudinaryConfig.js"; 

const storage = multer.diskStorage({

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "admin-" + uniqueSuffix + ".jpg");
    },
  });
  
  const uploadAdmin = multer({ storage });
  
  export default uploadAdmin;