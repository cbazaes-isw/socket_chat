const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crear_notificacion } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            return callback({ ok: false, message: 'El nombre/sala es neceserio' });
        }

        client.join(usuario.sala);

        let personas = usuarios.agregar_persona(client.id, usuario.nombre, usuario.sala);

        client.broadcast.to(usuario.sala).emit('lista-usuarios', usuarios.get_personas_x_sala(usuario.sala));

        callback(usuarios.get_personas_x_sala(usuario.sala));

    });

    client.on('notificacion', (data, callback) => {

        let usuario = usuarios.get_persona(client.id);
        let mensaje = crear_notificacion(usuario.nombre, data.mensaje);

        client.broadcast.to(usuario.sala).emit('notificacion', mensaje);

        callback(mensaje);

    });

    client.on('disconnect', () => {

        let usuario_quitado = usuarios.quitar_persona(client.id);

        client.broadcast.to(usuario_quitado.sala).emit('notificacion', crear_notificacion('Administrador', `${usuario_quitado.nombre} abandonó el chat.`));
        client.broadcast.to(usuario_quitado.sala).emit('lista-usuarios', usuarios.get_personas_x_sala(usuario_quitado.sala));

    });

    // Mensajes privados
    client.on('mensaje-privado', (data) => {

        let usuario = usuarios.get_persona(client.id);

        client.broadcast.to(data.para).emit('mensaje-privado', crear_notificacion(usuario.nombre, data.mensaje));

    });

});