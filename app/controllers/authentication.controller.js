import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {conn} from '../index.js'

dotenv.config();

async function login(req,res){
    console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;
    if(!email || !password){
        return res.status(400).send({status:"Error", message:"Llena todo pa"})
    }
    conn.query("select * from usuarios",async (err,datos)=>{
        if(err){
            return res.status(400).send({status:"Error",message:"Error la obtener los usuarios"})
        }
        const usuarioRevisar=datos.find(usuario=>usuario.correo===email);
        if(!usuarioRevisar){
            return res.status(400).send({status:"Error", message:"Hubo un errror pa"})
        }
        const loginCorrecto= await bcryptjs.compare(password,usuarioRevisar.contraseña)
        if(!loginCorrecto){
            return res.status(400).send({status:"Error", message:"Hubo un errror pa"})
        }
        const token=jsonwebtoken.sign(
            {email:usuarioRevisar.correo},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION});
        
        const cookieOption={
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
            path:"/"
        }
        console.log("login exitoso")
        res.cookie("jwt",token,cookieOption);
        res.send({status:"ok",message:"Usuario loggeado",redirect:"/"})
    });
}

async function registrer(req,res){
    console.log(req.body)
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    if(!name || !email || !password){
        return res.status(400).send({status:"Error", message:"Llena todo pa"})
    }
    conn.query("select * from usuarios",async (err,data)=>{
        if(err){
            return res.status(400).send({status:"Error",message:"No se pudo consultar pa"})
        }
        const usuarioRevisar=data.find(usuario=>usuario.correo===email);
        if(usuarioRevisar){
            return res.status(400).send({status:"Error", message:"Ya existe pa"})
        }else{
            const salt= await bcryptjs.genSalt(5);
            const hashPassword= await bcryptjs.hash(password,salt);
            conn.query('insert into usuarios(nombre_usuario, contraseña, correo) values("'+name+'","'+hashPassword+'","'+email+'");',(err,result)=>{
                if(err){
                    console.log('No se inserto pa')
                    return res.status(400).send('Hiciste algo mal pa');
                }
            });
            return res.status(201).send({status:"ok",message:'Si se creo pa', redirect:"/sIn"})
        }
    });
}

function getData(req,res){
    const nombre=req.body.name;
    conn.query("select * from productos where nombre_producto='"+nombre+"';",(err,data)=>{
        if (err){
            return res.status(400).send("No se pudo pa")
        }else{
            return res.send(data);
        }
    })
}

function getPets(req,res){
    const correo=req.body.email;
    conn.query("select * from usuarios where correo='"+correo+"';",(err,data)=>{
        if (err){
            return res.status(400).send("No se pudo pa")
        }
        //console.log("es data")
        const usr=data.find(usr=>usr.correo===correo);
        const id=usr.id_usuario;
        conn.query("select * from animales where fk_usuario='"+id+"';",(err,datos)=>{
            if (err){
                return res.status(400).send("No se pudo pa")
            }else{
                return res.send(datos);
            }
        })
    })
}

function revisarCookie(req,res){
    //console.log('Si entro')
    const deco=jsonwebtoken.verify(req.body.cookie,process.env.JWT_SECRET);
    //console.log(deco);
    conn.query('select * from usuarios',(err,data)=>{
        const usuarioRevisar=data.find(usuario=>usuario.correo===deco.email);
        //console.log(usuarioRevisar)
        if(usuarioRevisar){
            return res.send(usuarioRevisar);
        }else{
            return console.log('error')
        }
    })
}    

function getCitas(req,res){
    //console.log(req)
    conn.query('select * from citas where fk_usuario='+req.body.id+';',(err,dates)=>{
        if(err){
            res.status(400).send('No se pudo la cita')
        }else{
            //console.log(dates)
            return res.send(dates);
        }
    })
}

function getHistorial(req){
    const id=req.body.id;
    conn.query('select * from citas where fk_animal="'+id+"';",(err,data)=>{
        if(err){
            return console.log(err);
        }else{
            console.log(data)
            return data;
        }
    })
}

export const methods={
    login,
    registrer,
    getData,
    getPets,
    getCitas,
    revisarCookie,
    getHistorial
}