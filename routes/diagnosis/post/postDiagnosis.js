// const express = require('express')
// const router = express.Router()
// const auth = require('../../../middleware/checkAuth')
// const diagnosisModel = require('../../../models/diagnosis')

// router.post('/',auth,async (req, res)=>{
//     try{
//         const token = req.headers['x-access-token']
//         const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
//     // console.log(patientID,token)
//    // console.log('-1')
//         if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'){
//         const now = Date.now()
//         const {imgID,Classification,disease,diagnosis,docConfirmation,patientID,Conditions,doctorID}= req.body;
//    //     console.log(doctorID);
//         // console.log('0')
//         await diagnosisModel.create({imgID:imgID,
//             classification: Classification,
//             disease:disease,
//             diagnosis:diagnosis,
//             doctorConfirmation:docConfirmation,
//             patientID:patientID,
//             Conditions:Conditions,
//             Date:now,
//             doctorID:doctorID})
// //console.log('1')
        
//      //       console.log('3')
//             res.status(200).send('done');
//         }
        
//     else{
//         res.status(400).send('you are not an admin or a doctor or the patient ;)')
//     }
//     }catch(e){
//         res.status(400).send('an err occurred')
//     }
// })
// module.exports = router;