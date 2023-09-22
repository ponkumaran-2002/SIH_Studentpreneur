const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const teams = new Schema(
{
teamId:{type: String},
teamname:{type: String},
membersId:{type: Array},
projectId:{type: String},
},{collection:'Team'}
)
const team=mongoose.model('Team',teams)
module.exports=team