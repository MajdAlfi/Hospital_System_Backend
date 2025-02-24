const express = require('express')
const router = express.Router()
const finentialModel = require('../../../models/financials')
const userModel = require('../../../models/user')
router.put('/',async (req,res)=>{
    try{
        const token = req.headers['x-access-token']
        const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'accountant'){
            const {fID,pID,desc} = req.body;
            await finentialModel.findOneAndUpdate({_id:fID},{isPaid:true});
            if(desc == "Report"){
                await userModel.findOneAndUpdate({_id:pID},{$inc:{amountLeftToPay:-50}})
            }else{
                await userModel.findOneAndUpdate({_id:pID},{$inc:{amountLeftToPay:-299}})
            }
           
            res.status(200).send('done')

        }else{
            res.status(400).send('you are not an admin or a accountant ;)')
        }
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports = router;