'use strict'

//Importa el modelo
const Proyecto = use('App/Models/Proyecto')

//Validaciones
const { validate } = use('Validator')

//Importancion servicio
const AutorizacionService = use ('App/Services/AutorizacionService')

class ProyectoController {
    //Muestra todos los proyectos de los usuarios registrados
   async index({auth}){
       //await, tiempo de espero para la respuesta
        const user = await auth.getUser(); //Verficia el token y regresa el usuario
        return await user.proyectos().fetch(); //Devuelve los proyectos creado por el usuario
        //console.log(user.id);
       /*return {
            mensaje: "¡Bienvenido al index de proyectos!"
        }*/
    }

    //Crea proyectos
    async create({auth, request, response}){
        const user = await auth.getUser(); //auth.getUser(), toma el usuario desde el token
        const {nombre} = request.all();
        //Llama al modelo Proyecto
        const proyecto = new Proyecto();
        proyecto.fill({ //Llena los parametros
            nombre
        });
        const rules = ({ //(Await), Espera la Creacion del usario con los datos que se envian
            nombre: 'required'
        });
        const validation = await validate(request.all(), rules)
        if (validation.fails()){
            return response.status(403).json({
                errores: "Necesita crear un nombre para el proyecto"
            })
        }
        await user.proyectos().save(proyecto); //.save(), Guarda el proyecto en la base de datos
        return proyecto;
    }

    //Elimina proyectos
    async destroy({auth, response, params}){
        const user = await auth.getUser(); //Devuelve el usuario
        const {id} = params;
        const proyecto = await Proyecto.find(id) //Busca el proyecto con el id indicado
        AutorizacionService.verificarPermiso(proyecto, user); //Funcion que envia parametros para verificar el permiso

        await proyecto.delete(); //Elimina el proyecto
        return proyecto;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        proyecto.merge(request.only('nombre')); //Unicamente toma el nombre del ID enviado
        await proyecto.save();
        return proyecto;
    }
}

module.exports = ProyectoController
