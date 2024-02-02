const path = require('path');
const fs = require('fs').promises;
const fastcsv = require('fast-csv');


const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const mongoose  = require("mongoose");
const Forms = require('../models/Forms');
const Schema = mongoose.Schema;




// Creating a new Collection
module.exports.createForm = async function createForm(req, res) {
    try {
        
        // let data=req.body;

        // To delete existing one 
        await Forms.findOneAndDelete({Name:"Form1"});

        let props=[
            {
                PropName:"Name",                                     
                Value:"Enter your name.",       // Frontend values            
                type:"String",                  // Frontend values
                Properties:{
                    type:'String',
                    required: true,
                },
            },
            {
                PropName:"RollNumber",
                Value:"Enter your uni RollNumber",
                type:"String",
                Properties:{
                    type:'Number',
                    unique:true,
                },
            },
            {
                PropName:"Password",
                Value:"Enter the Password",
                type:"String",
                Properties:{
                    type:'Number',
                    required: true,
                    minLength:8,
                },
            },
        ]
        let data={
            Name:"Form1",
            Description:"Hi im chatgpt",
            Properties:props,
            BackLink:"form1",
        }        

        let newForm=await Forms.create(data)

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






// Accessing the Collections
module.exports.collections = async function collections(req, res) {
    try {


        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(collections);

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



// Accessing a particular collection
module.exports.documents = async function documents(req, res) {
    try {

        const collection = await mongoose.connection.db.collection("newschemas");
        const documents = await collection.find({}).toArray();
        console.log(documents);

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
        const collectionName = "newschemas"; 
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