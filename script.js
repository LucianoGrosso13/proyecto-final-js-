let puntos = 0;
let intentos = 3;
let indicePregunta = 0;
let dif = " ";
let msjIntentos = 0;

dificultadFacil = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="facil";
})
dificultadFacil.sort(()=> Math.random()-0.5);

dificultadMedia = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="media";
})
dificultadMedia.sort(()=> Math.random()-0.5);

dificultadDificil = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="dificil";
})
dificultadDificil.sort(()=> Math.random()-0.5);

const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");

const selectDificultad = document.getElementById("dificultad");


// Funciones

//carga la pregunta, y desordena las opciones 
function cargarPregunta(i,vectorDificultad){
    
    //guardo la opcion correcta en una variable para poder usarla en la funcion de elegir opcciones
    objetoCorrecta = vectorDificultad[i].correcta

    opciones = [...vectorDificultad[i].incorrecta];

    opciones.push(vectorDificultad[i].correcta);

    opciones.sort(()=> Math.random()-0.5)

    document.getElementById("pregunta").innerHTML = vectorDificultad[i].pregunta;
    document.getElementById("opcion1").innerHTML = opciones[0];
    document.getElementById("opcion2").innerHTML = opciones[1];
    document.getElementById("opcion3").innerHTML = opciones[2];
    document.getElementById("opcion4").innerHTML = opciones[3];

}

// inicializa el juego con la dificultad elegida
function seleccionarDificultad(vectorDificultad,dificultadValue,dificultadCategoria){

    //carga las preguntas
    for(let i=0;  i<14; i++){
        cargarPregunta(i,vectorDificultad)
    }
}


// //funcion para que te diga si la opcion es correcta o incorrecta
function elegirOpcion(i){
    validezRespuesta = opciones[i] == objetoCorrecta;

    let dif =" "

    let resultado = " "


    if(validezRespuesta){
        puntos+=1;
        console.log(`tus puntos son ${puntos}`);
        Swal.fire({
            title: " Respuesta Correcta",
            text: "La respuesta es correcta",
            icon: "success",
        }); 
    } else{
        console.log(intentos)
        intentos-=1
        console.log(`te quedan ${intentos} intentos`)
        Swal.fire({
            title: " Respuesta Incorrecta",
            text: `La respuesta correcta es "${objetoCorrecta}" `,
            icon: "error",
        });
    }
         
    switch (selectDificultad.value){
        case "Facil":
            console.log(`indice de pregunta ${indicePregunta}`)
            cargarPregunta(indicePregunta,dificultadFacil)
            indicePregunta+=1;
            dif = "facil"
            break;
        case "Media":
            console.log(`indice de pregunta ${indicePregunta}`)
            cargarPregunta(indicePregunta,dificultadMedia)
            indicePregunta+=1;
            dif = "media"
            break;
        case "Dificil":
            console.log(`indice de pregunta ${indicePregunta}`)
            cargarPregunta(indicePregunta,dificultadDificil)
            indicePregunta+=1;
            dif = "dificil"
            break;
    }
    msjIntentos=intentos;

    if(puntos===5){
        resultado = "ganaste"
        console.log(resultado)
        Swal.fire({
            title: `Ganaste la dificultad ${selectDificultad.value}, felicidades!`,
            text: `Te quedaban ${intentos} intentos`,
        });
        paso1.className=""
        paso2.className="noMostrar"
        selectDificultad.value = " "
        puntos = 0
        intentos = 3
    }
    if(intentos===0){
        resultado = "perdiste"
        console.log(resultado)
        Swal.fire({
            title: `Perdiste la dificultad ${selectDificultad.value}, espero que lo reintentes!`,
            text: `Te quedaste sin intentos`,
        });
        paso1.className=""
        paso2.className="noMostrar"
        selectDificultad.value = " "
        puntos = 0
        intentos = 3
    }       
    //guardo el resultado de tu ultima partida para luego mostrarte
    localStorage.setItem("resultado:",resultado);
    
    localStorage.setItem("dificultad:",dif);
            
    //muestro la dificultad de tu ultima partida y su resultado
    let textoUltimaPartida = document.getElementById("ultimapartida")
    textoUltimaPartida.innerHTML = `Tu ultima partida fue en la dificultad ${dif} y ${resultado} la partida con ${msjIntentos} intentos restantes`
}


// codigo para pasar de la dificultad a las preguntas del juego

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
            seleccionarDificultad(dificultadFacil,"Facil","facil");
            break;
        case "Media":
            seleccionarDificultad(dificultadMedia,"Media","media");
            break;
        case "Dificil":
            seleccionarDificultad(dificultadDificil,"Dificil","dificil");
            break;
    }

});

const BotonValoracion = document.getElementById("btnValoracion")

const contenedor = document.getElementById("contenedorBtnVlarocaion");

function enviarValoracion(mensaje){
    return new Promise( (resolve, reject) =>{
        if(mensaje !== " "){
            resolve("valoracion enviada con exito");
        }else {
            reject("error")
        }
    });
}

BotonValoracion.onclick = async() =>{
    const {value: valoracion }= await Swal.fire({
        input: 'text',
        inputLabel: 'Escribe tu valoración',
    }) 
    if(valoracion){
        Swal.fire({
            text:`Gracias por valorarme!`,
            icon: `success`
        })
    }
    enviarValoracion(valoracion).then( (mensaje)=>{
        contenedor.innerHTML = `<strong style="color: green">${mensaje}</strong>`
        BotonValoracion.style.display = "none"
    }).catch( (errorFormulario)=>{
        contenedor.innerHTML = `<strong style="color: red">${errorFormulario}</strong>
        input.value = " "`;
    });
}