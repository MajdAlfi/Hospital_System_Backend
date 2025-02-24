const express = require('express')
const router = express.Router()
const diagnosisModel = require('../../../models/diagnosis')
const userModel = require('../../../models/user')
const imgModel = require('../../../models/img')

const auth = require('../../../middleware/checkAuth')
router.get('/:diagnosisID',auth,async(req,res)=>{
try{
    const {diagnosisID}= req.params
    const diagnosisData =await diagnosisModel.find({_id:diagnosisID})
    const patientID = diagnosisData[0]['patientID']
    const doctorID = diagnosisData[0]['doctorID']
    const imgID = diagnosisData[0]['imgID']
    const userData = await userModel.find({_id:patientID})
    const doctorData = await userModel.find({_id:doctorID})
    const imgData = await imgModel.find({_id:imgID})
    res.status(200).send([diagnosisData[0],userData[0],doctorData[0],imgData[0]['url']]);

}catch(e){
    res.status(400).send('an error occurred')
}
})

module.exports = router