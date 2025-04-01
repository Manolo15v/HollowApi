import { Router } from "express";
import PersonajesControler from "../controller/personajes.controller.js";


export default class PersonajesRouter{
    constructor() {
        this.personajesController = new PersonajesControler() ;
        this.router = Router()
    }

    start() {
        this.router.get('/', this.personajesController.getAll);
        this.router.get('/:id', this.personajesController.getById);
        this.router.post('/agregar', this.personajesController.create);
        this.router.delete('/:id', this.personajesController.delete);

        return this.router
    }

}

