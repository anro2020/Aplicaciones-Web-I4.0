'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Agrupacion de rutas
Route.group(()=>{
  //Ruta para crear un usuario
  Route.post('/registro', 'UserController.store');
  //Inicia sesion
  Route.post('/login', 'UserController.login');
}).prefix('/api/usuarios'); //Agrupa las rutas con la direccion /api

Route.group(()=>{
  Route.get('/proyectos', 'ProyectoController.index');
  //Creacion de un proyecto
  Route.post('/create', 'ProyectoController.create');
  //Eliminar proyecto
  Route.delete('/:id','ProyectoController.destroy');
  //Actualiza proyecto
  Route.put('/:id','ProyectoController.update');
}).prefix('/api/proyectos').middleware('auth');



