const express = require('express')
const router = express.Router()
const  diagnosisModel = require('../../../models/diagnosis')
const auth = require('../../../middleware/checkAuth')
router.get('/',auth,async (req,res)=>{
try{
    const {uid}= req.headers;
    console.log(uid);
const data = await diagnosisModel.find({patientID:uid})
const val = data.length.toString()
console.log(val)
res.status(200).send(val)
}catch(e){
    res.status(400).send('an error occurred')
}
})
module.exports = router;