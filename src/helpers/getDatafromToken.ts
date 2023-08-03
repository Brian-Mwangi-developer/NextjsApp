import  Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken =(request: NextRequest)=>{
    try {
      const token =  request.cookies.get("token")?.value || "";
       const decodedToken:any = Jwt.verify(token,process.env.JWT_TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}