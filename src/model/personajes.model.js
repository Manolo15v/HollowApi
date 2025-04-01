import { Schema,model } from 'mongoose';


const personajeSchema = new Schema({
    nombre: {
        type: String,
        require: true
    }, 
    descripcion: {
        type: String,
        require: true
    }
});

export const personajeModel = model('personajes', personajeSchema)