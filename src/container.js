const fs = require('fs');

class Container {
    constructor(path) {
        this.path = path;
        this.lastId = 1;
    }

    async #read() {
        try {
            const res =  await fs.promises.readFile(this.path, "utf-8");

            if (res.length == 0) {
                return res
            } else {
                return JSON.parse(res)
            }

        } catch (error) {
            console.log(error);
        }
    }

    async #write(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data), "utf-8")
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        const personajes = await this.#read();

        if (personajes.length === 0) {
            await this.#write([{ ...data, id: this.lastId }]);
            return this.lastId
        } else {
            this.lastId = personajes[personajes.length - 1].id + 1


            await this.#write([...personajes, { ...data, id: this.lastId }]);
            return this.lastId
        }
    }

    async getAll() {
        const personajes = await this.#read();
        return personajes
    }

    async getById(id) {
        const personajes = await this.#read();
        const personajeFound = personajes.find(personaje => personaje.id === id);
        console.log(personajes);
        
        return personajeFound
    }

    async deleteById(id) {
        const personajes = await this.#read();
        
        const personaje = personajes.find(personaje => personaje.id === id);

        if (personaje) {
            const deletedpersonaje = personajes.indexOf(personaje);
    
            personajes.splice(deletedpersonaje, 1);
    
            await this.#write(personajes);
            return true
        }
        
        return false
    }
    
}

module.exports = Container;