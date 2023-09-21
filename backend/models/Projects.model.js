const mongoose = require('mongoose')
const Schema = mongoose.Schema
const projects = new Schema(
{

p_id:{type: String,required:true,unique:true},
organisation:{type: String,required:true},
desc:{type: String,required:true},
type:{type: String,required:true},
status:{type: String,required:true},
amount:{type: String,required:true},
duedate:{type: String,required:true},
noofteamsregistered:{type: String,required:true},
    

},{collection:'projects'}
)
const Project=mongoose.model('projects',projects)
module.exports=Project