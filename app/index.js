//Meter el dirmane
import path from 'path';
import {fileURLToPath} from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

import express from 'express';
import {methods as authentication} from './controllers/authentication.controller.js';

//Crear el servidor
const server=express();
server.set("port",4500);
server.listen(server.get("port"));

// Rutas
server.get("/",(req,res)=> res.sendFile(_dirname + "/Paginas/Main pre/mainpre.html"))
server.get("/sUp",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro usuario/Registro usuario.html"))
server.get("/sIn",(req,res)=> res.sendFile(_dirname + "/Paginas/Log in/Login.html"))
server.get("/sMa",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro mascota/Registro mascota.html"))
server.get("/store",(req,res)=> res.sendFile(_dirname + "/Paginas/Tienda/Tienda main/Tienda.html"))
server.post("/api/login",authentication.login)
server.post("/api/registrer",authentication.registrer)
 
//Configuracion
server.use(express.static(_dirname+"/Publico"));
server.use(express.static(_dirname+'/images'))
server.use(express.json());
