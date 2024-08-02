document.addEventListener('DOMContentLoaded',async ()=>{ 
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('id');   
    console.log(nombre)
})