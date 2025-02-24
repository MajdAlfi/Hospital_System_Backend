const express = require('express')
const router = express.Router()
const fs = require('fs');
const auth = require('../../../middleware/checkAuth')
const diagnosisModel = require('../../../models/diagnosis')
const imgModel = require('../../../models/img')
const userModel = require('../../../models/user')
const finetialModel = require('../../../models/financials')
const uploadImage= require('./uploadIMG')
router.post('/',auth,async (req,res)=>{
    try{
        const token = req.headers['x-access-token']
        const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'){
    const {image,imgName,patientID,doctorID,classification,disease,diagnosis,conditions,docConfirmation} = req.body

    if(!(image&&imgName&&patientID&&doctorID&&classification&&disease&&diagnosis&&conditions)){
        return res.status(400).send('all fields are required')
    }
//   fs.writeFileSync(`Images/itemsIMG/${imgName}`,realFile,"utf8")

await uploadImage(`images/${imgName}`,image)
const dateNow = Date.now()
const imgUpload = await imgModel.create({url:`images/${imgName}`,patientID:patientID,date:dateNow})
    await diagnosisModel.create({imgID:imgUpload['_id'],
    classification: classification,
    disease:disease,
    diagnosis:diagnosis,
    doctorConfirmation:docConfirmation,
    patientID:patientID,
    Conditions:conditions
    ,Date:dateNow,doctorID:doctorID})

    await finetialModel.create({ Cost:299,
        patientID: patientID,
        date:dateNow,
        isPaid:false,desc:classification})
       

await userModel.findOneAndUpdate({_id:patientID},{$inc:{totalCost:299,amountLeftToPay:299}})

return  res.status(200).send('items added')
}else{
   return res.status(400).send('you are not an admin or a doctor ;)')
}
}catch(e){
    return res.status(400).send('Error')
}
})
module.exports = router;