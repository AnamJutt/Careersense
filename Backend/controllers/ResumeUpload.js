import Resume from "../models/Resume";

export const saveResume= async(req, res) =>{
    try{
        const{email, resume}= req.body;
        const newResune= await Resume.create({
            email,
            resume
        })
        res.status(201).json(newResune);
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