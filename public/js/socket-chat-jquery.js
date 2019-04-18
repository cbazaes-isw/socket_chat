var params = new URLSearchParams(window.location.search);

// referencias de jquery
var div_usuarios = $('#divUsuarios');
var form_enviar = $('#form-enviar');
var input_mensaje = $('#mensaje');
var div_chatbox = $('#divChatbox');

// Funciones para renderizar usuarios

function renderizar_usuarios(personas)
{
    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    personas.forEach((p,i) => {
        console.log(p);

        html += '<li>';
        html += '    <a data-id="' + p.id + '" href="javascript:void(0)"><img src="assets/images/users/' + ( i + 1 ) + '.jpg" alt="user-img" class="img-circle"> <span>' + p.nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    });

    div_usuarios.html(html);

}

function renderizar_mensajes(mensaje, enviado)
{

    var today = new Date();
    var current_time = today.getHours() + ':' + today.getMinutes();
    var html = '';

    if (enviado)
    {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + current_time + '</div>';
        html += '</li>';
    }
    else
    {
        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + current_time + '</div>';
        html += '</li>';
    }

    div_chatbox.append(html);

}



// Listeners
div_usuarios.on('click', 'a[data-id]', function() {
    
    var id = $(this).attr('data-id');
    console.log(id);

});

form_enviar.on('submit', function(e){

    e.preventDefault();

    if (input_mensaje.val().trim().length === 0) return;

    // Enviar información
    socket.emit('notificacion', {
        usuario: params.get('nombre'),
        mensaje: input_mensaje.val().trim()
    }, function(mensaje) {

        renderizar_mensajes(mensaje, true);
        input_mensaje.val('').focus();
        
    });
    

});