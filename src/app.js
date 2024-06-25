import express from "express";
import morgan from "morgan";
import adminRoutes from "./routes/admin.routes.js";
import apiRoutes from "./routes/api.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

export default app;
