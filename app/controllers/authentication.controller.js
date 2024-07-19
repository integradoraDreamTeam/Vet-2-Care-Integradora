import bcryptjs from 'bcryptjs'

const usuarios=[{
    name:"a",
    email:"a@a.com",
    password: "$2a$05$yyx8jAwfOOsZl17wax12AOz2UXQz7DpMWKX3ACLzMGPlWusJ5yHpK"
}]
async function login(req,res){

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
    //}else{
    //    res.status(200).send({status:"Successful", message:"Muy bien pa"})
    }
    const salt= await bcryptjs.genSalt(5);
    const hashPassword= await bcryptjs.hash(password,salt);
    const nuevoUsuario= {
        name,email,password:hashPassword
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({status:"ok",message:'Si se creo pa, hay te va el id ${nuevoUsuario.name}', redirect:"/sIn"})
}


export const methods={
    login,
    registrer
}