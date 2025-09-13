import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connectDB } from './config/db.js';
import userRouters from './routes/userRouters.js';
import { upload_folder } from './lib/Upload_Folder.js';
import ats from './routes/ats.js';

const app = express();
const PORT= 4000;

app.use(cors());

// Connect Database
connectDB();
//middleware
app.use(express.json());

app.use("/api/auth", userRouters);
app.use("/api", ats);

app.get('/', (req, res) => {
  res.send("API working");
});

upload_folder()


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});