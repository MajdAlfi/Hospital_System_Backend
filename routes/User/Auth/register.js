const express = require('express')
const jwt  = require('jsonwebtoken')
const router = express.Router()
const User = require('../../../models/user')
const bcrypt = require('bcryptjs/dist/bcrypt')
router.post('/createUser',async(req,res)=> {

try{
const { Email,
password,
Address1,
Name,
accountType,phoneNum} = req.body
if(!(Email&&password&& Address1&&Name&&accountType)){
   return res.status(400).send("All inputs are required")
}
const smallEmail = Email.toLowerCase()
const oldUser = await User.findOne({Email:smallEmail})
if(oldUser){
     return res.status(409).send('User Already exists')
  
 
}
if(password.length <6){
    return res.status(400).send('Password is too Short minimum 6 characters')
  
  
}
const encryptedPass = await bcrypt.hash(password,10)
const dateCreated = new Date()
const user = await User.create({
    Email:smallEmail,
    password:encryptedPass,
    Address1:Address1,
    Name:Name,
    accountType:accountType,
    dateCreated:dateCreated,
    phoneNum:phoneNum
})
const token = jwt.sign({user_id:user._id,Email:smallEmail,accountType:accountType}, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  })
  res.status(201).send(token)
}catch(e){
   res.status(400).send('err'+e)}
})

module.exports = router;