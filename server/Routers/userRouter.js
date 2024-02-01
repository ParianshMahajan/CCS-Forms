const express=require('express');
const { createFile, deleteFile } = require('../Controllers/UserFuncs');
const app=express();
const userRouter=express.Router();






userRouter
.route('/createSchema')
.get(createFile)


// Drop Collection
userRouter
.route('/DropSchema')
.get(deleteFile)










module.exports=userRouter;