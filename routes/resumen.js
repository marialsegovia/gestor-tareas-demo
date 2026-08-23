// routes/resumen.js
//
// Genera la pagina de "Resumen": agrupa las tareas por prioridad, formatea
// las fechas de vencimiento en un formato legible en espanol, y busca una
// frase motivacional para mostrar arriba de todo.
//
// A diferencia de la pagina principal (que se dibuja en el navegador con
// JavaScript), esta pagina se genera completamente en el servidor usando
// una plantilla EJS (ver views/resumen.ejs).

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');

const almacenTareas = require('../data/tareas');
const { obtenerFraseDelDia } = require('../utils/frase');

router.get('/', async (req, res) => {
  const tareas = almacenTareas.obtenerTodas();

  // Le agregamos a cada tarea una version legible de su fecha de vencimiento.
  const tareasConFechaLegible = tareas.map((tarea) => ({
    ...tarea,
    vencimientoLegible: moment(tarea.vencimiento).format('D [de] MMMM [de] YYYY'),
  }));

  // Agrupamos las tareas por prioridad (alta / media / baja) para mostrarlas organizadas.
  const porPrioridad = _.groupBy(tareasConFechaLegible, 'prioridad');

  const frase = await obtenerFraseDelDia();

  res.render('resumen', {
    porPrioridad,
    totalTareas: tareas.length,
    totalCompletadas: tareas.filter((tarea) => tarea.completada).length,
    frase,
  });
});

module.exports = router;
