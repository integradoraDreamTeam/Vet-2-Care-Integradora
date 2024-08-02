document.addEventListener('DOMContentLoaded', async (req)=>{
    try{
        const cookieJWT= document.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
        //console.log('cookie')
        //console.log(cookieJWT)
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
        //console.log(res.nombre_usuario) 
        const an= await fetch('http://localhost:4500/api/getPets',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email:res.correo
            })
        });
        if(!an){
            return console.log('No se hizo la consulta pa')
        };
        const animals=await an.json();
        //console.log(animals.length)

        //console.log('Es lo de las citas')
        const cit=await fetch('http://localhost:4500/api/getCitas',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:res.id_usuario
            })
        })
        const citas= await cit.json();
        //console.log(citas)

        //Nombre del usuario
        const div_usr_an=document.getElementById('cont usr-anim')
        
        const welcom=document.createElement('h1');
        welcom.style='text-align: center;'
        welcom.innerHTML='¡Bienvendio '+res.nombre_usuario+'!';

        const div_pets=document.getElementById('div_pets')

        const hed_mas=document.createElement('h1');
        hed_mas.innerHTML='Tus mascotas'

        const boton_mascota=document.createElement('button');
        boton_mascota.className='btn';
        boton_mascota.innerHTML='Agregar mascota'

         // Anadir mascotas
        const le=animals.length;
        //console.log(le);

        for(let i=0; i<=le;i++){
            const card=document.getElementById('card');
                const h2=document.createElement('h2');
                h2.innerHTML=""+(animals[i].nombre_animal)+"";
                const div_inner=document.createElement('div');       
                div_inner.className="innercard";
                const div_primary=document.createElement('div');
                div_primary.className='primarydata';
                const div_left=document.createElement('dataleft');
                div_left.className='dataleft'
                    const animal=document.createElement('h3')
                    animal.innerHTML='Animal: ';
                    const raza=document.createElement('h3');
                    raza.innerHTML='Raza: ';
                    const edad=document.createElement('h3');
                    edad.innerHTML='Edad: ';
                    const peso=document.createElement('h3');
                    peso.innerHTML='Peso: ';
                    const sexo=document.createElement('h3');
                    sexo.innerHTML='Sexo: ';
                const div_right=document.createElement('div');
                div_right.className='dataright';
                    const animaldata=document.createElement('p')
                    animaldata.innerHTML=""+animals[i].especie_a+"";
                    const razadata=document.createElement('p');
                    razadata.innerHTML=""+animals[i].raza_a+"";
                    const edadData=document.createElement('p');
                    edadData.innerHTML=""+animals[i].edad+"";
                    const pesoData=document.createElement('p');
                    pesoData.innerHTML=""+animals[i].peso_a+""
                    const sexoData=document.createElement('p');
                    sexoData.innerHTML=""+animals[i].sexo_a+"";
                    //
                const div_data=document.createElement('div');
                    div_data.className='descdata'
                    const desc=document.createElement('h3');
                    desc.innerHTML='Informacion adicional';
                    const info=document.createElement('p');
                    info.innerHTML=""+animals[i].info_adicional_a+""
                const boton=document.createElement('button');
                boton.className='btn';
                boton.innerHTML='Historial medico'
            desc.appendChild(info);
            div_data.appendChild(boton);
            div_data.appendChild(desc);
            //
            div_right.appendChild(sexoData);
            div_right.appendChild(pesoData);
            div_right.appendChild(edadData);
            div_right.appendChild(razadata);
            div_right.appendChild(animaldata);
            //
            div_left.appendChild(sexo);
            div_left.appendChild(peso);
            div_left.appendChild(edad);
            div_left.appendChild(raza);
            div_left.appendChild(animal);
            //
            div_primary.appendChild(div_left);
            div_primary.appendChild(div_right);
            //
            div_inner.appendChild(div_primary);
            div_inner.appendChild(div_data);
            div_inner.appendChild(boton);
            //
            card.appendChild(h2);
            card.appendChild(div_inner);
        }
        div_pets.appendChild(hed_mas);
        div_pets.appendChild(boton_mascota);
        div_pets.appendChild(card);

        div_usr_an.appendChild(welcom);
        div_usr_an.appendChild(div_pets);

        const longcit=citas.length;

        console.log(longcit);

        for(let j=0;j<=longcit;j++){
            //console.log('Si entro')
            const xd=animals[j].id_animal
            const anima=citas.find(an=>an.fk_animal===xd)
            console.log(anima)
            const card=document.getElementById('citas_card');
                const div_icard=document.createElement('div');
                div_icard.className='innercard';
                    const div_pc=document.createElement('div');
                    div_pc.className='primarydata';
                    div_pc.style='flex-direction: column; height: auto;';
                        const h3=document.createElement('h3');
                        h3.style='color: #004E71';
                        h3.innerHTML='Mascota: ';
                        const p_mascota=document.createElement('p');
                        //p_mascota.innerHTML=
        }

    }catch(err){
        console.log(err)
            //window.location.href="/"
    }
})

function xc(msg){
    console.log(msg);
}