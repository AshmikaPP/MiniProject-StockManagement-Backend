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
       const otp = await sendOtpVerificationMail({email})

       res.status(201).json({ message: "User registered successfully" });

       
        
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Server error" });
    }
}
export const verifyOtp = async(req,res)=>{
  try {
    const {email,otp}=req.body
    
    const otpRecord = await OtpSchema.findOne({email});

    if(!otpRecord){
      return res.status(400).json({message:"OTP not found"})
    }
    if(otpRecord.expiresAt < new Date()){
      return res.status(400).json({message:"OTP expired"})
    }
    if(otpRecord.otp !==otp){
      return res.status(400).json({message:"Invalid OTP"})
    }
    await userSchema.updateOne(
      {email},
      {$set:{is_Verified:true}}
    )
    await OtpSchema.deleteOne({email})

    res.status(200).json({
      success:true,
      message:"Account verified successfully 🎉"
    })

  } catch (error) {
    console.log("OTP VERIFY ERROR:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
}
export const ResendOtp = async(req,res)=>{
  const {email} =req.body;
  try {
    await OtpSchema.deleteOne({email});

    const otp = await sendOtpVerificationMail({email},res)
    return res.status(200).json({
      message: 'New OTP sent Successfully',
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Error resending OTP"})
  }
}
