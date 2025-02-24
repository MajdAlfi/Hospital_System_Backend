const express = require('express')
const router = express.Router()
const otpGenerator = require('otp-generator')
const crypto = require('crypto')
const otpExpModel = require('../../../models/otpModel')
//JBSWY3DPEHPK3PXP
const  key  = process.env.otpsecretkey;
const sendSms = require('../OTP/sendSMS');    
router.post('/createOTP',async (req,res)=>{
    try{
        let now = Date.now() 
           const {phone} = req.body
        const findOtp = await otpExpModel.find({phoneNo:phone})
        if(findOtp.length >0){
            var diff = Math.abs(now - findOtp[0].exp);
     
            if(parseInt(diff)>300000){
                await otpExpModel.findOneAndUpdate({phoneNo:phone},{exp:now})
                
            await otpExpModel.create({phoneNo:phone,exp:now})
            const otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
        const ttl = 5* 60*1000
        const expire = Date.now()+ttl;
        const data = `${phone}.${otp}.${expire}`
        const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
        const fullHash = `${hash}.${expire}`

            sendSms(`${phone}`,  `${otp}` )
        return  res.status(200).send(fullHash)

            }else{
                    res.status(400).send('Unfortunately, you can request one code every 5 minutes. please wait 5 min before requesting another one.')
                
                
            }
        }else{

            await otpExpModel.create({phoneNo:phone,exp:now})
    const otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
const ttl = 5* 60*1000
const expire = Date.now()+ttl;
const data = `${phone}.${otp}.${expire}`
const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
const fullHash = `${hash}.${expire}`


    sendSms(`${phone}`, `${otp}` )

return res.status(200).send(fullHash)
        }

 

   
// return res.status(200).send(fullHash)
    }catch(e){
      return res.status(400).send(e)
    }
})
router.post('/verifyOTP',(req,res)=>{
    try{
        const {phone,otp,hash} = req.body
     let [hashValue,expire] = hash.split('.');
    let now = Date.now()
    if(now > parseInt(expire)){
             return res.status(400).send('OTP Expired')
        
       
    }
    const data = `${phone}.${otp}.${expire}`
    let newCalculateHash = crypto.createHmac("sha256",key).update(data).digest("hex")
    if(newCalculateHash === hashValue){
        return res.status(200).send('Success')
    }
          return res.status(400).send('Invalid OTP')
    
  
    }catch(e){
        res.status(400).send(e)
    }
})
   

module.exports = router