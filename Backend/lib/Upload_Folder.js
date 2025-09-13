import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


export const upload_folder=()=>{
  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads folder created.");
}
}