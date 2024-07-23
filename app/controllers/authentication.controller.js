import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "mysql2";
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

dotenv.config();

const usuarios=[{
    name:"a",
    email:"a@a.com",
    password: "$2a$05$yyx8jAwfOOsZl17wax12AOz2UXQz7DpMWKX3ACLzMGPlWusJ5yHpK"
}]
async function login(req,res){
    console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;
    if(!email || !password){
        return res.status(400).send({status:"Error", message:"Llena todo pa"})
    }
    const usuarioRevisar=usuarios.find(usuario=>usuario.email===email)
    if(!usuarioRevisar){
        return res.status(400).send({status:"Error", message:"Hubo un errror pa"})
    }
    const loginCorrecto= await bcryptjs.compare(password,usuarioRevisar.password)
    if(!loginCorrecto){
        return res.status(400).send({status:"Error", message:"Hubo un errror pa"})
    }
    const token=jsonwebtoken.sign(
        {email:usuarioRevisar.email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});
    
    const cookieOption={
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
        path:"/"
    }

    res.cookie("jwt",token,cookieOption);
    res.send({status:"ok",message:"Usuario loggeado",redirect:"/"})
}
async function registrer(req,res){
    console.log(req.body)
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    if(!name || !email || !password){
        return res.status(400).send({status:"Error", message:"Llena todo pa"})
    }
    const usuarioRevisar=usuarios.find(usuario=>usuario.name===name)
    if(usuarioRevisar){
        return res.status(400).send({status:"Error", message:"Ya existe pa"})
    }
    const salt= await bcryptjs.genSalt(5);
    const hashPassword= await bcryptjs.hash(password,salt);
    const nuevoUsuario= {
        name,email,password:hashPassword
    }
    
    conn.query('insert into usuarios(nombre_usuario, contraseña, correo) values("'+name+'","'+password+'","'+email+'");',(err,result)=>{
        if(err){
            console.log('No se inserto pa')
            return res.status(400).send('Hiciste algo mal pa');
        }
    });
    conn.query("select * from usuarios",(err,data)=>{
        console.log(data)
    })
    return res.status(201).send({status:"ok",message:'Si se creo pa, hay te va el id ${nuevoUsuario.name}', redirect:"/sIn"})
}

export const methods={
    login,
    registrer
}