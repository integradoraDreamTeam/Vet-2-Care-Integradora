document.getElementById('login-form').addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email=e.target.children.emailab.children.email.value;
    const password=e.target.children.passlab.children.pass.value;
    const res=await fetch("https://vet-2-care-integradora.onrender.com",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email,password
        })
    });
    if(!res.ok) return;
    const resJson= await res.json();
    if(resJson.redirect){
        window.location.href=resJson.redirect;
    }
})