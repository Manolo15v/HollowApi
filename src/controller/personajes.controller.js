import personajesDAO from "../model/personajesDAO.js";


export default class PersonajesControler {
    constructor() {
        this.dao = personajesDAO;
    }

    async getAll (req, res) {
        const personajes = await personajesDAO.getAll();

        if (personajes) {
            res.status(200).json(personajes)
        } else {
            res.sendStatus(400)
        }

    }

    async getById (req, res) {
        const {id} = req.params
        const personaje = await personajesDAO.getById(id);
    
        if (!personaje) res.sendStatus(404);
            
        res.send(personaje);    
    }

    async create (req, res) {
        const personaje = req.body;
        
        const id = await personajesDAO.create(personaje);
    
        if (!id) res.sendStatus(500);
    
        res.sendStatus(201);
    }

    async delete (req, res) {
        const {id} = req.params;
        const personaje = await personajesDAO.deleteById(id);
    
        if (!personaje) res.status(404);
            
        res.send(personaje); 
    }
}