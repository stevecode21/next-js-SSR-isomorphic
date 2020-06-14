// server.js
// Cargamos next que se encarga de todo el procesamiento
const next = require('next')
// Vamos a tener un archivo routes que crearemos posterior a esta configuración
const routes = require('./routes')
// Vamos a estar instanciando la applicación de next en un entorno que viene con la variable NODE_ENV, por defecto es en development que es lo que estmaos buscando
const app = next({dev: process.env.NODE_ENV !== 'production'})
// Aquí le pasamos las cosas al servidor que vengamos usando
const handler = routes.getRequestHandler(app)
/**Importante: Por defecto next route nos dice que hay que escuchar en el puerto 3000, cuando queremos pasar a producción muchas veces queremos cambiar ese puerto */
// Por convención todas las variables de entorno deben ser en mayúsculas
const port = process.env.PORT || 3000
// En nuestro caso, vamos a trabajar con la librería http de NODE, pero si se quiere se puede usar con Express o algun otro Framework.
const {createServer} = require('http')
app.prepare().then(() => {
  // Le pasamos el puerto de manera dinámica
  createServer(handler).listen(port)
})