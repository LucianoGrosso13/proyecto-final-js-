const listaPreguntas = [
    {
        categoria: "facil",
        pregunta: "cual es la capital de portugal: ",
        respuesta: "lisboa",
    },
    {
        categoria: "facil",
        pregunta: "cual es la capital de argentina: ",
        respuesta: "buenos aires",
    },
    {
        categoria: "media",
        pregunta: "cual es la capital de noruega: ",
        respuesta: "oslo",
    },
    {
        categoria: "media",
        pregunta: "cual es la capital de finlandia: ",
        respuesta: "helsinki",
    },
    {
        categoria: "dificil",
        pregunta: "cual es la capital de nigeria: ",
        respuesta: "lagos",
    },
    {
        categoria: "dificil",
        pregunta: "cual es la capital de mozambike: ",
        respuesta: "maputo",
    }
]

const eleccionDificultad = prompt("ingrese la dificultad de las preguntas: ");
let puntos=0;
let intentos=3;
let mensaje=0;

switch(eleccionDificultad){
    case "facil!":
        mensaje = "facil";
        const dificultadFacil = listaPreguntas.filter( (listaPreguntas) => {
            return listaPreguntas.categoria==="facil";
        })
        console.log(dificultadFacil);
        mostrarPreguntasDificultad(puntos,intentos,dificultadFacil);
        break;
    case "media":
        mensaje = "media!";
        const dificultadMedia = listaPreguntas.filter ( (listaPreguntas)=> {
            return listaPreguntas.categoria==="media";
        } )
        console.log(dificultadMedia);
        mostrarPreguntasDificultad(puntos,intentos,dificultadMedia);
        break;
    case "dificil":
        mensaje = "dificil!";
        const dificultadDificil = listaPreguntas.filter ( (listaPreguntas)=> {
            return listaPreguntas.categoria==="dificil";
        } )
        console.log(dificultadDificil);
        mostrarPreguntasDificultad(puntos,intentos,dificultadDificil);
        break;    
}

//funcion para filtrar la lista de preguntas segun la dificultad y avisar si ganas o perdes
function mostrarPreguntasDificultad(puntos,intentos,vectorDificultad){
    while(intentos>0 && puntos<vectorDificultad.length){
        for(let i=0 ; i<vectorDificultad.length; i++){
            const respuesta1 = prompt(vectorDificultad[i].pregunta)
            if(respuesta1===vectorDificultad[i].respuesta){
                puntos++;
                console.log("puntos:"+puntos);
                if(intentos===0){
                    break;
                }
            }else{ 
                intentos--;
                console.log("intentos:"+intentos);
                if(intentos===0){
                    break;
                }
            }
        }
    }
    if(puntos===vectorDificultad.length){
        alert(" Felicidades, ganaste la dificultad" + " " + mensaje);
    }
    if (intentos===0){
        alert("perdiste el juego, espero que lo reintentes");
    }
}

// Codigo de la primera preentrega.

// let intentos=3
// let puntos = 0;
// while(intentos>0 && puntos<3){
//     cargarPais("portugal")
//     if(intentos===0){
//         break
//     }
//     cargarPais("italia")
//     if(intentos===0){
//         break
//     }
//     cargarPais("argentina")
//     if(intentos===0){
//         break
//     }
// }
// if(puntos>=3){
//     alert("usted gano el juego")
// }
// function cargarPais (pais){
//     switch(pais){
//         case "portugal":
//         let capital = prompt("ingrese la capital de " + pais)
//         if(capital === "lisboa"){
//             alert("respuesta correcta")
//             puntos++;
//         } else{
//             intentos--;
//             alert("respuesta incorrecta, le quedan " + intentos)
//         }
//         break;
//         case "italia":
//         let capital2 = prompt("ingrese la capital de " + pais)
//         if(capital2 === "roma"){
//             alert("respuesta correcta")
//             puntos++;
//         } else{
//             intentos--;
//             alert("respuesta incorrecta, le quedan " + intentos)
//         }
//         break;
//         case "argentina":
//             let capital3 = prompt("ingrese la capital de " + pais)
//             if(capital3 === "ciudad autonoma de buenos aires"){
//                 alert("respuesta correcta")
//                 puntos++;
//             } else{
//                 intentos--;
//                 alert("respuesta incorrecta, le quedan " + intentos)
//             }
//             break;
//     }
// }


