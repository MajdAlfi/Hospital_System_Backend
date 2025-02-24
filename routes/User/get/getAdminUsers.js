const express = require('express')
const userModel = require('../../../models/user')
const router = express.Router();
const auth = require('../../../middleware/checkAuth')
router.get('/:userName',auth,async (req,res) =>{
    try{
        console.log('we are inn..')
        const token = req.headers['x-access-token']
        const decoded = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(decoded['accountType'] == 'admin'){
  const {userName} = req.params;
  console.log("searching"+ userName)
const data = await userModel.find({ Name: { $regex: userName, $options: 'i' } });

res.status(200).send(data);

        }else{
            res.status(400).send('you are not an admin or an doctor ;)')
        }
  
}catch(e){
    res.status(400).send('an error Occurred :(')
}
})
module.exports = router;