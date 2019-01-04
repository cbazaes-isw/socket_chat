const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crear_notificacion } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (usuario, callback) => {

        if (!usuario.nombre) {
            return callback({ ok: false, message: 'El nombre es neceserio' });
        }

        let personas = usuarios.agregar_persona(client.id, usuario.nombre);

        client.broadcast.emit('lista-usuarios', usuarios.get_personas());

        callback(personas);

    });

    client.on('notificacion', (data) => {

        let usuario = usuarios.get_persona(client.id);

        let mensaje = crear_notificacion(usuario.nombre, data.mensaje);
        client.broadcast.emit('notificacion', mensaje);

    });

    client.on('disconnect', () => {

        let usuario_quitado = usuarios.quitar_persona(client.id);

        client.broadcast.emit('notificacion', crear_notificacion('Administrador', `${usuario_quitado.nombre} abandonó el chat.`));
        client.broadcast.emit('lista-usuarios', usuarios.get_personas());

    });

    // Mensajes privados
    client.on('mensaje-privado', (data) => {

        let usuario = usuarios.get_persona(client.id);

        client.broadcast.to(data.para).emit('mensaje-privado', crear_notificacion(usuario.nombre, data.mensaje));

    });

});