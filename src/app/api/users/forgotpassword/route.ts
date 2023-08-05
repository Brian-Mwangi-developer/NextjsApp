import {connect} from "@/dbConfig/db";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        if (!email) {
            return NextResponse.json({ message: "Email is required.", success: false }, { status: 400 });
          }
        console.log(email);

        //check if the email is valid
        const user = await User.findOne({email})

        if (user){
            await sendEmail({email,emailType:"RESET",userId:user._id})
            return NextResponse.json({message:"Email sent to user ",
             success:true,email})
        }else{
            return NextResponse.json({message:"User not found",success:false})
        }
        
    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500});
        
    }
}