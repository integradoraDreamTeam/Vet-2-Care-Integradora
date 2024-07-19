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
});
