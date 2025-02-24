const express = require('express')
const router = express.Router()
const diagnosisModel = require('../../../models/diagnosis')
const auth = require('../../../middleware/checkAuth')
const userModel = require('../../../models/user')
const imgModel = require('../../../models/img')
router.get('/:patientID',auth,async (req,res)=>{
try{
    console.log('innn...')
    const {patientID}= req.params;
    const token = req.headers['x-access-token']
    const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
// console.log(patientID,token)

    if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'Doctor'||decoded['user_id']==patientID){
        const data = await diagnosisModel.find({patientID:patientID}).sort({Date:-1})
        var doctors =[];
        var imgs = [];
      //  console.log( '0')
        for(var i =0 ; i< data.length;i++){
          //  console.log( '1')
            const doctorID  = data[i]['doctorID'];
           
            const doctor = await userModel.find({_id:doctorID})
         //   console.log(doctor)
           
            const imgData = await imgModel.find({_id: data[i]['imgID']})
            console.log( '2')
         doctors.push(doctor[0]['Name'])
        imgs.push(imgData[0]['url'])

        }
        // console.log( imgs)
        // console.log( doctors)
const listResult = [data,doctors,imgs];
//console.log(listResult)
res.status(200).send(listResult);
    }else{
        res.status(400).send('you are not an admin or a doctor or the patient ;)')
    }
}catch(e){
    res.status(400).send('an error occurred',e)
}
})
module.exports = router;