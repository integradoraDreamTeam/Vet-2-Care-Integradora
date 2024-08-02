

//Comprobacion


document.addEventListener('DOMContentLoaded',async ()=>{
  const modal = document.getElementById("modal_container");
  const cerrar_modal = document.getElementById("cerrar_alertaa");
    
  try {
    const response = await fetch('/extrinfoanimales');
    if (!response.ok) {
        if (response.status === 404) {
          abrir_alertaM();
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
        return; // Salir si hay un error
    }

    const data = await response.json();

    if (data.length === 0) {
        console.log('No se encontraron animales');
    } else {
        console.log('Datos recibidos:', data);

        // Se insertan en las opciones del form, los animales disponibles
        const formCita = document.getElementById('MascotaA');
        data.forEach(breed => {
            const opcion = document.createElement("option");
            opcion.value = breed.id_animal;
            opcion.textContent = breed.nombre_animal;
            formCita.appendChild(opcion);
        });
    }
} catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
}

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
    
    
    cerrar_modal.addEventListener('click', () => {
      window.location.href = ("/");
      console.log(kk)
    });
    
     function abrir_alertaM() {
        if (modal) {
            modal.showModal();
        }
    }

})
