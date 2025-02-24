const express = require('express')
const router = express.Router()
const taskModel = require('../../../models/tasks')

router.get('/',async (req,res)=>{
try{
const tasks = await taskModel.find({})
res.status(200).send(tasks)
}catch(e){
    res.status(400).send('an error has occurred ')
}
})
module.exports = router;