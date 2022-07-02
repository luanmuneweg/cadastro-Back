const mongoose = require('mongoose');
const connection = require('./connection')

const CadastroSchema = new mongoose.Schema({
    atividade: {type: String},
    dateI: {
        type: Date,
        allowNull: false
    },
    dateF: {
        type: Date,
        allowNull: false
    }
});

const cadastros = mongoose.model('dadoscadastros', CadastroSchema);

module.exports = cadastros;