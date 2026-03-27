import mongoose from "mongoose";

const UserModel = mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        mobile:{
            type:Number,
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        is_Admin: {
            type: Boolean,
            default: false,
        },
        is_Verified: {
           type: Boolean,
           default: false,
        },
    }
)
const userSchema = mongoose.model('user',UserModel)
export default userSchema