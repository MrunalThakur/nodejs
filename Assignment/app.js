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
    //const id = req.params.id.split(':')[1].toString().replace(/["]+/g,'');
    const id = req.params.id; 
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
        res.status(200).send({message: 'User updated', data: userData.user[index]});
    }
    else{
        res.status(200).send({message: "UserID not found"});
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

app.get('/myapp/user/display/:id',(req,res)=>{
    const id = req.params.id;
    let index = userData.user.findIndex((item) => { return item.id === id});
    res.write('<html>');
    res.write('<strong>ID:</strong> ' + userData.user[index].id + ', <strong>Name:</strong> ' + userData.user[index].name )
    res.write('</html>');
});
//to delete a user by id from json file using expressjs

app.delete('/myapp/user/delete/:id',(req,res)=>{
    const id = req.params.id;
    let index = userData.user.findIndex((item)=>{ return item.id === id});
    if(index >-1){

        //removes the user from array
        userData.user.splice(index,1);
        //update the file
        let data = JSON.stringify(userData,null,2);
        fs.writeFileSync('userData.json',data);
        console.log("user deleted");
        res.status(200).send({message: "User deleted"});
    }
    else{
        res.status(404).send({message: "User not found"});
    }
});

//html page to display user id and name
app.use('/',(req,res)=>{
    console.log("homePage");
    res.send("<h1>User Home Page</h1>");
});




app.listen(3000);                            