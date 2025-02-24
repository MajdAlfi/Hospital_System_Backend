const mongoose = require('mongoose')

const schema = mongoose.Schema({
    phoneNo:{type:Number,required:true},
    exp:{type:Date,required:true}
})
const model = mongoose.model('otpExp',schema)
module.exports = model;