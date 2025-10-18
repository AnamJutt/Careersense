import mongoose  from "mongoose";

const ResumeSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    resume:{
        type: Object,
        required: true
    },
}
)

export default mongoose.model("Resume", ResumeSchema)