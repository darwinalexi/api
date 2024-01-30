import express from "express";
import body_parser from 'express'
import productos from './src/routes/productos_routes.js'
const servidor = express();

const poort = 3333


// configuraciones
servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend:false}))
//configuracion de rutas

servidor.use(productos)


servidor.listen(poort, ()=>{
    console.log("corriendo")
})
