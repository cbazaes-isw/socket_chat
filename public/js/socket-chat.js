var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrar-chat', usuario, function(response) {
        // console.log('Usuarios conectados', response)
        renderizar_usuarios(response);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('notificacion', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('notificacion', function(mensaje) {

    renderizar_mensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cambios de usuarios cuando un usuario entra o sale del chat.
socket.on('lista-usuarios', function(usuarios) {

    // console.log(usuarios);
    renderizar_usuarios(usuarios);

})

// Mensajes privados
socket.on('mensaje-privado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
});