'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')


class UserSeeder {
  async run () {
    
    const users = await Database.table('users')
    const proyectos = await Database.table('proyectos')

    /*Imprime los campos de la base de datos
     console.log(users)
     console.log(proyectos)*/

    const user = await Factory.model('App/Models/User').create(); //Crea un nuevo usuario en la base de datos
    const proyecto = await Factory.model('App/Models/Proyecto').make(); //Relacion la relacion del usuario con el proyecto

    await user.proyectos().save(proyecto)
  }
}

module.exports = UserSeeder
