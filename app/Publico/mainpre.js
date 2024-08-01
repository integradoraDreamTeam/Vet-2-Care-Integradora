document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const cookieJWT= document.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
        window.location.href="/post"
    }catch{
        console.log('no hay cookie')
}
})
const boton=document.getElementById('login');
boton.addEventListener('click',()=>{
    window.location.href="/sIn";
})
const botontrans_eng=document.getElementById('trans_eng');
botontrans_eng.addEventListener('click',()=>{
    window.location.href="/e"
})
const botontrans_esp=document.getElementById('trans_esp');
botontrans_esp.addEventListener('click',()=>{
    window.location.href="/"
})
