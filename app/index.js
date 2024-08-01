//Crear el servidor
import express from 'express';
import cookieParser from 'cookie-parser';
import {methods as authentication} from './controllers/authentication.controller.js';
import {methods as authorization} from './middlewares/authorization.js'
const server=express();
server.set("port",4500);
server.listen(server.get("port"));
import cors from 'cors'

//Meter el dirmane
import path from 'path';
import {fileURLToPath} from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

//Configuracion
server.use(express.static(_dirname+"/Publico"));
server.use(express.static(_dirname+'/images'))
server.use(express.json());
server.use(cookieParser())

// Rutas
server.get("/"/*authorization.preLogin*/,(req,res)=> res.sendFile(_dirname + "/Paginas/Main pre/mainpre.html"))
server.get("/post"/*authorization.postLogin*/,(req,res)=> res.sendFile(_dirname + "/Paginas/Main post/mainpost.html"))
server.get("/his",(req,res)=> res.sendFile(_dirname + "/Paginas/Main post/historialmedico.html"))
server.get("/sUp",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro usuario/Registro usuario.html"))
server.get("/sIn",(req,res)=> res.sendFile(_dirname + "/Paginas/Log in/Login.html"))
server.get("/sMa",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro mascota/Registro mascota.html"))
server.get("/store",(req,res)=> res.sendFile(_dirname + "/Paginas/Tienda/Tienda main/Tienda.html"))
server.get("/s",(req,res)=> res.sendFile(_dirname + "/Paginas/Tienda/Productos/Productos.html"))
server.get("/cita",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro cita/citas.html"))
server.get("/e",(req,res)=> res.sendFile(_dirname + "/Paginas/Main pre/mainpre_english.html"))
server.get("/registromascotas",(req,res)=> res.sendFile(_dirname + "/Paginas/Registro mascota/Registro mascota.html"))
server.post("/api/login",authentication.login)
server.post("/api/registrer",authentication.registrer)
server.post("/api/getData",authentication.getData)
server.post("/api/getPets",authentication.getPets)
 
//Conexion con la base de datos
import db from "mysql2";
export const conn=db.createConnection({
host: process.env.HOST || "localhost",
user: process.env.USER ||  "root",          // Remplazar con tu nombre de usuario
password: process.env.PASSWORD || "root",  // Remplazar con tu contraseña
database: process.env.DATABASE || "vet2care",
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

//Submit en la db
server.post("/postmascota", (req, res) => {
    const { NombreA, EspecieA, RazaA, EdadA, PesoA, SexoA, DescripcionColorA } = req.body;

    conn.query("SELECT * FROM animales WHERE fk_usuario = 3;", (err, trow) => {
        if (err) {
            console.log("Error fetching data", err);
            return res.status(500).send("Error fetching data");
        }

       const repetido= trow.some((row) => {
            return row.nombre_animal == NombreA && row.especie_a == EspecieA && row.raza_a == RazaA && row.edad == EdadA && row.peso_a == PesoA && row.sexo_a == SexoA && row.info_adicional_a == DescripcionColorA 
                
        });

        if (repetido) {
            console.log("Nombre repetido");
            return res.status(400).send("Repetido todo");
        } else{const insertQuery = `
                INSERT INTO animales(nombre_animal, especie_a, raza_a, edad, peso_a, sexo_a, info_adicional_a, fk_usuario)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const insertValues = [NombreA, EspecieA, RazaA, EdadA, PesoA, SexoA, DescripcionColorA, 3];

            conn.query(insertQuery, insertValues, (err, results) => {
                if (err) {
                    console.log("Error inserting data", err);
                    return res.status(500).send("Error inserting data");
                }

                console.log("Data inserted successfully");
                return res.redirect("/");
            });
        }
    });
});

