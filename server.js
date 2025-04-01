import express, {json, static as stc} from "express";
import { Server as HttpServer } from "http";
import cors from "cors";

import dotenv from 'dotenv';
import PersonajesRouter from "./src/router/personajes.router.js";

const app = express();
const httpServer = HttpServer(app);

dotenv.config()

app.use(cors());
app.use(json());
app.use(stc('public'));

const personajes = new PersonajesRouter();

app.use("/personajes", personajes.start());

// app.get("/personajes/", async (req, res) => {
//     res.send(await personajes.getAll());
// });

// app.get("/personajes/:id", async (req, res) => {
//     const {id} = req.params
//     const personaje = await personajes.getById(parseInt(id));

//     if (!personaje) res.status(404);
        
//     res.send(personaje);    
// });

// app.post("/personajes/agregar", async (req, res) => {
//     const personaje = req.body;
    
//     const id = await personajes.save(personaje);

//     if (!id) res.sendStatus(500);

//     res.sendStatus(201);
// })

// app.delete("/personajes/:id", async (req, res) => {
//     const {id} = req.params;
//     const personaje = await personajes.deleteById(parseInt(id));

//     if (!personaje) res.status(404);
        
//     res.send(personaje); 

// });

const server = httpServer.listen(process.env.PORT, () => {
    console.log(`http://localhost:${server.address().port}`);
});