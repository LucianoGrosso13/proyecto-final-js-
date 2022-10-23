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

// codigo para pasar de la dificultad a las preguntas del juego
const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");

const selectDificultad = document.getElementById("dificultad");

selectDificultad.addEventListener("change", () => {

    if(selectDificultad.value !== "") {

        paso1.className = "noMostrar";
        paso2.className = "";
    }

});
//

// Funciones

//carga la pregunta, y desordena las opciones 
function cargarPregunta(i,vectorDificultad){
    let objetoPregunta = vectorDificultad[i].pregunta;
    let opciones = [...vectorDificultad[i].incorrecta];
    opciones.push(vectorDificultad[i].correcta);
    opciones.sort(()=> Math.random()-0.5)
    document.getElementById("pregunta").innerHTML = objetoPregunta;
    document.getElementById("opcion1").innerHTML = opciones[0];
    document.getElementById("opcion2").innerHTML = opciones[1];
    document.getElementById("opcion3").innerHTML = opciones[2];
    document.getElementById("opcion4").innerHTML = opciones[3];

}

// inicializa el juego con la dificultad elegida
function seleccionarDificultad(vectorDificultad,dificultadValue,dificultadCategoria){
        //crea el vector de la dificultad elegida
        if(selectDificultad.value == dificultadValue){
            const vectorDificultad = listaPreguntas.filter( (listaPreguntas) => {
                return listaPreguntas.categoria===dificultadCategoria;
            })
            //desordeno el vector de preguntas
            vectorDificultad.sort(()=> Math.random()-0.5);
            console.log(vectorDificultad);
    
            //carga las preguntas
            for(let i=0; i<vectorDificultad.length; i++){
                cargarPregunta(i,vectorDificultad);
            }
        }
}
selectDificultad.addEventListener("change", () => {
    const dificultadFacil=0;
    const dificultadMedia=0;
    const dificultadDificil=0;


    seleccionarDificultad(dificultadFacil,"Facil","facil");
    seleccionarDificultad(dificultadMedia,"Media","media");
    seleccionarDificultad(dificultadDificil,"Dificil","dificil");



});





