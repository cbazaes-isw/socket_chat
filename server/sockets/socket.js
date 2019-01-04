const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (usuario, callback) => {

        if(!usuario.nombre)
        {
            return callback({ok:false, message:'El nombre es neceserio'});
        }

        let personas = usuarios.agregar_persona(client.id, usuario.nombre);

        callback(personas);

    });

});