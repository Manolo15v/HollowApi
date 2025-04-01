import MongoContainer from "../containers/mongoContainer.js";
import { personajeModel } from "../model/personajes.model.js";

class PersonajesDao extends MongoContainer {

    constructor(coleccion) {
        super(coleccion);
    }

    static async exists(id) {
        try {
            return await this.coleccion.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getPresonajeById(id) {
        try {
            const product = await this.coleccion.findById(id)
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async updatePresonajeById(id, obj) {
        try {
            await this.coleccion.findByIdAndUpdate(id, obj)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

export default new PersonajesDao(personajeModel)