async function rellenar(event){
    nombre=event.target.id
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
    const contenedor=document.getElementById('container');
        const h2=document.createElement('h2');
        h2.innerHTML=resJson.nombre_producto;
        const h3=document.createElement('h3');
        h3.innerHTML=resJson.descripcion_breve;
        const precioH2=document.createElement('h2');
        precioH2.innerHTML=resJson.precio;
        const h4=document.createElement('h4');
        h4.innerHTML=resJson.descripcion;
        const button=document.createElement('button');
        button.className="btn";
        button.innerHTML="Comprar";
        h4.appendChild(button);
        precioH2.appendChild(h4);
        h3.appendChild(precioH2);
        h2.appendChild(h3);
        contenedor.appendChild(h2);
}