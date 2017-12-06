const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;


let animals = [ "panda", "dolphin", 
                "bear cat", "snake",  
                "puppy", "star nosed mole", "lion"];

app.use(bodyParser.json());


app.get('/api/test', (req, res)=>{
    res.send("Hello world!");
});

app.get('/api/animals', (req, res)=>{
    res.send(animals);
})

app.get('/api/animals/:index', (req, res)=>{
    let index = req.params.index*1;
    if (index >= animals.length){
        return res.status(404).send(
            "Index higher than length of array");
    }
    if (index < 0){
        return res.status(404).send(
            "Index must be positive");
    }

    res.send(animals[index]);
});


app.post('/api/animals', (req, res)=>{
    if (!req.body.name){
        return res.status(400).send("You must provide a name");
    } 
    let name = req.body.name;
    animals.push(name);
    res.send(name + ' has been added to the list');
});

app.put('/api/animals/:index', (req, res)=>{
    let index = req.params.index;
    let newName = req.body.name;
    animals[index] = newName;
    res.send(`The animal in index ${index} has 
                    been updated to ${newName}`);
})

app.delete('/api/animals/:index', (req, res)=>{
    let index = req.params.index;

    animals.splice(index, 1);
    res.send(`The animal in index ${index} has 
                been removed`);
})

app.listen(port, ()=>{
    console.log("Serving up hotcakes on port " + port);
})