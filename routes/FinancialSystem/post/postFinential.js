// const express = require('express')
// const router = express.Router();
// const auth = require('../../../middleware/checkAuth')
// const finetialModel = require('../../../models/financials')
// router.post('/',auth,async (req,res)=>
// {
//     try{
//         const {Cost,patientID } = req.body;
//         const now = Date.now()
//         await finetialModel.create({ Cost:Cost,
//             patientID: patientID,
//             date:now,
//             isPaid:false})
//             res.status(200).send('Done')
//     }catch(e){
//         res.status(400).send('an error occurred');
//     }
// })