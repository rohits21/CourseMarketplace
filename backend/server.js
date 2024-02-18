import app from "./app.js";
import { connectDB } from "./config/Database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCron from "node-cron";

connectDB();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const instance = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  nodeCron.schedule("0 0 0 5 * *", async () => {
    try {
      await Stats.create({});
    } catch (error) {
      console.log(error);
    }
  });
  

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Server is up and running on the port ", PORT);
})