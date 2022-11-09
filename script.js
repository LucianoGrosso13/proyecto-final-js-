let puntos = 0;
let intentos = 3;
let indicePregunta = 0;
let dif = " ";
let resultado = " ";

//leo mi archivo json
fetch("base_de_preguntas.json")
.then((response) => {
    return response.json()
})
.then((preguntas =>{


    // defino cada vector dificultad para luego poder cargar el juego dependiendo la dificultad seleccionada
    dificultadFacil = preguntas.filter((preguntas) => {
        return preguntas.categoria==="facil";
    })
    //mezclo el vector para que cada vez que entre a la pagina el orden de las preguntas no sea el mismo
    dificultadFacil.sort(()=> Math.random()-0.5);

    dificultadMedia = preguntas.filter((preguntas) => {
        return preguntas.categoria==="media";
    })
    dificultadMedia.sort(()=> Math.random()-0.5);

    dificultadDificil = preguntas.filter((preguntas) => {
        return preguntas.categoria==="dificil";
    })
    dificultadDificil.sort(()=> Math.random()-0.5);

}))

// funcion para mezcla el vector cuando se quiera volver a jugar ya habiendo terminado una partida, asi sea aleatorio nuevamente el orden de las preguntas
function mezclar(vectorDificultad){
    vectorDificultad.sort(()=>Math.random()-0.5);
}

//carga la pregunta, y desordena las opciones 
function cargarPregunta(i,vectorDificultad){
    
    //guardo la opcion correcta en una variable para poder usarla en la funcion de elegir opcciones
    objetoCorrecta = vectorDificultad[i].correcta

    //hago un vector con las opcciones y lo desordeno
    opciones = [...vectorDificultad[i].incorrecta];

    opciones.push(vectorDificultad[i].correcta);

    opciones.sort(()=> Math.random()-0.5)

    //obtengo los id de los botones y le asigno las opciones a cada boton
    document.getElementById("pregunta").innerHTML = vectorDificultad[i].pregunta;
    document.getElementById("opcion1").innerHTML = opciones[0];
    document.getElementById("opcion2").innerHTML = opciones[1];
    document.getElementById("opcion3").innerHTML = opciones[2];
    document.getElementById("opcion4").innerHTML = opciones[3];

}

// inicializa el juego con la dificultad elegida
function seleccionarDificultad(vectorDificultad){

    //carga las preguntas
    for(let i=0;  i<1; i++){
        cargarPregunta(i,vectorDificultad)
    }
}


// //funcion para que te diga si la opcion es correcta o incorrecta, al alcanzar los puntos requeridos termina el juego
function elegirOpcion(i){
    validezRespuesta = opciones[i] == objetoCorrecta;

    if(validezRespuesta){
        indicePregunta+=1;
        puntos+=1;
        Swal.fire({
            title: " Respuesta Correcta",
            text: "La respuesta es correcta",
            icon: "success",
        }); 
    } else{
        indicePregunta+=1;
        intentos-=1
        Swal.fire({
            title: " Respuesta Incorrecta",
            text: `La respuesta correcta es "${objetoCorrecta}" `,
            icon: "error",
        });
    }

    //sirve para ver que dificultad se eligio asi comience a cargar el vector de dicha dificultad
    switch (selectDificultad.value){
        case "Facil":
            cargarPregunta(indicePregunta,dificultadFacil)
            dif = "facil"
            break;
        case "Media":
            cargarPregunta(indicePregunta,dificultadMedia)
            dif = "media"
            break;
        case "Dificil":
            cargarPregunta(indicePregunta,dificultadDificil)
            dif = "dificil"
            break;
    }

    if(puntos===5){
        resultado = "ganaste"
        Swal.fire({
            title: `Ganaste la dificultad ${selectDificultad.value}, felicidades!`,
            text: `Te quedaba ${intentos} intentos`,
        });
        // vuelve a mostrarte la ventana inicial para elegir la dificultad y que puedas volver a inicar el juego
        paso1.className=""
        paso2.className="noMostrar"
        selectDificultad.value = " "
        //pongo las variables a su valor original para que se pueda volver a jugar
        puntos = 0
        intentos = 3
        indicePregunta=0
        //desordeno nuevamente los vectores asi no sea igual que la vez anterior
        mezclar(dificultadFacil)
        mezclar(dificultadMedia)
        mezclar(dificultadDificil)
    }
    if(intentos===0){
        resultado = "perdiste"
        Swal.fire({
            title: `Perdiste la dificultad ${selectDificultad.value}, espero que lo reintentes!`,
            text: `Te quedaste sin intentos`,
        });
        paso1.className=""
        paso2.className="noMostrar"
        selectDificultad.value = " "
        puntos = 0
        intentos = 3
        indicePregunta=0
        mezclar(dificultadFacil)
        mezclar(dificultadMedia)
        mezclar(dificultadDificil)
    }       

    //guardo el resultado de tu partida
    localStorage.setItem("resultado:",resultado);
    
    //creo el texto con la info de tu ultima partida asi se muestre al terminarla
    textoUltimaPartida.innerHTML = `Tu ultima partida fue en la dificultad ${dif} y ${resultado} la partida.`;
    
}

// codigo para pasar de la ventana de inicio a las preguntas

const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");

const selectDificultad = document.getElementById("dificultad");

selectDificultad.addEventListener("change", () => {

    if(selectDificultad.value !== "") {

        paso1.className = "noMostrar";
        paso2.className = "";
    }

});

// segun la dificultad elegida en el select comienza a mostrar las preguntas
selectDificultad.addEventListener("change", () => {
    
    switch (selectDificultad.value){
        case "Facil":
            seleccionarDificultad(dificultadFacil);
            dif = "facil"
            break;
        case "Media":
            seleccionarDificultad(dificultadMedia);
            dif = "media"
            break;
        case "Dificil":
            seleccionarDificultad(dificultadDificil);
            dif = "dificil"
            break;
    }
    //guardo la dificultad elegida
    localStorage.setItem("dificultad:",dif);


});


//tomo el id del elemento html en donde va a aparecer el msj
const textoUltimaPartida = document.getElementById("ultimapartida");

//creo el mensaje usando los datos del storage
textoUltimaPartida.innerHTML = `Tu ultima partida fue en la dificultad ${localStorage.getItem("dificultad:")} y ${resultado = localStorage.getItem("resultado:")} la partida.`;

//variable para el btn de valoracion
const BotonValoracion = document.getElementById("btnValoracion")

const contenedor = document.getElementById("contenedorBtnVlarocaion");

//funcion para ver si el input tiene algo escrito
function enviarValoracion(mensaje){
    return new Promise( (resolve, reject) =>{
        if(mensaje !== ""){
            resolve("valoracion enviada con exito");
        }else {
            reject(Swal.fire({
                text: `la valoracion esta vacia.`,
                icon: `error`
            }))
        }
    });
}

BotonValoracion.onclick = async() =>{
    const {value: valoracion }= await Swal.fire({
        input: 'text',
        inputLabel: 'Escribe tu valoración',
    }) 
    if(valoracion !== ""){
        Swal.fire({
            text:`Gracias por valorarme!`,
            icon: `success`
        })
    }
    enviarValoracion(valoracion).then( (mensaje)=>{
        contenedor.innerHTML = `<strong">${mensaje}</strong>`
        console.log(valoracion)
        BotonValoracion.style.display = "none"
    })
}
