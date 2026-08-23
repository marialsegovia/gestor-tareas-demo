// public/app.js
//
// Este codigo corre en el NAVEGADOR (no en el servidor). Se encarga de:
//  - Pedirle al servidor la lista de tareas y dibujarla en pantalla.
//  - Enviar al servidor las tareas nuevas que el usuario agrega.
//  - Avisarle al servidor cuando una tarea se marca como completada o se elimina.
//
// Todo esto se hace con peticiones AJAX (usando jQuery), es decir, sin recargar
// la pagina completa cada vez.

$(function () {
  const $lista = $('#lista-tareas');
  const $formulario = $('#formulario-nueva-tarea');

  function dibujarTareas(tareas) {
    $lista.empty();

    tareas.forEach(function (tarea) {
      const $item = $('<li>').addClass(tarea.completada ? 'completada' : '');

      const $checkbox = $('<input>', { type: 'checkbox' }).prop('checked', tarea.completada);
      $checkbox.on('change', function () {
        $.ajax({
          url: '/api/tareas/' + tarea.id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ completada: $checkbox.is(':checked') }),
        }).done(cargarTareas);
      });

      const $texto = $('<span>').text(' ' + tarea.titulo + ' (' + tarea.prioridad + ') ');

      const $borrar = $('<button>').text('Eliminar').on('click', function () {
        $.ajax({ url: '/api/tareas/' + tarea.id, method: 'DELETE' }).done(cargarTareas);
      });

      $item.append($checkbox, $texto, $borrar);
      $lista.append($item);
    });
  }

  function cargarTareas() {
    $.getJSON('/api/tareas', dibujarTareas);
  }

  $formulario.on('submit', function (evento) {
    evento.preventDefault();

    const nuevaTarea = {
      titulo: $('#campo-titulo').val(),
      prioridad: $('#campo-prioridad').val(),
      vencimiento: $('#campo-vencimiento').val(),
    };

    $.ajax({
      url: '/api/tareas',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(nuevaTarea),
    }).done(function () {
      $formulario[0].reset();
      cargarTareas();
    });
  });

  cargarTareas();
});
