import { error, log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
         mongoose.connect(process.env.MONGO_URI!);
         const connection = mongoose.connection;
         connection.on('connected',()=>{
            console.log('mongoose successfully connected');
            
         })
         connection.on('error',(error)=>{
            console.log('Mongodb connection error please make sure Mongodb is running'+error);
            process.exit();            
         })
    }catch(e){
        console.log(e);
        console.log("Something error in DB connection");
        
    }
}