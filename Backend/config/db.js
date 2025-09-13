import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://anamjutt:dbCareerSense22102@cluster0.waxh0mu.mongodb.net/CareerSense")
    .then(() => console.log("Database connected"))

    }
