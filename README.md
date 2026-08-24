# Gestor de Tareas (demo)

Aplicación web sencilla para gestionar una lista de tareas: agregar, marcar
como completadas, eliminar, y ver un resumen agrupado por prioridad.

Está pensada como un proyecto pequeño, fácil de instalar y de leer, para
usarse como base de pruebas y demostraciones.

---

## 1. Qué necesitas antes de empezar

- **Node.js** (ya quedó instalado en esta máquina mediante una herramienta
  llamada `nvm`, que permite tener Node.js sin necesidad de permisos de
  administrador).
- No necesitas instalar ninguna base de datos: los datos se guardan en un
  archivo de texto dentro del propio proyecto (`data/tareas.json`).

## 2. Cómo instalar y correr el proyecto

Abre una terminal, entra a la carpeta del proyecto y ejecuta:

```bash
# 1. Activar Node.js en esta terminal (solo si no está activo)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Entrar a la carpeta del proyecto
cd /Users/marialuisasegovia/gestor-tareas-demo

# 3. Instalar las dependencias (solo la primera vez, o cuando cambien)
npm install

# 4. Arrancar el servidor
npm start
```

Cuando veas en la terminal el mensaje:

```
Servidor de Gestor de Tareas escuchando en http://localhost:3000
```

abre esa dirección (`http://localhost:3000`) en tu navegador. Ahí verás la
lista de tareas. El enlace "Ver resumen" te lleva a una segunda página con
las tareas agrupadas por prioridad.

Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

### Si no encuentras la terminal donde quedó corriendo

Si cerraste la ventana de la terminal sin presionar `Ctrl + C` primero, el
servidor puede quedar corriendo "de fondo" sin que lo veas, y ocupando el
puerto 3000 (por lo que la próxima vez que hagas `npm start` puede fallar
diciendo que el puerto ya está en uso). Para revisar si eso pasó y cerrarlo:

```bash
# Revisa si hay algún proceso usando el puerto 3000
lsof -ti:3000

# Si el comando anterior mostró algún número, ciérralo con:
lsof -ti:3000 | xargs kill -9
```

### Reiniciar los datos de ejemplo

Si quieres volver a dejar la aplicación con datos de prueba "de fábrica",
puedes correr:

```bash
npm run seed
```

Esto reemplaza el contenido de `data/tareas.json` por tareas de ejemplo
generadas automáticamente. Si quieres una cantidad distinta de tareas, por
ejemplo 8:

```bash
npm run seed -- --cantidad=8
```

## 3. Estructura del proyecto y qué hace cada parte

```
gestor-tareas-demo/
├── package.json          Lista de dependencias e instrucciones de arranque
├── server.js              Punto de entrada: levanta el servidor web
├── data/
│   ├── tareas.json         Los datos: la lista de tareas guardada en disco
│   └── tareas.js            Funciones para leer y escribir esos datos
├── routes/
│   ├── tareas.js            La "API": crear, listar, actualizar y borrar tareas
│   └── resumen.js           Genera la página de resumen agrupado por prioridad
├── views/
│   └── resumen.ejs          Plantilla HTML de la página de resumen
├── public/
│   ├── index.html           Página principal (lista de tareas)
│   ├── app.js                Lógica del navegador: agregar/completar/borrar tareas
│   └── style.css             Estilos visuales (colores, tamaños, espaciados)
├── utils/
│   └── frase.js              Trae una frase motivacional para el resumen
└── scripts/
    └── seed.js               Script para regenerar datos de ejemplo
```

A continuación, la explicación de cada archivo en más detalle:

### `package.json`
Es la "ficha técnica" del proyecto: dice cómo se llama, qué comandos se
pueden ejecutar (`npm start`, `npm run seed`, etc.) y qué paquetes de
software de terceros (dependencias) necesita para funcionar.

### `server.js`
Es el archivo que arranca todo. Cuando ejecutas `npm start`, este es el
código que corre. Se encarga de:
- Abrir un servidor web en el puerto 3000 (`http://localhost:3000`).
- Conectar las distintas partes de la aplicación entre sí (la página
  principal, la página de resumen y la API).

### `data/tareas.json` y `data/tareas.js`
`tareas.json` es donde literalmente viven los datos: un archivo de texto
con la lista de tareas. `tareas.js` contiene las funciones que saben leer
y escribir ese archivo correctamente (agregar una tarea, marcarla como
completada, eliminarla), para que el resto del código no tenga que
preocuparse por el formato del archivo.

### `routes/tareas.js`
Define la "API": un conjunto de direcciones internas (por ejemplo
`/api/tareas`) que el navegador usa para pedir la lista de tareas, crear
una nueva, actualizar una existente o eliminarla. Es el "mesero" entre el
navegador y los datos.

### `routes/resumen.js` y `views/resumen.ejs`
`resumen.js` prepara la información para la página de resumen: agrupa las
tareas por prioridad (alta, media, baja), calcula cuántas hay en total y
cuántas están completadas, y pide una frase motivacional. `resumen.ejs` es
la plantilla que define cómo se ve esa información en el navegador (es
HTML con "huecos" que se llenan con los datos calculados).

### `public/index.html`, `public/app.js`, `public/style.css`
Todo lo que ve y usa la persona en el navegador:
- `index.html` es el esqueleto de la página principal.
- `app.js` es el código que hace que la página sea interactiva: cuando
  agregas una tarea, marcas una como completada o la eliminas, este
  archivo es el que le avisa al servidor y actualiza la pantalla sin
  necesidad de recargar la página.
- `style.css` define únicamente la apariencia (colores, espacios,
  tipografía), no tiene ninguna lógica.

### `utils/frase.js`
Pequeña utilidad que busca una frase motivacional en un servicio externo
para mostrarla en la página de resumen. Si no hay conexión a internet en
ese momento, usa una frase de una lista de respaldo guardada en el mismo
archivo, para que la aplicación nunca deje de funcionar por depender de
un servicio externo.

### `scripts/seed.js`
Un script independiente (no se ejecuta al arrancar el servidor, hay que
correrlo a mano con `npm run seed`) que genera tareas de ejemplo nuevas y
las guarda en `data/tareas.json`. Sirve para "resetear" la demo con datos
frescos antes de mostrarla.

### `.gitignore`
Le indica a Git (el sistema de control de versiones) qué carpetas o
archivos NO debe guardar en el historial del proyecto — principalmente la
carpeta `node_modules`, que contiene las dependencias descargadas y puede
volver a generarse en cualquier momento con `npm install`.

## 4. Comandos disponibles (resumen rápido)

| Comando              | Qué hace                                                  |
|-----------------------|------------------------------------------------------------|
| `npm install`          | Descarga todas las dependencias necesarias                |
| `npm start`             | Arranca el servidor en `http://localhost:3000`             |
| `npm run dev`           | Igual que `npm start`, pero reinicia solo si cambia el código |
| `npm run seed`          | Regenera los datos de ejemplo                              |
