const bcrypt = require('bcryptjs/dist/bcrypt')
const userModel = require('../../../models/user')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
router.post('/',async (req , res )=>{
    try{
        console.log('1')
    const {Email,password,fcmToken} = req.body
    if(!(Email&&password)){
  
             return res.status(400).send('Please enter an email and a password')
        
       
    }
    const findEmail = await userModel.findOne({Email:Email.toLowerCase()})
    if(!findEmail){
     
            return res.status(404).send('Email does not exist')
        
        
    }
    // if(fcmToken.length == 0){
    //     return res.status(400).send('A token was not generated please try again later')
    // }
    if(findEmail && (await bcrypt.compare(password,findEmail.password))){
        const token = jwt.sign(
            { user_id: findEmail._id, Email:Email,accountType:findEmail.accountType },
            process.env.TOKEN_KEY,
            {
              expiresIn: "3d",
            }
          );
          console.log('2')
          await userModel.findOneAndUpdate({Email:Email.toLowerCase()},{fcmToken:fcmToken})
          console.log('3')
          return res.status(201).send(token);
    }

        return res.status(400).send("Invalid Credentials");
    
    
    }catch(err){
        res.status(400).send('err')
    }
})
router.post('/refresh',async (req , res )=>{
    try{
      
       
    const {Email,password} = req.body
    const findEmail = await userModel.findOne({Email:Email.toLowerCase()})
    if(!findEmail){
      
            return res.status(404).send('Email does not exist')
        
        
    }
    if(findEmail && (await bcrypt.compare(password,findEmail.password))){
        const token = jwt.sign(
            { user_id: findEmail._id, Email:Email,accountType:findEmail.accountType},
            process.env.TOKEN_KEY,
            {
              expiresIn: "3d",
            }
          );
         console.log('ok')
         console.log(token)
          return res.status(201).send(token);
    }
  
        return res.status(400).send("Invalid Credentials");
    
    
    }catch(err){
        res.status(400).send('err')
    }
})
module.exports = router;