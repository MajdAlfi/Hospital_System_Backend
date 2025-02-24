const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    imgID:{type:String},
    classification: {required: true , type: String },
    disease:{required: true ,type: String},
    diagnosis:{type:String,required: true },
    doctorConfirmation:{type:Boolean,default:false},
    patientID:{type:String,required:true},
    Conditions:{type:String,required:true},
    Date:{type:Date,required :true },
    doctorID:{type:String,required: true}
})
const Model = mongoose.model('diagnosis',Schema)
module.exports = Model;