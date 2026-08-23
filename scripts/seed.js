// scripts/seed.js
//
// Script de mantenimiento para regenerar datos de ejemplo (tareas de prueba).
// No se ejecuta solo: se corre manualmente cuando se quiere reiniciar la
// demo con datos frescos.
//
// Como usarlo:
//   npm run seed                     -> genera 4 tareas de ejemplo (por defecto)
//   npm run seed -- --cantidad=8     -> genera 8 tareas de ejemplo

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const argumentos = minimist(process.argv.slice(2));
const cantidad = argumentos.cantidad || 4;

const prioridades = ['alta', 'media', 'baja'];
const titulosDeEjemplo = [
  'Preparar reporte mensual',
  'Responder correos de soporte',
  'Revisar diseno de la nueva pagina',
  'Actualizar documentacion interna',
  'Planear reunion de equipo',
  'Revisar presupuesto del trimestre',
  'Coordinar entrega con el proveedor',
  'Actualizar inventario de productos',
];

const tareas = [];
for (let i = 0; i < cantidad; i++) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + i + 1);

  tareas.push({
    id: i + 1,
    titulo: titulosDeEjemplo[i % titulosDeEjemplo.length],
    prioridad: prioridades[i % prioridades.length],
    vencimiento: fecha.toISOString().slice(0, 10),
    completada: false,
  });
}

const rutaArchivo = path.join(__dirname, '..', 'data', 'tareas.json');
fs.writeFileSync(rutaArchivo, JSON.stringify(tareas, null, 2));

console.log(`Se generaron ${cantidad} tareas de ejemplo en ${rutaArchivo}`);
