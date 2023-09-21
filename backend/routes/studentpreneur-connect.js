const router= require('express').Router();
const LocalStorage = require('node-localstorage').LocalStorage;
let Project=require('../models/Projects.model');
//const axios=require('axios')
router.post('/getfilter',async (req,res)=>{
    console.log(Project.find());
    await Project.find({})
    .then(project=>res.json(project))
    .catch(err=>res.status(400).json('errror'+err));

})
router.post('/get_filter',async (req,res)=>{
    console.log(Project.find({$and:[{status:req.body.status},{type:req.body.type}]}))
    await Project.find({$and:[{status:req.body.status},{type:req.body.type}]})
    .then(project=>res.json(project))
    .catch(err=>res.status(400).json('error'+err));
})

// router.post('/getec',async (req,res)=>{
//     console.log(Electioncommissioner_Account.find());
//     await Electioncommissioner_Account.find({Login_ID:req.body.id,Password:req.body.password})
//     .then(ec=>res.json(ec))
//     .catch(err=>res.status(400).json('errror'+err));
// })
// router.post('/getecl',async (req,res)=>{
//     // console.log(Electioncommissioner_Account.find());
//     console.log("HIIIIII")
//     await Electioncommissioner_Account.find({Login_ID:req.body.id})
//     .then(ec=>res.json(ec))
//     .catch(err=>res.status(400).json('errror'+err));
// }
// );
// router.post('/getcontractaddress',async(req,res)=>{
//     var rese
//    await Contract_Address.find({Login_ID:req.body.lid},{Contract_address:1,_id:0})
//     .then(resv=>{
//         //console.log(resv) 
//         console.log(resv)
//         res.json(resv)
//        // rese=resv
//        })
//     .catch(err=>res.status(400).json('error'+err))
//     //console.log(rese)
//   //      
// })
// router.post('/deploy',(req,res)=>{
// const address=Deploy(req.body.acno).then(val=>
//     Contract_Address.insertMany({Login_ID:req.body.id,Account_no:req.body.acno,Contract_address:val})
//     .then(resv=>res.json(resv))
//     .catch(err=>res.status(400).json('error'+err))
// );
// })
// router.post('/insert',async (req,res)=>{
//     console.log("Inside /Insert")
//     await VoterID_Account.insertMany({
//         V_ID:req.body.id,
//         Account_No:req.body.acno,
//         Name:req.body.name,
//         DOB:req.body.dob,
//         Address:req.body.addr,
//         PhoneNo:req.body.phno
//     }).then(voter=>res.json(voter)).catch(err=>res.status(400).json(err));
// })
module.exports = router