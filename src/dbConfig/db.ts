import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection =mongoose.connection

        connection.on('connected',()=>{
             console.log("Mongo db Connected Successfully!")
        })
        connection.on("error",(err)=>{
            console.log("Mongo db Connection Error!" + err);
            process.exit(1);
        })

    }catch(error){
        console.log("Something went wrong");
        console.log(error);
    }
}