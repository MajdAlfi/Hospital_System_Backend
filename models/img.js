const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    url:{required:true,type:String},
    patientID:{required:true,type:String},
    date:{required:true,type:Date}
})
const Model = mongoose.model('img',Schema)
module.exports = Model;