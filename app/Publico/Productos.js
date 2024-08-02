document.addEventListener('DOMContentLoaded',async ()=>{ 
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');   
    console.log(nombre)
    const res=await fetch("http://localhost:4500/api/getData",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: nombre
        })
    });
    if(!res.ok) return;
    const resJson= await res.json();
    const prod=resJson.find(usr=>usr.nombre_producto===nombre)
    console.log(prod)
    //Informacion del producto
    const contenedor=document.getElementById('cont_main');
        const div_prod=document.createElement('div');
        div_prod.style='align-items: start; justify-content: start; flex-direction: column; width: 35vw;';
        div_prod.className='main-product-img';
        const h2=document.createElement('h2');
        h2.innerHTML=prod.nombre_producto;
        const h3=document.createElement('h3');
        h3.innerHTML=prod.descripcion_breve;
        const precioH2=document.createElement('h2');
        precioH2.innerHTML=prod.precio;
        const h4=document.createElement('h4');
        h4.innerHTML=prod.descripcion;
        const button=document.createElement('button');
        button.className="btn";
        button.innerHTML="Comprar";
        h4.appendChild(button);
        precioH2.appendChild(h4);
        h3.appendChild(precioH2);
        h2.appendChild(h3);
        div_prod.appendChild(h2);
    //Foto del producto
        const div_img=document.createElement('div');
        div_img.className='main-product-img';
        const img=document.createElement('img');
        img.src=nombre+'.png';
        div_img.appendChild(img);
    //Creacion de todo
        contenedor.append(div_img);
        contenedor.append(div_prod);
});