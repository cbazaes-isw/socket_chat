class Usuarios
{
    constructor()
    {
        this.personas = [];
    }

    agregar_persona(id, nombre)
    {
        let persona = {
            id, 
            nombre
        };

        this.personas.push(persona);

        return this.personas;

    }

    get_persona(id)
    {
        let persona = this.personas.filter(p => p.id === id)[0];

        return persona;
    }

    get_personas()
    {
        return this.personas;
    }

    get_personas_x_sala(sala)
    {
        // TODO
    }

    quitar_persona(id)
    {
        let persona_quitada = this.personas.filter(p => p.id === id)[0];
        this.personas = this.personas.filter(p => p.id != id);
        return persona_quitada;
    }
}


module.exports = {
    Usuarios
}
