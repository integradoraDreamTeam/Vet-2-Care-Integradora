document.addEventListener('DOMContentLoaded',(req,res)=>{
    const verCookie=req.target.cookie;
    console.log(verCookie);
    if(verCookie){
        window.location.href='/post'
    }
});

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

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    Swal.fire({
        title: "¡Tu mensaje ha sido recibido!",
        text: "Gracias por contactarnos. Revisaremos tu consulta y te responderemos lo antes posible.",
        icon: "success",
        customClass: {
        confirmButton: 'custom-button'
         }
    }).then((result) => {
        if (result.isConfirmed) {
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    Swal.fire({
        title: "¡Tu mensaje ha sido recibido!",
        text: "Gracias por contactarnos. Revisaremos tu consulta y te responderemos lo antes posible.",
        icon: "success",
        customClass: {
        confirmButton: 'custom-button'
         }
    }).then((result) => {
        if (result.isConfirmed) {
        }
    });
});