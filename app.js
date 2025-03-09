// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar los nombres de los amigos
let amigos = [];
// Variable para rastrear si ya se realizó un sorteo
let sorteoRealizado = false;

// Función para agregar amigos a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Verificar que el nombre no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingresa un nombre');
        return;
    }
    
    // Verificar que el nombre tenga al menos 3 caracteres
    if (nombreAmigo.length < 3) {
        alert('El nombre debe tener al menos 3 caracteres');
        return;
    }
    
    // Verificar que el nombre solo contenga letras y espacios
    if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/.test(nombreAmigo)) {
        alert('El nombre solo debe contener letras');
        return;
    }
    
    // Verificar si el nombre ya existe en la lista (caso insensible)
    if (amigos.some(amigo => amigo.toLowerCase() === nombreAmigo.toLowerCase())) {
        alert('Este amigo ya está en la lista');
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombreAmigo);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Mostrar el botón de limpiar si es el primer amigo añadido
    const botonReiniciar = document.getElementById('botonReiniciar');
    if (amigos.length === 1) {
        botonReiniciar.style.display = 'flex';
        botonReiniciar.innerHTML = `
            <img src="assets/broom_icon.png" alt="Ícono de escoba para limpiar" class="reset-icon">
            <span style="flex: 1; text-align: center;">Limpiar</span>
        `;
    }
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    // Crear elementos de lista para cada amigo
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para sortear un amigo al azar
function sortearAmigo() {
    // Verificar que haya suficientes amigos disponibles (mínimo 3)
    if (amigos.length < 3) {
        alert('Necesitas agregar al menos 3 amigos para realizar el sorteo');
        return;
    }
    
    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    
    // Obtener el amigo sorteado
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Mostrar el resultado
    mostrarResultados(`El amigo secreto sorteado es: ${amigoSorteado}`);
    
    // Si es el primer sorteo, cambiar el texto del botón de sorteo
    if (!sorteoRealizado) {
        const botonSortear = document.querySelector('.button-draw');
        const textoSpan = document.createElement('span');
        textoSpan.textContent = 'Volver a sortear amigo';
        textoSpan.style.flex = '1';
        textoSpan.style.textAlign = 'center';
        
        // Conservar la imagen del botón
        const imgBoton = botonSortear.querySelector('img');
        botonSortear.innerHTML = '';
        botonSortear.appendChild(imgBoton);
        botonSortear.appendChild(textoSpan);
        
        // Cambiar también el texto del botón de reinicio
        const botonReiniciar = document.getElementById('botonReiniciar');
        botonReiniciar.innerHTML = `
            <img src="assets/reset_icon.png" alt="Ícono para reiniciar" class="reset-icon">
            <span style="flex: 1; text-align: center;">Reiniciar</span>
        `;
        
        sorteoRealizado = true;
    }
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(mensaje) {
    const listaResultados = document.getElementById('resultado');
    listaResultados.innerHTML = '';
    
    const li = document.createElement('li');
    li.textContent = mensaje;
    listaResultados.appendChild(li);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar el array de amigos
    amigos = [];
    
    // Limpiar las listas visuales
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    
    // Ocultar el botón de reiniciar
    const botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.style.display = 'none';
    
    // Resetear el estado de sorteo y restaurar el texto original del botón de sorteo
    if (sorteoRealizado) {
        const botonSortear = document.querySelector('.button-draw');
        botonSortear.innerHTML = `
            <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
            <span style="flex: 1; text-align: center;">Sortear amigo</span>
        `;
        sorteoRealizado = false;
    }
    
    // Limpiar y enfocar el campo de entrada
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.value = '';
    inputAmigo.focus();
}
