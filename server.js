// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/getdata',(req,res)=>{
    console.log('server recieved get req');
    res.send(projectData);
    // console.log(projectData);
})
app.post('/postdata',(req,res)=>{
    console.log('server recieved post req')
    projectData=req.body;
    //console.log(projectData);
    res.send(projectData);
});
//
const port =3000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}...`);
});