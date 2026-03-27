import express from 'express'
import cors from 'cors'
import router from './router/userrouter.js';
import dotenv from 'dotenv'
import {connectdb} from './service/mongo.js'
dotenv .config();
connectdb()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use('/',router)

app.listen(3000,()=>{
    console.log("server is running");
    
})