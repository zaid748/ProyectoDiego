const path = require('path');

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = require('./server'); 
require('./database');


app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '../front/build')));
    res.sendFile(path.join(__dirname, '../front/build', 'index.html')); 
}); 