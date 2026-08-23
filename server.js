// server.js
//
// Este es el PUNTO DE ENTRADA de toda la aplicacion: es el archivo que se ejecuta
// para levantar el servidor web. Cuando corres "npm start", Node ejecuta este archivo.
//
// Que hace este servidor:
//  1. Sirve la pagina principal (lista de tareas) como archivos estaticos (carpeta "public").
//  2. Sirve una pagina de "Resumen" generada dinamicamente en el servidor (carpeta "views").
//  3. Expone una API (rutas que empiezan en /api/tareas) para crear, listar,
//     actualizar y eliminar tareas desde el navegador.

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rutasTareas = require('./routes/tareas');
const rutaResumen = require('./routes/resumen');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Le indicamos a Express que use EJS como "motor de plantillas" para poder
// generar paginas HTML dinamicas (con datos que cambian) en el servidor.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware que interpreta el contenido (body) de las peticiones que llegan
// en formato JSON, para poder leer los datos que envia el formulario del navegador.
app.use(bodyParser.json());

// Sirve los archivos estaticos del frontend: HTML, CSS y JS que corren en el navegador.
app.use(express.static(path.join(__dirname, 'public')));

// Sirve la libreria jQuery directamente desde node_modules, para no depender
// de una conexion a internet ni de servicios externos (la demo funciona sin conexion).
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Rutas de la API para gestionar tareas (crear, listar, marcar como completada, eliminar).
app.use('/api/tareas', rutasTareas);

// Ruta que muestra el resumen de tareas agrupadas por prioridad.
app.use('/resumen', rutaResumen);

app.listen(PUERTO, () => {
  console.log(`Servidor de Gestor de Tareas escuchando en http://localhost:${PUERTO}`);
});
