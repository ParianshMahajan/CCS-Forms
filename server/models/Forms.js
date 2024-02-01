const mongoose  = require("mongoose");


const Schema = mongoose.Schema;
const adminsSchema = new Schema({
    Name: {
        type: String
    },
    Description:{
        type:String,
    },
    Status:{
        type:Boolean,

        // 1-->Active
        // 0-->Not Active
    },
    Properties:{
        type:JSON,
    },
    BackLink:{
        type:String,
    },
    Path:{
        type:String,
    },
});

    




module.exports = mongoose.model("admin", adminsSchema);