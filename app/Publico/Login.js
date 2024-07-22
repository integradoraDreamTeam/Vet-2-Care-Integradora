document.getElementById('login-form').addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email=e.target.children.emailab.children.email.value;
    const pass=e.target.children.passlab.children.pass.value;
    const res=await fetch("http://localhost:4500/api/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email,pass
        })
    });
    if(!res.ok) return;
    const resJson= await res.json();
    if(resJson.redirect){
        window.location.href=resJson.redirect;
    }
})