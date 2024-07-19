document.getElementById("userForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    //console.log(e)
    const res=await fetch("http://localhost:4500/api/registrer",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: e.target.children.namelab.children.name.value,
            email: e.target.children.emailab.children.email.value,
            password: e.target.children.passlab.children.pass.value,
        })
    });
    if(!res.ok) return;
    const resJson= await res.json();
    if(resJson.redirect){
        window.location.href=resJson.redirect;
    }
})

//const btnSignIn = document.getElementById("sign-in"),
//    btnSignUp = document.getElementById("sign-up"),
//    formLogin = document.querySelector(".logIn"),
//    formRegister = document.querySelector(".register");
    //registerBtn = document.getElementById("register-btn");

//btnSignUp.addEventListener("click", e => {
    //formLogin.classList.add("hide");
    //formRegister.classList.remove("hide");
//});

//btnSignIn.addEventListener("click", e => {
    //formRegister.classList.add("hide");
    //formLogin.classList.remove("hide");
//});
