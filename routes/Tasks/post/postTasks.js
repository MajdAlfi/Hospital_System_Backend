const express = require('express')
const router = express.Router();
const taskModel = require('../../../models/tasks')

router.post('/',async (req,res)=>{
    try{
        const {taskName,Desc,Cost} = req.body
        await taskModel.create({taskName:taskName,Desc:Desc,Cost:Cost})
        res.status(200).send('Done');
    }catch(e){
        res.status(400).send('an error occured')
    }
})