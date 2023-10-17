const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');


app.get('/', (req, res) => {
    fs.readFile("index.html", (err, data) => {
        if(err) throw err;
        res.sendFile(path.join(__dirname, 'index.html'));
    })
})

app.get('/src/script.js', (req, res) => {
    fs.readFile("./src/script.js", (err, data) => {
        if(err) throw err;
        res.sendFile(path.join(__dirname, './src/script.js'));
    })
})

app.get('/style.css', (req, res) => {
    fs.readFile('./style.css', (err, data) => {
        if(err) throw err;
        res.sendFile(path.join(__dirname, './style.css'));
    })
})

app.listen(8080, () => {
    console.log('listening on port 8080');
})