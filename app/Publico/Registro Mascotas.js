document.addEventListener('DOMContentLoaded', () => {
    const especie = document.getElementById("EspecieA");
    const raza = document.getElementById("RazaA");

    const breeds = {
        perro: ['Bulldog', 'Labrador', 'Beagle'],
        gato: ['Siamés', 'Persa', 'Maine Coon'],
        hamster: ['Sirio', 'Roborovski', 'Chino'],
        perico: ['Opalino', 'Verde', 'Azul'],
        araña: ['Viuda Negra', 'Tarántula', 'Reclusa Marrón'],
        pez: ['Pez Dorado', 'Betta', 'Guppy']
    };

    especie.addEventListener('change', (event) => {
        const especieSelected = event.target.value;
        const opcionesRaza = breeds[especieSelected] || [];
        raza.innerHTML = '<option hidden>--Razas de animales--</option>';

        opcionesRaza.forEach(breed => {
            const opcion = document.createElement("option");
            opcion.value = breed;
            opcion.textContent = breed;
            raza.appendChild(opcion);
        });
    });


const modal = document.getElementById("modal_container");
const cerrar_modal = document.getElementById("cerrar_alerta");

cerrar_modal.addEventListener("click", () => {
    
    window.location.href = '/registromascotas';
    modal.close();  
});

 function abrir_alertaM() {
    if (modal) {
        modal.showModal();
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/postmascota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJSON)
        });

        if (!response.ok) {
            if (response.status === 400) {
                abrir_alertaM();
            } else {
                console.error('Error en el servidor');
            }
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
});