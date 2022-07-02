const mongoose = require('mongoose');
const connection = require('./connection')

const DateCSchema = new mongoose.Schema({
    _id: {type: Number},
    dateC: {type: String}
});

const dateC = mongoose.model('DateC', DateCSchema);

module.exports = dateC;