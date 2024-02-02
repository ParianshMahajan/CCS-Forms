const express=require('express');
const { createForm, collections, documents, download } = require('../Controllers/adminFuncs');
const app=express();
const adminRouter=express.Router();






adminRouter
.route('/createform')
.get(createForm)




adminRouter
.route('/collections')
.get(collections)




adminRouter
.route('/documents')
.get(documents)


adminRouter
.route('/download')
.get(download)











module.exports=adminRouter;