//Meter el dirmane
import path from 'path';
import {fileURLToPath} from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

import express from 'express';

//Crear el servidor
const server=express();
server.set("port",4500);
server.listen(server.get("port"));

// Rutas
server.get("/main",(req,res)=> res.sendFile(_dirname + "/Paginas/Main pre/mainpre.html"))
server.get("/sUp",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro usuario/Registro usuario.html"))
 
//Configuracion
server.use(express.static(_dirname+"/Publico"))
