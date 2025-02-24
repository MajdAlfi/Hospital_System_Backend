const express = require('express')
const router  =express.Router()
const auth  = require('../../../middleware/checkAuth')
const usersModel = require('../../../models/user')
router.delete('/deleteUser',auth,async(req,res)=>{
    try{
        const token = req.headers['x-access-token']
        const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(decoded['accountType'] == 'admin'){
        const {uid}= req.body;
    await usersModel.findOneAndDelete({_id:uid});
            res.status(200).send('done')
        }else{
            res.status(400).send('you are not the admin ;)')
        }
    }catch(e){
        res.status(400).send('err')
    }

})
module.exports = router