import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {conn} from '../index.js'

dotenv.config();

function postLogin(req,res,next){
    const logueado=revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/");
}

async function preLogin(req,res,next){
    const logueado=revisarCookie(req);
    console.log(logueado)
    if(!logueado) return next();
    return res.redirect("/post");
}

function revisarCookie(req){
    try{
        const cookieJWT= req.headers.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
        const deco=jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
        console.log(deco);
        conn.query('select * from usuarios',(err,data)=>{
            const usuarioRevisar=data.find(usuario=>usuario.correo===deco.email);
            console.log(usuarioRevisar)
            if(!usuarioRevisar){
                return false;
            }
            return true
        })
    }catch{
        return false
    }
}

export const methods ={
    postLogin,
    preLogin
}