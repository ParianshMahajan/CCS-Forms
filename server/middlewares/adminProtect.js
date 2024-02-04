const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const secret_key=process.env.secret_key;
const adminPassword=process.env.adminPassword;
const adminUsername=process.env.adminUsername;



const jwt=require('jsonwebtoken');

module.exports.isAdmin= async function isAdmin(req,res,next){
    try {
        let data=req.body; 
        if(data.token){
            let payload=jwt.verify(data.token,secret_key);               
  
            if(payload){
                if(payload.Username==adminUsername&&payload.Password==adminPassword&&payload.Role=="Admin"){
                    next();
                }
                else{
                    res.json({
                        status:false,
                        message:"Auth-Err",
                        AuthErr:true
                    });
                }              
            }
            else{
                res.json({
                    status:false,
                    message:"Auth-Err",
                    AuthErr:true
                });
            }
        }
        else{
            res.json({
                status:false,
                message:"Auth-Err",
                AuthErr:true
            });
        }

        
    }catch (error) {
        res.json({
            message:error.message,
            status:false,
            AuthErr:true
        })
    }
}

