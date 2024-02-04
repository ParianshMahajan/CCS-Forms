const express=require('express');
const { createForm, collections, documents, download, updateForm, createJWT, verifyLogIn, verifyCredential, createOTP, verifyOtp, test } = require('../Controllers/adminFuncs');
const { isAdmin } = require('../middlewares/adminProtect');
const app=express();
const adminRouter=express.Router();




// <------------ LOGIN ----------------->

// Verify Creadentials
adminRouter
.route('/signin')
.post(verifyCredential)

// Send OTP
adminRouter
.route('/signin/email')
.post(createOTP)

// Verify OTP || Generate token
adminRouter
.route('/signin/otp')
.post(verifyOtp)




// <------------- Verify LoggedIn ------------>
adminRouter
.route('/verify')
.post(isAdmin,verifyLogIn)






// <------------- FORMS -------------->

// Create form
adminRouter
.route('/createform')
.post(isAdmin,createForm)


// All Forms
adminRouter
.route('/collections')
.post(isAdmin,collections)


// Update Form
adminRouter
.route('/updateform')
.post(isAdmin,updateForm)





// <------------- DOWNLOAD CSV -------------->
adminRouter
.route('/download')
.post(isAdmin,download)











module.exports=adminRouter;