const express = require('express')
const router = express.Router()
const fs = require('fs');
const auth = require('../../../middleware/checkAuth')
const reportModel = require('../../../models/report')
const uploadImage= require('../../IMGSystem/post/uploadIMG')
const userModel = require('../../../models/user')
const finetialModel = require('../../../models/financials')
router.post('/',auth,async (req,res)=>{
    try{
        console.log('innn')
        const token = req.headers['x-access-token']
        const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'){
            const {file,fileName,patientID,diagnosisID} = req.body
            const report = await reportModel.find({diagnosisID:diagnosisID})
            if(report.length == 0){

                console.log('actual innn')
                if(!(file&&fileName)){
                    return res.status(400).send('all fields are required')
                }
            //   fs.writeFileSync(`Images/itemsIMG/${fileName}`,realFile,"utf8")
            console.log('innn print')
            
            
            await uploadImage(`reports/${fileName}`,file)
            console.log('uploaded')
            const dateNow = Date.now()
            await reportModel.create({pdfUrl:`reports/${fileName}`,patientID:patientID,date:dateNow,diagnosisID:diagnosisID})
            await finetialModel.create({ Cost:50,
                patientID: patientID,
                date:dateNow,
                isPaid:false,desc:"Report"})
               
        
        await userModel.findOneAndUpdate({_id:patientID},{$inc:{totalCost:50,amountLeftToPay:50}})
         
            return  res.status(200).send('items added')
            }
            res.status(201).send('exisits')
    
}else{
    res.status(400).send('you are not an admin or a doctor ;)')
}
}catch(e){
    return res.status(400).send(e)
}
})
module.exports = router;