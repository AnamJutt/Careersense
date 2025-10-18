import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate a Token JWT
const generateToken= (userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn:"7days"})

}

export const registerUser= async(req, res) =>{
    try{
        const{name, email, password}= req.body;
        console.log(name ,email ,password)
        const userExists= await User.findOne({email});
        console.log(userExists)
        if(userExists){
            return res.status(500).json({message: "User already exists!"});
        }
        // Hashing pasword
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        // Create User
        const user= await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } 
    catch(error){
        res.status(500).json({message: "Server is not running", error: error.message})
    }
}

// login user
export const loginUser= async(req,res) =>{
    try{
        const{email, password}= req.body;
        const user= await User.findOne({email})
        if(!user){
            return res.status(500).json({message: "Invalid email or password"})
        }

        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).json({message: "Invalid email or password"})
        }
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } 
    catch(error){
        console.log(error)
        res.status(500).json({message: "Server is not running", error: error.message})
    }
}
// GET user profile function
export const getUserProfile= async(req,res) =>{
    try{
        const user= await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        res.json(user);

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
}

