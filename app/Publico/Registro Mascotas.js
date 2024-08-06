document.addEventListener('DOMContentLoaded', () => {
    const especie = document.getElementById("EspecieA");
    const raza = document.getElementById("RazaA");

    const breeds = {
        perro: ['Bulldog', 'Labrador', 'Beagle'],
        gato: ['Siamés', 'Persa', 'Maine Coon'],
        hamster: ['Sirio', 'Roborovski', 'Chino'],
        perico: ['Opalino', 'Verde', 'Azul'],
        araña: ['Viuda Negra', 'Tarántula', 'Reclusa Marrón'],
        pez: ['Pez Dorado', 'Betta', 'Guppy']
    };

    especie.addEventListener('change', (event) => {
        const especieSelected = event.target.value;
        const opcionesRaza = breeds[especieSelected] || [];
        raza.innerHTML = '<option hidden>--Razas de animales--</option>';

        opcionesRaza.forEach(breed => {
            const opcion = document.createElement("option");
            opcion.value = breed;
            opcion.textContent = breed;
            raza.appendChild(opcion);
        });
    });


const modal = document.getElementById("modal_container");
const cerrar_modal = document.getElementById("cerrar_alerta");

cerrar_modal.addEventListener("click", () => {
    
    window.location.href = '/registromascotas';
    modal.close();  
});

 function abrir_alertaM() {
    if (modal) {
        modal.showModal();
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
});
});

document.getElementById('petForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    let user;
    console.log(e);
    try {
        const cookieJWT= document.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
        const cokDecrypt=await fetch('https://vet-2-care-integradora-2.onrender.com/api/revisarCookie',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                cookie: cookieJWT
            })
        });
        if(cookieJWT==null){
            window.location.href="/"
        };
        const res=await cokDecrypt.json();
        user=res;
        const id=res.id_usuario;
    }catch(err){
        console.log('Error pa')
        console.log(err)
    }
    console.log(user);
    const ans= await fetch('https://vet-2-care-integradora-2.onrender.com/postmascota',{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            NombreA: e.target.NombreA.value,
            EspecieA: e.target.EspecieA.value,
            RazaA: e.target.RazaA.value,
            EdadA: e.target.EdadA.value,
            PesoA: e.target.PesoA.value,
            SexoA: e.target.SexoA.value,
            InfoA: e.target.col1.value,
            id_usr: user.id_usuario
        })
    })
    const answer= await ans.json();
    console.log(answer);
    if(answer.redirect){
        window.location.href=answer.redirect;
    }
})