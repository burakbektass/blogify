import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import PostRoutes from './routes/posts.js'


const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

app.use(cors());

app.get("/", (req,res) => {
    res.json({
        author:" burak is coding again !",
        message:"Lets practice MEARN !"
    });
});

app.use("/posts", PostRoutes);

const PORT = process.env.PORT || 5000;

 
mongoose.connect(process.env.Connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() =>{
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
.catch((error) => { 
    console.error(error.message);
})