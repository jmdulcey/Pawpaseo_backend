import multer from "multer";
import cloudinary from "../cloudinaryConfig.js"; 

const storage = multer.diskStorage({

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "user-" + uniqueSuffix + ".jpg");
    },
  });
  
  const uploadUser = multer({ storage });
  
  export default uploadUser;