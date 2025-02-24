const express = require('express')
const router = express.Router()
const imgModel = require('../../../models/img')
const auth = require('../../../middleware/checkAuth')
router.get('/:imgID',auth,async (req,res)=>{
try{
    const {imgID}= req.params;
const data = await imgModel.findOne({_id:imgID})
res.status(200).send(data)
}catch(e){
    res.status(400).send('an error occurred')
}
})
module.exports = router;