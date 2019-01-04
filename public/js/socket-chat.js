var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrar-chat', usuario, function(response) {
        console.log('Usuarios conectados', response)
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

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuarios cuando un usuario entra o sale del chat.
socket.on('lista-usuarios', function(usuarios) {

    console.log(usuarios);

})

// Mensajes privados
socket.on('mensaje-privado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
});