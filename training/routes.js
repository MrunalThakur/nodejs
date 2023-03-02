const fs = require('fs');
const { parse } = require('path');



const requestHandler = (req, res) => { 
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
        //on method creates a listener
        //'data' is the event we're listening to
        req.on('data',(dataChunk) => { 
            console.log(dataChunk);
            body.push(dataChunk);
            
        }); 
        return req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            const txtMessage = parseBody.split('=')[1];
            console.log(parseBody);
            fs.writeFile('resposneFile.text', txtMessage, (err)=>{
                if(err)
                    console.log(err);
            });
            res.setHeader('Location','/'); 
            return res.end();        
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> This is so weird</title></head>');
    res.write('<body><h1>So damn Weird</h1></body>');
    res.write('</html>');
    res.end(); 
};
/*
    Two ways to export. 
    1] pass function to module.exports
    2] pass object with multiple functions as key falue pairs to module.exports
*/
// 1] module.exports = requestHandler;
/* 2]   module.exports = {
        handler: requestHandler,
        text: 'this is just a string'
        };
*/
// 2.b] This is same as 2 but a different way of writing it
//      |* module keyword from module.exports can be omitted
//      exports.handler = requestHandler
//      exports.text = "this is just a string"


module.exports = {
    handler: requestHandler,
    text: 'Server running'
};
