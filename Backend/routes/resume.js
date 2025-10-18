import express from 'express';
import { saveResume,getResumeByEmail } from '../controllers/ResumeUpload';

const ResumeRouter= express.Router();
ResumeRouter.post("/saveResume", saveResume);
ResumeRouter.get("/getResume/:email",getResumeByEmail);

export default ResumeRouter



