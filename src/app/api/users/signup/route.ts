import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"; 

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} =  reqBody

        console.log(reqBody);
        const user = await User.findOne({email})
          if(user){
              return NextResponse.json({error: "user already exists"} , {status:400})
          }

         //hash password
         const salt =  await bcryptjs.genSalt(10)
         const hashedPassword =  await bcryptjs.hash(password, salt)
         
         //create new user
        const newUser =  new User({
            username, 
            email,
            password:hashedPassword
         })

         const savedUser =  await newUser.save()
         console.log(savedUser);
         
try {
  await sendEmail({
    email: savedUser.email,
    emailType: "VERIFY",
    userId: savedUser._id,
  });
  console.log("✅ Email sent to:", savedUser.email);
} catch (emailError: any) {
  console.log("❌ Email error:", emailError.message);
}

         return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
         })

      }  catch (error: any) {
        return NextResponse.json({error:error.message},
        {status:500})
    }

}