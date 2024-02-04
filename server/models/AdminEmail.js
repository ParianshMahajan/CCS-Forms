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
});

    




module.exports = mongoose.model("admins", adminSchema);