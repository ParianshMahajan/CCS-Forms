const express=require('express');
const { createFile, deleteFile, test, register } = require('../Controllers/UserFuncs');
const app=express();
const userRouter=express.Router();






userRouter
.route('/register')
.post(register)










module.exports=userRouter;