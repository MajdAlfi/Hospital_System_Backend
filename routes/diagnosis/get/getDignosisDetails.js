const express = require('express')
const router = express.Router()
const diagnosisModel = require('../../../models/diagnosis')
const auth = require('../../../middleware/checkAuth')
const userModel = require('../../../models/user')
const imgModel = require('../../../models/img')
router.get('/:diagnosisID',auth,async (req,res)=>{
try{
    console.log('innn...')
    const {diagnosisID}= req.params;
    console.log('diiii...',diagnosisID)
    const token = req.headers['x-access-token']
    const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
// console.log(patientID,token)
const data = await diagnosisModel.find({_id:diagnosisID})
const patientID =  data[0]['patientID']
    if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'||decoded['user_id']==patientID){
const doctorID  = data[0]['doctorID'];
        const doctor = await userModel.find({_id:doctorID})
const patient = await userModel.find({_id:patientID})
const imgData = await imgModel.find({_id: data[0]['imgID']})
const listResult = [data[0],doctor[0]['Name'],patient[0]['Name'],imgData[0]['url']];
console.log(listResult)
res.status(200).send(listResult);
    }else{
        res.status(400).send('you are not an admin or a doctor or the patient ;)')
    }
}catch(e){
    res.status(400).send('an error occurred',e)
}
})
module.exports = router;