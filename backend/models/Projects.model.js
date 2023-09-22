const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const projects = new Schema(
{

pid:{type: String},
organisation:{type: String},
description:{type: String},
type:{type: String},
status:{type: String},
amount:{type: Number},
duedate:{type: String},
noofTeamsRegistered:{type: String},
teamId:{type: Array},  
module_1_date:{type:String},
module_2_date:{type:String},  
module_3_date:{type:String},
},{collection:'Project'}
)
const Project=mongoose.model('Project',projects)
module.exports=Project