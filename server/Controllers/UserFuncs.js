const path = require('path');
const fs = require('fs').promises;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const mongoose  = require("mongoose");
const Forms = require('../models/Forms');
const { sendMail } = require('../middlewares/nodeMailer');
const Schema = mongoose.Schema;




// const dynamicSchema = new Schema({
//     ${
//         data.map((el) => {
//             return (
//                 `${el.PropName}: {
//                     type: ${el.Properties.type},
//                     ${Object.entries(el.Properties)
//                         .filter(([key]) => key !== 'type')
//                         .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
//                         .join(', ')}
//                 }`
//             );
//         }).join(',\n    ')
//     }
// });





// Creating a new Collection
module.exports.register = async function createFile(req, res) {
        try {
            let data=req.body;
            let form = await Forms.findById(data.Objectid);
            
            const dynamicSchemaObject = {};

            form.Properties.forEach((el) => {
                dynamicSchemaObject[el.PropName] = {
                    type: el.Properties.type,
                    ...Object.entries(el.Properties)
                        .filter(([key]) => key !== 'type')
                        .reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {})
                };
            });
            
            const dynamicSchema = new Schema(dynamicSchemaObject);

            let newModel=mongoose.model(form.Name, dynamicSchema);

        
    
            // Create a new document using the dynamic model
            let user = await newModel.create(data.userData);
    
            await sendMail(user.Email);

            res.json({
                status: true,
            });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            errcode: error.code
        })
    }

}







