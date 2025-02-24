const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    taskName:{type:String,required:true},
    Desc: {required: true , type: String },
    Cost:{required: true ,type: Number},
    
})
const Model = mongoose.model('tasks',Schema)
module.exports = Model;