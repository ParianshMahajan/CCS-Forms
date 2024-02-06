const mongoose  = require("mongoose");


const Schema = mongoose.Schema;
const adminSchema = new Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    OTP:{
        type:String,
    },
    TimeStamp:{
        type:Date,
        // For OTP
    },
});

    




module.exports = mongoose.model("admins", adminSchema);