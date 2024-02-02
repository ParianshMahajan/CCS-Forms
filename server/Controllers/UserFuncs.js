const path = require('path');
const fs = require('fs').promises;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const mongoose  = require("mongoose");
const Forms = require('../models/Forms');
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

let data=[
    {
        PropName:"Name",
        Properties:{
            type:'String',
            required: true,
        },
    },
    {
        PropName:"RollNumber",
        Properties:{
            type:'Number',
        },
    },
    {
        PropName:"Password",
        Properties:{
            type:'String',
            required: true,
            minLength:8,
        },
    },
]





// Creating a new Collection
module.exports.register = async function createFile(req, res) {
        try {
            let id = "65bd6daafef289056e166e76";
            let form = await Forms.findById(id);
            
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

            let newModel=mongoose.model("newSchema", dynamicSchema);

            let userData = {
                Name: "Pariansh",
                RollNumber: 102217024,
                Password: 123456,
            }
    
            // Create a new document using the dynamic model
            let user = await newModel.create(userData);
    
            res.json({
                status: true,
                schema: form.Schema
            });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            errcode: error.code
        })
    }

}


















// Dropping the Collection
module.exports.deleteFile = async function deleteFile(req, res) {
    try {

        let fileName = 'NewCollection';
        let filePath = path.join(__dirname, `../models/${fileName}.js`);

        await fs.unlink(filePath);



        let controllerFilePath = path.join(__dirname, 'UserFuncs.js');
        let data = await fs.readFile(controllerFilePath, 'utf-8');
        let lines = data.split('\n');

        let lineToRemove=`const ${fileName} = require('../models/${fileName}`

        let indexToRemove = lines.findIndex(line => line.includes(lineToRemove));
        lines.splice(indexToRemove, 1);
        const updatedContent = lines.join('\n');
        await fs.writeFile(controllerFilePath, updatedContent);

        console.log("bye");
        

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








// Dropping the Collection
module.exports.test = async function test(req, res) {
    try {

        const dynamicSchema = new Schema({
            Name: {
                type: String
            },
            RollNumber: {
                type: Number
            },
            Description:{
                type:String,
            },
            Status:{
                type:Boolean,
        
                // 1-->Active
                // 0-->Not Active
            },
        });
        
            
        let newModel=mongoose.model("newSchema", dynamicSchema);

        let Userdata={
            Name:"Kanishk",
            RollNumber:102217023,
            Description:"lorem12",
            Status:false
        }   

        let data=await newModel.create(Userdata);


        res.json({
            data:data,
            status: true,
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        })
    }

}







