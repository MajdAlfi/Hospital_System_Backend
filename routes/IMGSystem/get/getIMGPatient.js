const express = require('express')
const router = express.Router()
const imgModel = require('../../../models/img')
const auth = require('../../../middleware/checkAuth')
router.get('/',auth,async (req,res)=>{
try{
    const {patientID}= req.headers;
const data = await imgModel.find({patientID:patientID})
res.status(200).send(data)
}catch(e){
    res.status(400).send('an error occurred')
}
})
module.exports = router;