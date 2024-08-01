document.addEventListener('DOMContentLoaded', async (req)=>{
    try{
        const cookieJWT= document.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
    }catch{
        window.location.href="/"
    }
    console.log('cookie')
    console.log(cookieJWT)
    const cokDecrypt=await fetch('http://localhost:4500/api/revisarCookie',{
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
    console.log(res) 

    const le=res.length;
    console.log(le)
    for(let i=0; i<=le;i++){
        console.log(resJson[i])
        const card=document.getElementById('card');
            const h2=document.createElement('h2');
            console.log(res[i].nombre_animal)
            h2.innerHTML=res.nombre_animal;
            const div_inner=document.createElement('div');           
            div_inner.className="innercard";
            const div_primary=document.createElement('div');
            div_primary.className='primarydata';
            const div_left=document.createElement('dataleft');
            div_left.className='dataleft'
                const animal=document.createElement('h3')
                animal.innerHTML='Animal: '+res[i].especie_a;
                const raza=document.createElement('h3');
                raza.innerHTML='Raza: '+res[i].raza_a;
                const edad=document.createElement('h3');
                edad.innerHTML='Edad: '+res[i].edad;
                const peso=document.createElement('h3');
                peso.innerHTML='Peso: '+res[i].peso_a
                const sexo=document.createElement('h3');
                sexo.innerHTML='Sexo: '+res[i].sexo_a;
            const div_right=document.createElement('div');
                const animaldata=document.createElement('p')
                animaldata.innerHTML=res[i].especie_a;
                const razadata=document.createElement('p');
                razadata.innerHTML=res[i].raza_a;
                const edadData=document.createElement('p');
                edadData.innerHTML=res[i].edad;
                const pesoData=document.createElement('p');
                pesoData.innerHTML=res[i].peso_a
                const sexoData=document.createElement('p');
                sexo.innerHTML=res[i].sexo_a;
            const div_data=document.createElement('div');
                div_data.className='descdata'
                const desc=document.createElement('h3');
                desc.innerHTML='Informacion adicional';
                const info=document.createElement('p');
                info.innerHTML=res[i].info_adicional_a
            const boton=document.createElement('button');
            boton.className='btn';
            boton.innerHTML='Historial medico'
        desc.appendChild(desc);
        div_data.appendChild(desc);
        div_data.appendChild(boton);
    }
})

