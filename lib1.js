/*
 * lib1.js
 *
 * Este módulo obtiene los parámetros de la URL (n y d) y utiliza la
 * biblioteca QuickChart.io para generar un diagrama circular. El diagrama
 * muestra 'd' sectores y etiqueta 'n' de ellos.
 */

// Extrae los parámetros de la cadena de consulta.
const params = new URLSearchParams(window.location.search);
const n = parseInt(params.get('n'));
const d = parseInt(params.get('d'));

// Clase que crea el código fuente de la gráfica aprovechando QuickChart
class Quickchart {
  // El constructor ahora acepta tanto 'n' como 'd'.
  constructor(n, d) {
    this.n = n;
    this.d = d;
  }

  // Construye una cadena con d repeticiones de «1,».
  crearCadunos() {
    let cadunos = '1,'.repeat(this.d);
    // Elimina la coma final
    return cadunos.slice(0, -1);
  }

  // Crea la cadena de etiquetas para cada sector.
  crearEtiquetas() {
    const etiquetas = [];
    const etiquetaTexto = `1/${this.d}`;

    for (let i = 0; i < this.d; i++) {
      // Si el índice es menor que 'n', añade la etiqueta.
      if (i < this.n) {
        etiquetas.push(etiquetaTexto);
      } else {
        // De lo contrario, añade una etiqueta vacía.
        etiquetas.push('');
      }
    }
    // Une las etiquetas con '|' ej: "1/5|1/5|||"
    return etiquetas.join('|');
  }

  // Genera la URL final usando el método de etiquetas y codificándola.
  generarSrcImg() {
    const datos = this.crearCadunos();
    const etiquetas = this.crearEtiquetas(); // Llama al nuevo método

    const url =
      'https://quickchart.io/chart?cht=p3&chd=t:' +
      datos +
      '&chs=500x250&chl=' +
      encodeURIComponent(etiquetas); // Se codifican los caracteres especiales
    return url;
  }
}

// Se pasan ambos parámetros 'n' y 'd' al crear la instancia.
if (!isNaN(n) && !isNaN(d) && d > 0) {
  const q = new Quickchart(n, d);
  const contenedor = document.getElementById('contenido');
  contenedor.innerHTML = '<img src="' + q.generarSrcImg() + '" alt="Gráfica de fracción" />';
}