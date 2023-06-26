// Obteniendo referencias a los elementos del DOM para el botón y el audio
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Esta función alterna el estado de deshabilitado del botón
function toggleButton() {
    // Cambia el estado del botón a lo contrario de lo que es actualmente
    button.disabled = !button.disabled;
  };

// Esta función toma un chiste como argumento y utiliza la API de VoiceRSS para convertir el texto en voz
function tellMe(joke){
    VoiceRSS.speech({
        key: 'Inserte su clave api aqui',  // tu clave para la API de VoiceRSS
        src: joke,                         // el chiste que se va a convertir en voz
        hl: 'en-us',                       // el idioma/acento en el que se dirá el chiste
        v: 'Linda',                        // la voz que se utilizará
        r: 0,                              // la tasa de discurso (0 es normal)
        c: 'mp3',                          // el formato de codificación del audio
        f: '44khz_16bit_stereo',           // la frecuencia y calidad del audio
        ssml: false                        // indica si se utiliza o no el Lenguaje de marcado de síntesis de voz (SSML)
    });
}

// Esta función asincrónica obtiene un chiste de la Joke API
async function getJokes() {
    let joke = "";                         // inicializa la variable joke
    const apiUrl = "https://v2.jokeapi.dev/joke/Any";   // URL de la API para obtener los chistes
    try {
        // Fetch devuelve una promesa que se resuelve a la Respuesta a la solicitud, sea esta exitosa o no
        const response = await fetch(apiUrl);
        // response.json también devuelve una promesa que se resuelve con el resultado de parsear el cuerpo de la respuesta en texto como JSON.
        const data = await response.json();

        if(data.setup){
            // Si el chiste tiene una parte de 'configuración' y una parte de 'entrega', ambos son concatenados
            joke = `${data.setup}... ${data.delivery}`;
        } else {
            // Si el chiste es de una sola parte, la variable joke toma ese valor
            joke = data.joke;
        }
        // El chiste obtenido se pasa a la función tellMe() para convertirlo en voz
        tellMe(joke);

        // Desactiva el botón
        toggleButton();
    }
        
    catch(error){
        // Si hay algún error durante la ejecución de la solicitud a la API o el procesamiento de los datos, se registra en la consola
        console.log(error);
    }
}

// Agregando event listeners a los botones y elementos de audio
// Cuando se hace click en el botón, se invoca a la función getJokes()
button.addEventListener("click", getJokes);
// Cuando el audio termina de reproducirse, se vuelve a activar el botón
audioElement.addEventListener("ended", toggleButton);