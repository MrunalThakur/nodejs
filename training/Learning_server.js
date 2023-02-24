const http = require('http');    //require is like import in python
const fs = require('fs');
const { parse } = require('path');

/*

//the requestListner takes incomingMessage and serverResponse
function requestListner(req,res){

}

//createServer takes a requestListner as an argument that executes a function for each response it receives
http.createServer(requestListner); 


*There's a shorter way to write this using anonymous functions

http.createServer(function(req,res){
    
});
*or an even shorter way to use arrow function without the "function" keyword

*/

const server = http.createServer((req,res) => {
   //console.log(req.url, req.method, req.headers);
   //process.exit(); //quits the server. shouldn't be used in actual server code
    let url = req.url;
    let method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title> This is so weird</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="textBoxData"><button>Submit</button></form></body>');
        res.write('</html>');
        return res.end();

    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        //on method is creates a listener
        //'data' is the event we're listening to
        req.on('data',(dataChunk) => { 
            //let txt = dataChunk.toString();
            console.log(dataChunk);
            body.push(dataChunk);
            
        }); 
        //'end' listener fires when all incoming data is parsed
        //return statement added coz moved line 65-71 inside req.on
        return req.on('end',()=>{
            //Buffer object is available globally (nodejs feature)
            const parseBody = Buffer.concat(body).toString();
            //console.log(parseBody);
            const txtMessage = parseBody.split('=')[1];
            /*
                Using writeFileSync is bad coz if the data received is
                a file and too large, nodeJS will be blocked from executing
                next block of code until the datafile is fully received.
            */
            //fs.writeFileSync('responseFile.text',txtMessage);
            fs.writeFile('resposneFile.text', txtMessage, (err)=>{
                console.log(err);
            });
            //line 65-50 can be outside req.on block
            //res.writeHead(302,{}) //{} has headers
            //easier to read if written on separate lines
            res.statusCode = 302; //302 - redirect
            //Location is default header accepted by js
            res.setHeader('Location','/'); 
            return res.end();      
            
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> This is so weird</title></head>');
    res.write('<body><h1>So damn Weird</h1></body>');
    res.write('</html>');
    res.end(); //cannot write res.write after res.end
});

server.listen(3000); //1433 port

//better way of writing response is using the Express.js framework
//this is just to understand the internal working