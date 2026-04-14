import {connect} from "@/dbconfig/dbconfig";

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usermodel";

connect();

export async function POST(request:   NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

       const user = await  User.findOne({verifyToken:token,verifyTokenExpiry: {$gt:Date.now()}})

   if(!user){
    return NextResponse.json({error: "Invalid token"},{status: 400})
   }
   console.log(user);

   user.isVerified = true;
   user.verifyToekn  = undefined;
   user.verifyTokenExpiry= undefined;
   await user.save();

   return NextResponse.json({
    message: "Success email verified" , status:200
   })

    } catch (error: any) {
         return NextResponse.json({error: error.message},{status: 500})
    }
}