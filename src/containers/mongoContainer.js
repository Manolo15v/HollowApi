import dbConnect from "../config/mongodb.config.js";

export default class MongoContainer {
    constructor(coleccion) {
        this.coleccion = coleccion;
        dbConnect();
    }

    async create(obj) {
        try {
            return await this.coleccion.create(obj)
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.coleccion.find();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getById(id) {
        try {
            return await this.coleccion.findById(id)
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteById(id) {
        try {
            return await this.coleccion.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}