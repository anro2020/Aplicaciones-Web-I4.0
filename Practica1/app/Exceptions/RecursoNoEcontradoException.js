'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RecursoNoEcontradoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {//handle(), toma el error
    return response.status(404).json({
      error: "El recurso no existe"
    });
  }
}

module.exports = RecursoNoEcontradoException
