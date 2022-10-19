// const listaPreguntas = [
//     {
//         categoria: "facil",
//         pregunta: "cual es la capital de portugal: ",
//         respuesta: "lisboa",
//     },
//     {
//         categoria: "facil",
//         pregunta: "cual es la capital de argentina: ",
//         respuesta: "buenos aires",
//     },
//     {
//         categoria: "media",
//         pregunta: "cual es la capital de noruega: ",
//         respuesta: "oslo",
//     },
//     {
//         categoria: "media",
//         pregunta: "cual es la capital de finlandia: ",
//         respuesta: "helsinki",
//     },
//     {
//         categoria: "dificil",
//         pregunta: "cual es la capital de nigeria: ",
//         respuesta: "lagos",
//     },
//     {
//         categoria: "dificil",
//         pregunta: "cual es la capital de mozambike: ",
//         respuesta: "maputo",
//     }
// ]

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

const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");

const selectDificultad = document.getElementById("dificultad");

selectDificultad.addEventListener("change", () => {

    if(selectDificultad.value !== "") {

        paso1.className = "noMostrar";
        paso2.className = "";
    }

});

