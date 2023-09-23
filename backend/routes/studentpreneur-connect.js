const router= require('express').Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const { MinKey } = require('mongodb');
let Project=require('../models/Projects.model');
let Team=require('../models/Team.model');
let Student=require('../models/Student.model');
function generate(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result=""
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))]
    return result
}

//const axios=require('axios')
router.post('/getfilter',async (req,res)=>{
    console.log(Project.find());
    await Project.find({})
    .then(project=>res.json(project))
    .catch(err=>res.status(400).json('errror'+err));

})
router.post('/get_filter',async (req,res)=>{
    // if(req.bo)
    console.log(req.body)
    // console.log(Project.find({$and:[{status:req.body.status},{type:req.body.type}]}))
    if(req.body.status==="all"&&req.body.type==="all"&&req.body.amo==="all")
    {
        await Project.find({})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status==="all"&&req.body.type==="all"&&req.body.amo!=="all")
    {   console.log(req.body.amo)
        console.log(req.body.m)
        console.log(req.body.ma)
        await Project.find({$and:[{amount:{$gte:req.body.m,$lte:req.body.ma}}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status==="all"&&req.body.type!=="all"&&req.body.amo==="all")
    {
        await Project.find({$and:[{type:req.body.type}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status==="all"&&req.body.type!=="all"&&req.body.amo!=="all")
    {
        await Project.find({$and:[{type:req.body.type},{amount:{$gte:req.body.m,$lte:req.body.ma}}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status!=="all"&&req.body.type==="all"&&req.body.amo==="all")
    {
        await Project.find({$and:[{status:req.body.status}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status!=="all"&&req.body.type==="all"&&req.body.amo!=="all")
    {
        await Project.find({$and:[{status:req.body.status},{amount:{$gte:req.body.m,$lte:req.body.ma}}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status!=="all"&&req.body.type!=="all"&&req.body.amo==="all")
    {
        await Project.find({$and:[{status:req.body.status},{type:req.body.type}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
    if(req.body.status!=="all"&&req.body.type!=="all"&&req.body.amo!=="all")
    {
        await Project.find({$and:[{status:req.body.status},{type:req.body.type},{amount:{$gte:req.body.m,$lte:req.body.ma}}]})
        .then(project=>res.json(project))
        .catch(err=>res.status(400).json('error'+err)); 
    }
})
router.post('/enroll',async(req,res)=>{
    var result=generate(5);
    var idtocheck=[req.body.mem1,req.body.mem2,req.body.mem3,req.body.mem4,req.body.mem5];
    console.log("idtocheck");
    console.log(idtocheck);
    var stu=await Student.find({sid:{$in:idtocheck}})
    if(stu.length==idtocheck.length){
        var tea=await Team.find({teamId:result});
    console.log("teastarting-----------") 
        console.log(tea);
        console.log(result);
    console.log("teaend")
    if(Array.isArray(tea)&&tea.length>0){
        while(tea[0].teamId!=result)
        {
            result=generate(5);
            tea=Team.find({teamId:result});
            console.log("Success unique id generated");
        }
    }
    else{
        console.log("Success");
        // await Team.insertMany({
        //     teamId:result,
        //     teamname:req.body.tname,
        //     memberId:idtocheck,
        //     projectId:req.body.pid
        // })
        console.log(idtocheck);
        const newTeam=new Team({
            teamId:result,
            teamname:req.body.tname,
            membersId:idtocheck,
            projectId:req.body.pid
        });
        await newTeam.save().then(
           await Project.updateOne({
            projectId:req.body.pid
           },{
            $push:{teamId:result}
           }).then(res.send("Success"))
        ).catch(error=>{
            console.error("error saving document");
        })
    }     
    }
    else{
        res.send("Failure");
    }
   

    }
    )

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