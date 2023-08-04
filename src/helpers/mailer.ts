import nodemailer from 'nodemailer'
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email,emailType, userId}:any)=>{
    try{
        //crate a hashed token
      const hashedtoken =await bcryptjs.hash(userId.toString(),10)

        if(emailType ==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedtoken,
                verifyTokenExpiry:Date.now()+3600000})
        }else if(emailType ==="RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedtoken,
                forgotPasswordExpiry:Date.now()+3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "79d3242d45dfab",
              pass: "3aeca36700e907"
              //add credentials to .env file
            }
          });

          const mailOptions ={
            from:"talentedman254@gmail.com",
            to:email,
            subject:emailType === "VERIFY" ? "verify your email": "Reset your password",
            html:`<p>Click <a href= "${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email":"Reset your password"}</p>`
          }
          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse;
    }catch(error:any){
        throw new Error(error.message);
    }
}
