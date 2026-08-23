// data/tareas.js
//
// Esta es la "capa de datos" de la aplicacion: el unico lugar donde se lee
// y se escribe informacion sobre las tareas.
//
// En una aplicacion real esto normalmente seria una base de datos (por ejemplo
// PostgreSQL o MongoDB). Para esta demo usamos un archivo JSON local
// (data/tareas.json) para que el proyecto sea facil de instalar y correr
// sin necesidad de instalar ni configurar una base de datos aparte.

const fs = require('fs');
const path = require('path');

const RUTA_ARCHIVO = path.join(__dirname, 'tareas.json');

function leerArchivo() {
  const contenido = fs.readFileSync(RUTA_ARCHIVO, 'utf-8');
  return JSON.parse(contenido);
}

function guardarArchivo(tareas) {
  fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(tareas, null, 2));
}

// Devuelve todas las tareas guardadas.
function obtenerTodas() {
  return leerArchivo();
}

// Agrega una tarea nueva y la guarda en el archivo.
function crear(datosTarea) {
  const tareas = leerArchivo();
  const siguienteId = tareas.length ? Math.max(...tareas.map((t) => t.id)) + 1 : 1;
  const nueva = { id: siguienteId, completada: false, ...datosTarea };
  tareas.push(nueva);
  guardarArchivo(tareas);
  return nueva;
}

// Modifica una tarea existente (por ejemplo, para marcarla como completada).
function actualizar(id, cambios) {
  const tareas = leerArchivo();
  const tarea = tareas.find((t) => t.id === Number(id));
  if (!tarea) return null;
  Object.assign(tarea, cambios);
  guardarArchivo(tareas);
  return tarea;
}

// Elimina una tarea por su id.
function eliminar(id) {
  const tareas = leerArchivo();
  const indice = tareas.findIndex((t) => t.id === Number(id));
  if (indice === -1) return false;
  tareas.splice(indice, 1);
  guardarArchivo(tareas);
  return true;
}

module.exports = { obtenerTodas, crear, actualizar, eliminar };
