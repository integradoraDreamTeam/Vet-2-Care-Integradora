

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
      console.log('Datos recibidos:', data);
    // Se insertan en las opciones del form, los animales disponibles
    const formCita=document.getElementById('MascotaA') 
    data.forEach(breed => {
    const opcion = document.createElement("option");
    opcion.value = breed.id_animal;
    opcion.textContent = breed.nombre_animal;
    formCita.appendChild(opcion);

        });

    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
    });

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
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    })
    const infofechas= fetch('/horasdisponibles')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      // Como le hagoooo
          

          const selectElement = document.getElementById('horaRcita');
         
              data.forEach(breed=> {
                  const option = document.createElement('option');
                  option.value = breed.id;
                  option.textContent = breed.hora_cita_disponible;
                  selectElement.appendChild(option);
              });
          
  });




})
