const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile("index.html", (err, data) => {
            if(err) {throw err};
            console.log(data);
            res.writeHead(200, { 'Content-type':'text/html' });
            res.write(data);
            return res.end();
        })
    } else if(req.url === '/src/script.js'){
        fs.readFile("./src/script.js", (err, data) => {
            if(err) {throw err};
            console.log(data);
            res.writeHead(200, { 'Content-type' : 'text/javascript' });
            res.write(data);
            return res.end();
            }) 
        } else if(req.url === '/style.css'){
            fs.readFile('./style.css', (err, data) => {
                if(err) {throw err;};
                console.log(data);
                res.writeHead(200, { 'Content-type' : 'text/css'});
                res.write(data);
                return res.end();
            })
        }; 
}).listen(80);