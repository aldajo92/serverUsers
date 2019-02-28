const express = require('express')
const bodyParser = require('body-parser');
const { User } = require('./models/index')
const PORT = 3000
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send({message:'Server on'})
});

app.post('/api/v1/creat/user', (req, res) => {
    console.log(req.body)
    const {nombre,apellidos,edad,foto_perfil,genero} = req.body
    const newUSer = User({
        nombre,
        apellidos,
        edad,
        foto_perfil,
        genero
    });
    newUSer.save((err,user) => {
        err
           ? res.status(400).send(err)
           : res.status(201).send(user)
    })
});

app.get('/api/v1/creat/user',(req,res) => {
    User.find({is_active:true}).exec()
        .then((users) => {
            res.send(users)
        }).catch((err) => {
            res.status(409).send(err)
        });
});

app.get('/api/v1/creat/user/:uid',(req,res) => {
    User.findById(req.params.uid).exec()
        .then((user) => {
            res.send(user)
        }).catch((err) => {
            res.status(409).send(err)
        });
});

app.put('/api/v1/creat/user/:uid',(req,res) => {
    const {uid} = req.param
    User.findByIdAndUpdate(uid,{$set:req.body}, {new:true}).exec()
        .then((newUSer) => {
            res.send(newUSer)
        }).catch((err) => {
            res.status(409).send(err)
        })
});

app.delete('/api/v1/creat/user/:uid',(req,res) => {
    const {uid} = req.param
    User.findOneAndUpdate(uid).exec()
        .then(() => {
            res.sendStatus(204);
        }).catch((err) => {
            res.status(409).send(err);
        });
});

app.post('/api/v1/creat/mascota/user/:idUser', (req, res) => {
    const {idUser} = req.params
    User.findByIdAndUpdate(idUser,{$push:{mascotas:[req.body]}},{new:true}).exec()
        .then((newUSer) => {
            res.status(201).send(newUSer)
        }).catch((err) => {
            res.status(409).send(err);
        });
})

app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
});