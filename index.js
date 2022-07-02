const express = require("express");
const mongoose = require('mongoose')
const  Dbcadastro  = require('./database/Cadastro.js')
const DbdateC = require('./database/DateColl');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api', (req, res) => {

    Dbcadastro.find()
    .then(cadastro => {
        res.json(cadastro);
    })
    
});

app.get('/dates', (req, res) => {

    DbdateC.find().sort({ age: -1, _id: 1 })
    .then(dates => {
        res.json(dates);
    });
})

app.post('/form_enviado', (req, res) => {
    
    let atividade = req.body.atividade;
    let dateI = req.body.dateInicio;
    let dateF = req.body.dateFim;

    let horaI = getFullTime(dateI);
    let horaF = getFullTime(dateF);
    
    if (validaHora(horaI, horaF) && getDate(dateI, dateF)) {

            const cadastro = new Dbcadastro({
                atividade: atividade,
                dateI: dateI,
                dateF: dateF
            });
            cadastro.save({force: false})
            .then(() => {
                res.redirect('http://localhost:3000')
            });

        let dataInicio = new Date (dateI);
        const diaC = dataInicio.getDate();
        const mesC = dataInicio.getMonth()+1;
        const anoC = dataInicio.getFullYear();

        let d = ''
        let m = ''

        diaC <= 9 ? d = "0" : d = '';
        mesC <= 9 ? m = "0" : m = '';

        let dateC = `${d}${diaC}/${m}${mesC}/${anoC}`;
        let dateId = `${mesC}${d}${diaC}${anoC}`

        var auth = DbdateC.findOne({_id : dateId}).exec();
        auth.then(doc => {
           try {
                if (doc) {
                    err => console.log(err)
                } else {
                    const dateCollection = new DbdateC({
                        _id: dateId,
                        dateC: dateC
                    });
                    dateCollection.save()
                }
           } catch (error) {
                console.log(error);
           }
        });

    } else {
        res.redirect('http://localhost:3000/cadastro/falha-cadastro')
    }
});

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});

function getFullTime(UTC) {
    var date = new Date(UTC)
    var time = date.getTime()
    return time
}

function validaHora(a, b) {
    return b < a ? false : true;
}

function getDate(dateI, dateF) {
    const dataI = dateI.substr(0,10);
    const dataF = dateF.substr(0,10);

    return dataI === dataF ? true : false;
}   