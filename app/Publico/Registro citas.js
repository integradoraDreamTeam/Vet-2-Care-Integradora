

//Comprobacion


document.addEventListener('DOMContentLoaded',()=>{
    //Cambiar por fetch a backend
    const infoA= fetch('/extrinfoanimales')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Asume que la respuesta es JSON
    })
    .then(data => {

    // Se insertan en las opciones del form, los animales disponibles
    const formCita=document.getElementById('MascotaA') 
    data.forEach(breed => {
    const opcion = document.createElement("option");
    opcion.value = breed.nombre_animal;
    opcion.textContent = breed.nombre_animal;
    formCita.appendChild(opcion);

        });

    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
    });

    

   

    
})