document.addEventListener('DOMContentLoaded',async ()=>{ 
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');   
    console.log(id)
    const res=await fetch('https://vet-2-care-integradora-2.onrender.com/api/getHistorial',{
        method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:id
        })
    })
    if(!res) return;
    const resJson= await res.json();

    const an=await fetch('https://vet-2-care-integradora-2.onrender.com/api/getAnimal',{
        method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:id
        })
    })
    const animal=await an.json();
    console.log(animal[0].nombre_animal)
    const lt=resJson.length;
    const div_pets=document.getElementById('pets');
    const div_card=document.createElement('div');
        div_card.className='card';
    for(let i=0; i<lt; i++){
        const div_desc=document.createElement('div');
        div_desc.className='descdata'
            const h3_data=document.createElement('h3');
            h3_data.style='color: #476d34';
            const desc=document.createElement('p');
            desc.innerHTML=resJson[i].motivo_cita;
        const div_pc=document.createElement('div');
        div_pc.className='primarydata';
        div_pc.style='flex-direction: column; height: auto';
            const h3_f=document.createElement('h3');
            h3_f.style='color: #476d34';
            h3_f.innerHTML='Fecha: '
            const p_fecha=document.createElement('p');
            p_fecha.innerHTML=""+resJson[i].fecha+""
            const h3_h=document.createElement('h3');
            h3_h.style='color: #476d34'
            h3_h.innerHTML='Hora: '
            const p_hora=document.createElement('p');
            p_hora.innerHTML=""+resJson[i].hora+"";
        const div_inner=document.createElement('div');
        div_inner.className='innercard';

        div_desc.appendChild(h3_data);
        div_desc.appendChild(desc);
        //
        div_pc.appendChild(h3_f);
        div_pc.appendChild(p_fecha)
        div_pc.appendChild(h3_h)
        div_pc.appendChild(p_hora)
        //
        div_inner.appendChild(div_pc);
        div_inner.appendChild(div_desc);
        //
        div_card.appendChild(div_inner);
    }
    const h1=document.createElement('h1');
    h1.style='color: #314E23';
    h1.innerHTML='Historial médico de '+animal[0].nombre_animal;

    div_pets.appendChild(h1);
    div_pets.appendChild(div_card)
})