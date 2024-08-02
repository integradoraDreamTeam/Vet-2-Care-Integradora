document.addEventListener('DOMContentLoaded',async ()=>{ 
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');   
    console.log(id)
    const res=await fetch('http://localhost:4500/api/getHistorial',{
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
    console.log(resJson)
})