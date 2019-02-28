const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    apellidos:String,
    edad:Number,
    foto_perfil:{
        type:String,
        default:'https//www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiwoPjEm93gAhVGR6wKHaYkAvoQjRx6BAgBEAU&url=https%3A%2F%2Fareajugones.sport.es%2F2017%2F10%2F08%2Flas-22-transformaciones-de-goku-en-dragon-ball%2F&psig=AOvVaw2SnfxiWkwyIE3MDiVx6g2x&ust=1551401616865118'
    },
    genero:{
        type:String,
        required:true,
        enum:['F','M']
    },
    mascotas:{
        type:[{
            nombre:String,
            raza:{
                type:String,
                required: true
            }
        }]
    },
    is_active:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports ={User}