const express = require('express')
const userModel = require('../../../models/user')
const router = express.Router();
const auth = require('../../../middleware/checkAuth')
router.get('/',auth,async (req,res) =>{
    try{
    const {uid} = req.headers
const data = await userModel.findById({_id:uid})
res.status(200).send(data);
}catch(e){
    res.status(400).send('an error Occurred :(')
}
})
module.exports = router;