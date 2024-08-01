document.addEventListener('DOMContentLoaded', async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const correo = urlParams.get('correo');   
    console.log(correo)
    const res=await fetch("https://vet-2-care-integradora.onrender.com",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email:correo
        })
    });
    if(!res.ok) return;
    const resJson= await res.json();
    const le=resJson.length;
    for(let i=0; i<=le;i++){
        console.log(resJson[i])
        const card=document.getElementById('card');
            const h2=document.createElement('h2');
            h2.innerHTML=(ar.nombre_animal);
            const div_inner=document.createElement('div');           
            div_inner.className="innercard";
    }
})