const express = require('express')
const router = express.Router()
const  finentialModel = require('../../../models/financials')
const auth = require('../../../middleware/checkAuth')
router.get('/',auth,async (req,res)=>{
try{
    const token = req.headers['x-access-token']
    const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    if(decoded['accountType'] == 'admin'||decoded['accountType'] == 'accountant'){
const data = await finentialModel.find()
res.status(200).send(data)
    }else{
        res.status(400).send('you are not an admin or an accountant ;)')
    }
}catch(e){
    res.status(400).send('an error occurred')
}
})
module.exports = router;