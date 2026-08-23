// routes/tareas.js
//
// Define la API que usa el navegador para gestionar tareas: listar, crear,
// actualizar (por ejemplo marcar como completada) y eliminar.
//
// El archivo public/app.js (que corre en el navegador) llama a estas rutas
// mediante peticiones AJAX cada vez que el usuario interactua con la pagina.

const express = require('express');
const router = express.Router();
const almacenTareas = require('../data/tareas');

// GET /api/tareas -> devuelve la lista completa de tareas.
router.get('/', (req, res) => {
  res.json(almacenTareas.obtenerTodas());
});

// POST /api/tareas -> crea una tarea nueva con los datos enviados desde el formulario.
router.post('/', (req, res) => {
  const { titulo, prioridad, vencimiento } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El titulo de la tarea es obligatorio.' });
  }

  const nueva = almacenTareas.crear({
    titulo,
    prioridad: prioridad || 'media',
    vencimiento,
  });

  res.status(201).json(nueva);
});

// PUT /api/tareas/:id -> actualiza una tarea existente.
router.put('/:id', (req, res) => {
  const actualizada = almacenTareas.actualizar(req.params.id, req.body);

  if (!actualizada) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  res.json(actualizada);
});

// DELETE /api/tareas/:id -> elimina una tarea.
router.delete('/:id', (req, res) => {
  const eliminada = almacenTareas.eliminar(req.params.id);

  if (!eliminada) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  res.status(204).end();
});

module.exports = router;
