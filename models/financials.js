const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    Cost:{type:Number,required:true},
    patientID: {required: true , type: String },
    date:{required: true ,type: Date},
    isPaid:{type:Boolean,required:true,default:false},
    desc: {required: true , type: String },
})
const Model = mongoose.model('financialSystem',Schema)
module.exports = Model;