import Resume from "../models/Resume.js";

export const saveResume= async(req, res) =>{
    try{
        const{email, resume}= req.body;
        const newResune= await Resume.create({
            email,
            resume
        })
        res.status(201).json({message:"Resume Saved in Database"});
    } catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }   
}

export const getResumeByEmail= async(req, res) =>{
    try{
        const{email}= req.params;
        const resume= await Resume.findOne({email});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }  
        res.status(200).json(resume);
    } catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
}


export const removeResume=async(req,res)=>{
    try{
        const{email}= req.params;
        await Resume.deleteOne({email})
        res.status(200).json({message:"Resume Delete"});
        
    }
    catch(err){
        res.status(500).json({message:"Server error"})
    }
}