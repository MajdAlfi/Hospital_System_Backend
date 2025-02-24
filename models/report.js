const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    patientID:{type:String,required:true},
    pdfUrl: {required: true , type: String },
    date:{required: true ,type: Date},
    diagnosisID:{type:String,required:true},
})
const Model = mongoose.model('report',Schema)
module.exports = Model;