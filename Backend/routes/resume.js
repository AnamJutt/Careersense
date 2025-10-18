import express from 'express';
import { saveResume,getResumeByEmail,removeResume } from '../controllers/ResumeUpload.js';

const ResumeRouter= express.Router();
ResumeRouter.post("/saveResume", saveResume);
ResumeRouter.get("/getResume/:email",getResumeByEmail);
ResumeRouter.delete("/deleteResume",removeResume);


export default ResumeRouter



