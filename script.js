// const eleccionDificultad = prompt("ingrese la dificultad de las preguntas: ");
// let puntos=0;
// let intentos=3;
// let mensaje=0;

// switch(eleccionDificultad){
//     case "facil!":
//         mensaje = "facil";
//         const dificultadFacil = listaPreguntas.filter( (listaPreguntas) => {
//             return listaPreguntas.categoria==="facil";
//         })
//         console.log(dificultadFacil);
//         mostrarPreguntasDificultad(puntos,intentos,dificultadFacil);
//         break;
//     case "media":
//         mensaje = "media!";
//         const dificultadMedia = listaPreguntas.filter ( (listaPreguntas)=> {
//             return listaPreguntas.categoria==="media";
//         } )
//         console.log(dificultadMedia);
//         mostrarPreguntasDificultad(puntos,intentos,dificultadMedia);
//         break;
//     case "dificil":
//         mensaje = "dificil!";
//         const dificultadDificil = listaPreguntas.filter ( (listaPreguntas)=> {
//             return listaPreguntas.categoria==="dificil";
//         } )
//         console.log(dificultadDificil);
//         mostrarPreguntasDificultad(puntos,intentos,dificultadDificil);
//         break;    
// }

// //funcion para filtrar la lista de preguntas segun la dificultad y avisar si ganas o perdes
// function mostrarPreguntasDificultad(puntos,intentos,vectorDificultad){
//     while(intentos>0 && puntos<vectorDificultad.length){
//         for(let i=0 ; i<vectorDificultad.length; i++){
//             const respuesta1 = prompt(vectorDificultad[i].pregunta)
//             if(respuesta1===vectorDificultad[i].respuesta){
//                 puntos++;
//                 console.log("puntos:"+puntos);
//                 if(intentos===0){
//                     break;
//                 }
//             }else{ 
//                 intentos--;
//                 console.log("intentos:"+intentos);
//                 if(intentos===0){
//                     break;
//                 }
//             }
//         }
//     }
//     if(puntos===vectorDificultad.length){
//         alert(" Felicidades, ganaste la dificultad" + " " + mensaje);
//     }
//     if (intentos===0){
//         alert("perdiste el juego, espero que lo reintentes");
//     }
// }

// variables

let puntos = 0;
let intentos = 3;
let indicePregunta = 0;

dificultadFacil = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="facil";
})

dificultadMedia = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="media";
})

dificultadDificil = listaPreguntas.filter( (listaPreguntas) => {
    return listaPreguntas.categoria==="dificil";
})

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
        //crea el vector de la dificultad elegida
        if(selectDificultad.value == dificultadValue){
            vectorDificultad = listaPreguntas.filter( (listaPreguntas) => {
                return listaPreguntas.categoria===dificultadCategoria;
            })
            //desordeno el vector de preguntas
            vectorDificultad.sort(()=> Math.random()-0.5);
            console.log(vectorDificultad);
        }
        //carga las preguntas
        for(let i=0; i<3; i++){
            cargarPregunta(i,vectorDificultad)
        }
}

// //funcion para que te diga si la opcion es correcta o incorrecta
function elegirOpcion(i){
    validezRespuesta = opciones[i] == objetoCorrecta;

    if(validezRespuesta){
        puntos+=1;
        console.log(`tus puntos son ${puntos}`);
        Swal.fire({
            title: " Respuesta Correcta",
            text: "La respuesta es correcta",
            icon: "success",
            timer: 1000,
            showConfirmButton: false
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
            break;
        case "Media":
            console.log(`indice de pregunta ${indicePregunta}`)
            cargarPregunta(indicePregunta,dificultadMedia)
            indicePregunta+=1;
            break;
        case "Dificil":
            console.log(`indice de pregunta ${indicePregunta}`)
            cargarPregunta(indicePregunta,dificultadDificil)
            indicePregunta+=1;
            break;
    }

    if(puntos===10){
        Swal.fire({
            title: `Ganaste la dificultad ${selectDificultad.value}, felicidades!`,
            text: `Te quedaban ${intentos} intentos`,
        }); 
    }
    if(intentos===0){
        Swal.fire({
            title: `Perdiste la dificultad ${selectDificultad.value}, espero que lo reintentes!`,
            text: `Te quedaste sin intentos`,
        });
    }
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











