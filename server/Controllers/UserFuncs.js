const path = require('path');
const fs = require('fs').promises;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });





// Creating a new Collection
module.exports.createFile = async function createFile(req, res) {
    try {

        let fileName='NewCollection'
        let filePath = path.join(__dirname, `../models/${fileName}.js`);
    
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




        let content=
        `const mongoose  = require("mongoose");


        const Schema = mongoose.Schema;
        const dynamicSchema = new Schema({
            ${
                data.map((el) => {
                    return (
                        `${el.PropName}: {
                            type: ${el.Properties.type},
                            ${Object.entries(el.Properties)
                                .filter(([key]) => key !== 'type')
                                .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                                .join(', ')}
                        }`
                    );
                }).join(',\n    ')
            }
        });
        
            
        module.exports = mongoose.model("${fileName}", dynamicSchema);`



        await fs.writeFile(filePath, content);


        
        // importing the Collection in controller
        

        let controllerFilePath = path.join(__dirname, 'UserFuncs.js');
        let existingContent = await fs.readFile(controllerFilePath, 'utf-8');

        let additionalContent = `const ${fileName} = require('../models/${fileName}');\n`;

        let newContent =  additionalContent + existingContent ;

        await fs.writeFile(controllerFilePath, newContent);


        


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







