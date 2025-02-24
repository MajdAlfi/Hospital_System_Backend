const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    Email:{required:true,type:String,unique:true},
    password: {required:true, type: String },
    Address1:{required: true ,type: String},
    Name:{type:String,required:true},
    accountType:{type:String,required:true},
    dateCreated:{type:Number , required:true},
    totalCost:{type:Number,required:true,default:0},
    amountLeftToPay:{type:Number , required:true,default:0},
    phoneNum:{type:Number,required:true}
})
const userModel = mongoose.model('user',userSchema)
module.exports = userModel;
