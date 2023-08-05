import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        const { token, newPassword, confirmPassword } = requestData;
        console.log(requestData);

        //hash the new  password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt)
        console.log(hashedPassword);
        const user = await User.findOneAndUpdate({
            forgotPasswordToken: token,
            // forgotPasswordExpiry: { $gt: new Date() }, // pending: add the Check token expiry
            password: hashedPassword
        })
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password  is changed succesfully",
            success: true
        })

    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 });
    }
}