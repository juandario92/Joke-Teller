
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Boton Visible/Invisible
function toggleButton() {
    button.disabled = !button.disabled;
  };

// Eviando chiste a VoiceRss API

function tellMe(joke){
    VoiceRSS.speech({
        key: 'Inserte su clave api aqui',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Obtener Chistes de Joke API
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Any";
    try {
        // Creamos la constante response que se va a encargar de ir a la url
        const response = await fetch(apiUrl);
        // La constante "data", se crea esperando que "response" pueda devolvernos los datos de la url en formato .json
        const data = await response.json();

        if(data.setup){
            // Si existe un chiste de dos partes, "joke" va a ser igual a las dos partes 
            joke = `${data.setup}... ${data.delivery}`;
        } else {
            // Si no existe chiste de dos partes, y solo de una parte, "joke" va a ser igual a el chiste.
            joke = data.joke;
        }
        // Texto a Voz
        tellMe(joke);

        // Deshabilitar Boton
        toggleButton();
    }
        
    catch(error){
        // Cath errors here
        console.log(error);
    }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);