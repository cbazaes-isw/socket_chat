const crear_notificacion = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };

}


module.exports = {
    crear_notificacion
}