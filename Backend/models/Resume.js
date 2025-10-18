import mongoose  from "mongoose";

const ResumeSchema= new mongoose.Schema({
   
    email:{
        type: String,
        required: true,
        unique: true
    },
    resume:{
        type: String,
        required: true
    },
}
)

export default mongoose.model("Resume", ResumeSchema)