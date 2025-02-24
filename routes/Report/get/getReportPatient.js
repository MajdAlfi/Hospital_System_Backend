const express = require('express')
const router = express.Router()
const reportModel = require('../../../models/report')
const auth = require('../../../middleware/checkAuth')
router.get('/:patientID',auth,async (req,res)=>{
try{
    const {patientID}= req.params;
    const token = req.headers['x-access-token']
    const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
console.log(patientID,token)
    if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'||decoded['user_id']==patientID){
const data = await reportModel.find({patientID:patientID}).sort({date:-1})
res.status(200).send(data);
    }else{
        res.status(400).send('you are not an admin or a doctor or the patient ;)')
    }
}catch(e){
    res.status(400).send('an error occurred',e)
}
})
module.exports = router;