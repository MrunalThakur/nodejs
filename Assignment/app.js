const fs = require('fs');
// const jsonfile = require('jsonfile');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(bodyParser.json());

let userData;
fs.readFile(('./userData.json'),(err,data)=>{
    if(err){
        console.log(err);
    }
    else {
        userData = JSON.parse(data);
        console.log(userData.user);
    }
});
app.post('/myapp/user/add',(req,res)=>{
    // res.setHeader('Content-Type','text/html');
    // res.write('<html>');
    // res.write('<head><title> This is so weird</title></head>');
    // res.write('<body><form action="/message" method="POST"><input type="text" name="textBoxData"><button>Submit</button></form></body>');
    // res.write('</html>');
    const newUser = req.body;
    console.log("BoDY:" + req.body);
    userData.user.push(newUser);     
    dataString = JSON.stringify(userData);      
    fs.writeFile('./userData.json',dataString,(err)=>{
        if(err){
            throw err;
        }
    });
    res.json(newUser);
    console.log("userfile created");
});

app.put('/myapp/user/update/:id',(req,res)=>{
    // console.log('File exists');
    const id = req.params.id.split(':')[1].toString().replace(/["]+/g,'');
    let index = userData.user.findIndex((item)=>{return item.id == id});
    // console.log("index"+index);
    if(index > -1){
        userData.user[index].name = req.body.name;
        userData.user[index].id = req.body.id;
        const dataString = JSON.stringify(userData);
        fs.writeFile('./userData.json',dataString,(err)=>{
            if(err){
                throw err;
            }
        });
        res.send({message: 'User updated', data: userData.user[index]});
    }
    else{
        res.send({message: "UserID not found"});
    }
});

app.get('/myapp/user/display',(req,res)=>{
    for(user of userData.user){
        res.write('<html>');
        res.write('<li><strong>ID:</strong> ' + user.id + ', <strong>Name:</strong> ' + user.name + '</li>')
        res.write('</html>');
    }
    console.log("Response Sent");

});

//html page to display user id and name
app.use('/',(req,res)=>{
    console.log("homePage");
    res.send("<h1>User Home Page</h1>");
});




app.listen(3000);                            