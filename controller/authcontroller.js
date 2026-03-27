import userSchema from "../model/usermodel.js"
import bcrypt from "bcrypt";
import { sendOtpVerificationMail } from "../service/otpservice.js";
import OtpSchema from "../model/otpModel.js";


export const Register=async(req,res)=>{

    const {username,email,mobile,password}=req.body
    
    try {

        if (!username || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const existEmail = await userSchema.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

   
    const existMobile = await userSchema.findOne({ mobile });
    if (existMobile) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

       const passwordhash = await bcrypt.hash(password,10)

       const userdata =  new userSchema({
        name:username,
        email:email,
        mobile:mobile,
        password:passwordhash,
       });
       await userdata.save()
       const otp = await sendOtpVerificationMail({email},res)

       res.status(201).json({ message: "User registered successfully" });

       
        
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Server error" });
    }
}