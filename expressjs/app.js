// const http = require('http');

const express = require('express');

// express imports express() as a function therefore following statement
const app = express(); 



app.use((req,res,next) => {
    console.log("this is middleware");
    next(); //allows the net middleware to execute (the one below)
    //call next when you don't send a response
});
app.use((req,res,next) => {
    console.log("next");
    // res.send sends response
    res.send("<h1> expressJS course<h1>")
});
// const server = http.createServer(app);

// server.listen(3000);
app.listen(3000);