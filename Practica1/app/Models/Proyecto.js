'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {
    //Relacion belongsTo, cada proyecto pertenece a un usuario
    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Proyecto
