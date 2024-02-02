const mongoose  = require("mongoose");


const Schema = mongoose.Schema;
const adminsSchema = new Schema({
    Name: {
        type: String,
        unique:true
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
    },
    BackLink:{
        type:String,
        unique:true
    },
    Theme:{
        type:String,
    },
});

    




module.exports = mongoose.model("admin", adminsSchema);