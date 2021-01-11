'use strict'

//Importa el modelo usuario
const User = use('App/Models/User.js')

//Validacion
const { validate } = use('Validator')


class UserController {
    //Metodo login
    async login({request, auth}){
        const {email, password} = request.all();
        const token = await auth.attempt(email, password); //(attempt), Busca al usuario en la base de datos
        return token;
    }


    async store({request, response}){ //Metodo asincrono
        //Toma los datos que fueron enviados en la peticion
        const {email, password, username} = request.all(); //.all(); toma todos los datos
        //console.log(email, password, username); imprime los parametros en consola
        const rules = ({ //(Await), Espera la Creacion del usario con los datos que se envian
            email: 'required|email|unique:users,email',
            password: 'required',
            username: 'required'
        });
        const validation = await validate(request.all(), rules)
        if (validation.fails()){
            return response.status(403).json({
                mensaje: "Verifique los datos nuevamente",
                errores: validation.messages()
            })
        }
        const user = await User.create({ //(Await), Espera la Creacion del usario con los datos que se envian
            email,
            password,
            username
        });
        return user; //Regresa el usuario creado
        //return this.login(...arguments); //Regresa el token del usuario creado
    };

}

module.exports = UserController
