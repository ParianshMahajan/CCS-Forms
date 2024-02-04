const mongoose  = require("mongoose");


const Schema = mongoose.Schema;
const formSchema = new Schema({
    Name: {
        type: String,
        unique:[true,"Form with same name already exists"]
    },
    Description:{
        type:String,
    },
    Status:{
        type:Boolean,
        default:true,

        // 1-->Active
        // 0-->Not Active
    },
   
    Properties:{
        type:Array,


        // <-------- Format -------->

        // [{
        //     PropName:"Name",                // Backend Schema Property name                            
        //     Value:"Enter your name.",       // Frontend Question Field            
        //     Options:[],                     // In case of mcqs or checkboxes 
        //     minLength:8,                    // In case of Password 
        //     type:"String",                  // Frontend input type 
        //     Properties:{
        //         type:'String',
        //         required: true,
        //         unique: false,
        //     },
        // },]

        
    },
    BackLink:{
        type:String,
        unique:[true,"BackLink is already in use"]
    },


    // Theme:{
    //     type:String,
    // },
});

    




module.exports = mongoose.model("Forms", formSchema);