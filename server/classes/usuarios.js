class Usuarios
{
    constructor()
    {
        this.personas = [];
    }

    agregar_persona(id, nombre, sala)
    {
        let persona = {
            id, 
            nombre,
            sala
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
        let personas_en_sala = this.personas.filter(p => p.sala === sala);
        return personas_en_sala;
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
