/*
 * lib2.js
 *
 * Define funciones para interactuar con el lienzo.  La función
 * exhibirLineas dibuja líneas diagonales que van de la esquina superior
 * izquierda hacia la parte inferior derecha del lienzo en saltos de 10 px.
 */

// Obtiene el elemento canvas y su contexto 2D una vez que el documento se ha
// cargado.  Utilizamos let para que las variables sean de bloque.
const lienzo = document.getElementById('lienzo');
const cd = lienzo.getContext('2d');

// Dibuja una serie de líneas a intervalos de 10 píxeles.  La función se
// invoca cuando el usuario hace clic en el enlace «Exhibir líneas».
function exhibirLineas() {
  let x = 0;
  while (x < 400) {
    cd.moveTo(x, 0);
    cd.lineTo(400, 300 - x);
    cd.stroke();
    x = x + 10;
  }
}