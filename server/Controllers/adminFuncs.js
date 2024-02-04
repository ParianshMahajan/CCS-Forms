const path = require('path');
const fs = require('fs').promises;
const fastcsv = require('fast-csv');
const jwt = require("jsonwebtoken");


const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const secret_key=process.env.secret_key;
const adminPassword=process.env.adminPassword;
const adminUsername=process.env.adminUsername;


const Forms = require('../models/Forms');
const AdminEmail = require('../models/AdminEmail');
const { sendMail } = require('../middlewares/nodeMailer');



function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }





// Verify Login
module.exports.verifyLogIn = async function verifyLogIn(req, res) {
    try {
      res.json({
        status: true,
        message: "LOGGED IN",
      });
      
    } catch (error) {
      res.json({
        message: error.message,
        status: false,
      });
    }
  };
  
  
  






// Verify the credential
module.exports.verifyCredential = async function verifyCredential(req, res) {
  try {
    let data = req.body;
    if(data.Username==adminUsername){
        if(data.Password==adminPassword){

            res.json({
              status: true,
            });
        }
        else{
          res.json({
            status: false,
          })
        }
      }
      else{
        // Invalid credentials
        res.json({
          status: false,
        });
      }

  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};



// Verify the Email and generate the otp
module.exports.createOTP = async function createOTP(req, res) {
  try {
    let data = req.body;
    let admin=await AdminEmail.findOne({Email:data.Email})
    if(admin){
        let otp = generateRandomString(6);
        admin.OTP=otp;
        await admin.save();
        
        await sendMail(admin.Email,"OTP",otp);

        res.json({
            status: true,
        });   
    }
    else{
        // Invalid Email
        res.json({
          status: false,
        });
      }

  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};



// Verify OTP
module.exports.verifyOtp = async function verifyOtp(req, res) {
  try {
    let data = req.body;
    let admin=await AdminEmail.findOne({Email:data.Email});
    console.log(admin);
    if(data.OTP===admin.OTP){
            
        admin.OTP="";
        await admin.save();

        const payload={
          Username:data.Username,
          Password:data.Password,
          Role:"Admin"
        }
        const token = jwt.sign(payload, secret_key);
    
        res.json({
          status: true,
          token: token,
        });
      }
      else{
        // Invalid credentials
        res.json({
          status: false,
        });
      }

  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};










// Creating a new Form
module.exports.createForm = async function createForm(req, res) {
    try {
        
        let data=req.body;

        // let props=[
        //     {
        //         PropName:"Name",                                     
        //         Value:"Enter your name.",       // Frontend values            
        //         type:"String",                  // Frontend values
        //         Properties:{
        //             type:'String',
        //             required: true,
        //         },
        //     },
        //     {
        //         PropName:"RollNumber",
        //         Value:"Enter your uni RollNumber",
        //         type:"String",
        //         Properties:{
        //             type:'Number',
        //             unique:true,
        //         },
        //     },
        //     {
        //         PropName:"Password",
        //         Value:"Enter the Password",
        //         type:"String",
        //         Properties:{
        //             type:'Number',
        //             required: true,
        //             minLength:8,
        //         },
        //     },
        // ]

        
        // let formData={
        //     Name:"Form2",
        //     Description:"Hi im chatgpt",
        //     Properties:props,
        //     BackLink:"form2",
        // }        

        let newForm=await Forms.create(data)

        res.json({
            status: true,
        });

    } catch (error) {
        if (error && error.code === 11000) {
            let errorMessage = '';

            if (error.keyPattern && error.keyPattern.Name) {
                errorMessage = 'Form with the same name already exists';
            } else if (error.keyPattern && error.keyPattern.BackLink) {
                errorMessage = 'BackLink is already in use';
            } else {
                errorMessage = 'Duplicate key error';
            }

            res.json({
                status: false,
                message: errorMessage,
                errcode: error.code
            });
        } else {
            res.json({
                status: false,
                message: error.message,
                errcode: error.code
            });
        }
    }

}







// Accessing the Collections
module.exports.collections = async function collections(req, res) {
    try {
        const AllForms = await Forms.find();

        res.json({
            status: true,
            AllForms:AllForms
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        })
    }

}


// Updating a Form
module.exports.updateForm = async function updateForm(req, res) {
    try {
        
        let data=req.body;

        let form =await Forms.findById(data.id);

        form.Name=data.Name;
        form.Description=data.Description;
        form.Status=data.Status;
        form.Properties=data.Properties;
        form.BackLink=data.BackLink;

        await form.save();

        res.json({
            status: true,
        });    

    } catch (error) {
        if (error && error.code === 11000) {
            let errorMessage = '';

            if (error.keyPattern && error.keyPattern.Name) {
                errorMessage = 'Form with the same name already exists';
            } else if (error.keyPattern && error.keyPattern.BackLink) {
                errorMessage = 'BackLink is already in use';
            } else {
                errorMessage = 'Duplicate key error';
            }    

            res.json({
                status: false,
                message: errorMessage,
                errcode: error.code
            });    
        } else {
            res.json({
                status: false,
                message: error.message,
                errcode: error.code
            });    
        }    
    }    

}    







// Accessing a particular collection
module.exports.test = async function test(req, res) {
    try {

        let data={
            Name:"Pariansh",
            Email:"pmahajan1_be22@thapar.edu"
        }

        let admin=await AdminEmail.create(data);

        res.json({
            status: true,
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        })
    }

}


// Downloading a particular collection
module.exports.download = async function download(req, res) {
    try {
        const collectionName = req.body.Name; 
        const collection = await mongoose.connection.db.collection(collectionName);

        // Fetching documents as an array
        const documents = await collection.find({}).toArray();

        if (documents.length === 0) {
            return res.json({
                status: false,
                message: 'No documents found in the collection.',
            });
        }

        // Create a writable stream for streaming the CSV data
        const stream = fastcsv.format({ headers: true });

        // Pipe the CSV data to the response stream
        stream.pipe(res);

        // Add the header row to the CSV
        stream.write(Object.keys(documents[0]));

        // Add each document's data to the CSV
        documents.forEach(doc => stream.write(Object.values(doc)));

        // End the stream to finish the response
        stream.end();

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
};