


//Importa la exception
const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException')
const RecursoNoEcontradoException = use('App/Exceptions/RecursoNoEcontradoException')

class AutorizacionService{

    verificarPermiso(recurso, user){ //Funcion que recibe parametros

        if(!recurso){ //Si no hay recurso
            throw new RecursoNoEcontradoException();
        }

        if(recurso.user_id !== user.id){ //Verifica si es dueño del proyecto a eliminar
            throw new AccesoInvalidoException();
        };
    }
}

module.exports = new AutorizacionService(); //Exporta la funcion