
document.addEventListener('DOMContentLoaded',async ()=>{


const cerrar_dialog=document.getElementById("cerrar_alertaa")

    cerrar_dialog.addEventListener("click", () => {
      
      modal.close(); // Asegúrate de que el método es correcto para cerrar el diálogo
      window.location.href = '/registromascotas';

      
    });
    
     function abrir_alertaM() {
        if (modal) {
            modal.showModal();
        }
    }


  try {
    const cookieJWT= document.cookie.split("; ").find(cookie=>cookie.startsWith("jwt=")).slice(4);
    //console.log('cookie')
    console.log(cookieJWT)
    const cokDecrypt=await fetch('http://localhost:4500/api/revisarCookie',{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            cookie: cookieJWT
        })
      })
      //console.log(cokDecrypt)
      const answer = await cokDecrypt.json();
      console.log('ans')
      console.log(answer.id_usuario);

      const response = await fetch('http://localhost:4500/api/extrinfoanimales',{
        method:"POST",
          headers:{
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
              id: answer.id_usuario
          })
      });
      console.log
      if (!response.ok) return; // Salir si hay un error
  
      const data = await response.json();
      console.log(data)
  
      if (data.length === 0) {
          console.log('No se encontraron animales');
      } else {
          console.log('Datos recibidos:', data);
      }
      // Se insertan en las opciones del form, los animales disponibles
      const formCita = document.getElementById('MascotaA');
      data.forEach(breed => {
          const opcion = document.createElement("option");
          opcion.value = breed.id_animal;
          opcion.textContent = breed.nombre_animal;
          formCita.appendChild(opcion);
    })
  }catch (error) {
    console.log(error)
  }
 

  const modal = document.getElementById("modal_container");

    const fechaT=document.getElementById('fechaRcita');

    
    fechaT.addEventListener('change', (event) => {
      const fechaTent={fecha: event.target.value};
      
      fetch('http://localhost:4500/llegafecha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(fechaTent)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Verifica que el elemento existe
      const selectElement = document.getElementById('horaRcita');
     
        data.forEach(item => {
          const option = document.createElement('option');
          option.value = item.hora_cita_disponible; // Asegúrate de que `id_cita` es el nombre correcto del atributo
          option.textContent = item.hora_cita_disponible;
            console.log(item.hora_cita_disponible)
          selectElement.appendChild(option);
        });
    
    
    })
    .catch(error => console.error('Error:', error));

    })
    
    

})
