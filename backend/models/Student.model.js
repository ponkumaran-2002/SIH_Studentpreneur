const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const students = new Schema(
{

sid:{type: String},
address:{type: String},
name:{type: String},
registerNo:{type: Number},
clgName:{type: String},
clgCity:{type: Number},
clgState:{type: String},
panNo:{type: String},
phoneNo:{type: Number},  
accountNo:{type:String},
bankName:{type:String},  
ifscCode:{type:Number},
mailId:{type:String},
password:{type:String},
githubId:{type:String},
creditPoints:{type:Number},
projects:{
    id:{type:String},
    status:{type:String},
    levelOfCompletion:{type:Number},
},
clgid:{type:String}
},{collection:'Student'}
)
const Student=mongoose.model('Student',students)
module.exports=Student