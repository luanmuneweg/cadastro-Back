// const { Connection } = require('mongodb');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cadastros');
console.log('conectado');