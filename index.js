import express from 'express'

import router from './router/userrouter.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

app.use('/',router)

app.listen(3000,()=>{
    console.log("server is running");
    
})