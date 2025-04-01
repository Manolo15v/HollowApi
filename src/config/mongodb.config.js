import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGOATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }    
}

export default dbConnect;