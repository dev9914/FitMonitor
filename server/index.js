import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));


app.use("/api/user", UserRoutes);

app.use((err, req, res, next)=> {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.get("/" ,async(req, res)=>{
    res.status(200).json({
        message: "Hello it's me dev"
    });
});

const ConnectDB = async() => {
    try {
        mongoose.set("strictQuery",true);
        await mongoose.connect(process.env.mongoUrl);
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log(error);
    }
}

const startServer = async()=>{
    try {
        ConnectDB();
        app.listen(5000, ()=> console.log("Server running at port 5000"));
    } catch (error) {
        console.log(error);
    }
}

startServer();