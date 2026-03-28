import express from 'express'
import { Register, ResendOtp, verifyOtp } from '../controller/authcontroller.js'

const router = express.Router()

router.post("/register",Register)

router.post("/verify-otp",verifyOtp)

router.post("/resend-otp",ResendOtp)

export default router