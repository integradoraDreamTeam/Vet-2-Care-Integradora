//Crear el servidor
import express from 'express';
import {methods as authentication} from './controllers/authentication.controller.js';
const server=express();
server.set("port",4500);
server.listen(server.get("port"));

//Meter el dirmane
import path from 'path';
import {fileURLToPath} from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

//Configuracion
server.use(express.static(_dirname+"/Publico"));
server.use(express.static(_dirname+'/images'))
server.use(express.json());

// Rutas
server.get("/",(req,res)=> res.sendFile(_dirname + "/Paginas/Main pre/mainpre.html"))
server.get("/sUp",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro usuario/Registro usuario.html"))
server.get("/sIn",(req,res)=> res.sendFile(_dirname + "/Paginas/Log in/Login.html"))
server.get("/sMa",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro mascota/Registro mascota.html"))
server.get("/store",(req,res)=> res.sendFile(_dirname + "/Paginas/Tienda/Tienda main/Tienda.html"))
server.get("/registromascotas",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro mascota/Registro mascota.html"))
server.post("/api/login",authentication.login)
server.post("/api/registrer",authentication.registrer)
 
//Conexion con la base de datos
import  db from "mysql2";
const conn=db.createConnection({
host: "localhost",
user: "root",          // Remplazar con tu nombre de usuario
password: "root",  // Remplazar con tu contraseña
database: "vet2care",
port: 3306,
});

//Comprobacion
conn.connect((err)=> {
    if(err){
        console.log("Error connection to database", err);
    }else{
    console.log("Connected to database");
}});

import bodyParser from 'body-parser';

// Para que pueda leer datos del lso formulariso 
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json());
server.use(cors());