// utils/frase.js
//
// Obtiene una frase motivacional desde un servicio publico en internet, para
// mostrarla en la parte superior de la pagina de Resumen.
//
// Si el servicio externo no responde (por ejemplo, si no hay conexion a
// internet en este momento), se usa una frase de una lista de respaldo, para
// que la aplicacion nunca se quede sin funcionar por depender de un tercero.

const axios = require('axios');

const FRASES_DE_RESPALDO = [
  'Un paso pequeno hoy es un gran avance manana.',
  'La organizacion es la clave de la productividad.',
  'Cada tarea completada suma al objetivo final.',
];

async function obtenerFraseDelDia() {
  try {
    const respuesta = await axios.get('https://api.quotable.io/random', { timeout: 2000 });
    return respuesta.data.content;
  } catch (error) {
    const indice = new Date().getDate() % FRASES_DE_RESPALDO.length;
    return FRASES_DE_RESPALDO[indice];
  }
}

module.exports = { obtenerFraseDelDia };
