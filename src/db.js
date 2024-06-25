import mongoose from "mongoose";

export const conexionDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jmchaguendo:galaxia16@pawpaseo.plclaqf.mongodb.net/Pawpaseo-DB");
    console.log(">>> DB conectada");
  } catch (error) {
    console.log(error);
  }
};
