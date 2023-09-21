const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery','true')
const app = express()
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000;
mongoose.set('strictQuery','true')
mongoose.connect("mongodb+srv://sihworks001:schlenkians@cluster0.fbg8aof.mongodb.net/Studentpreneur?retryWrites=true&w=majority&appName=AtlasApp");
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB Database Connection Established Successfully");
})
const studentpreneurrouter=require('./routes/studentpreneur-connect');
app.use('/studentpreneur',studentpreneurrouter);
app.listen(port, () => console.log(`Server running on port ${port}`))
