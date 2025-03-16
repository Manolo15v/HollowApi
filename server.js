const express = require('express');
const {json, static} = express;
const {Server} = require( 'http');
const Container = require("./src/container");
const cors = require("cors");

const personajes = new Container("./personajes.txt");

const app = express();
const httpServer = Server(app);

const PORT = 8080;

app.use(cors());
app.use(json());
app.use(static('public'));

app.get("/personajes/", async (req, res) => {
    res.send(await personajes.getAll());
});

app.get("/personajes/:id", async (req, res) => {
    const {id} = req.params
    const personaje = await personajes.getById(parseInt(id));

    if (!personaje) res.status(404);
        
    res.send(personaje);    
});

app.post("/personajes/agregar", async (req, res) => {
    const personaje = req.body;
    
    const id = await personajes.save(personaje);

    if (!id) res.sendStatus(500);

    res.sendStatus(201);
})

app.delete("/personajes/:id", async (req, res) => {
    const {id} = req.params;
    const personaje = await personajes.deleteById(parseInt(id));

    if (!personaje) res.status(404);
        
    res.send(personaje); 

});

const server = httpServer.listen(PORT, () => {
    console.log(`http://localhost:${server.address().port}`);
});