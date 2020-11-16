const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let doc = require("./InitialData");

app.get("/api/student", (req, res) => {
    res.send(doc);
});

app.get('/api/student/:id', (req, res) => {
    let id = req.params.id;
    for(let obj in doc){
        if(doc[obj]["id"] === parseInt(id)){
            res.send(doc[obj]);
            return;
        }
    }
    res.status(404).send("id is invalid");
    return;
});

app.post("/api/student", (req, res) => {
    res.set("content-type", "application/x-www-form-urlencoded");
    let {name, currentClass, division} = req.body;
    if(!name || !currentClass || !division){
        res.status(400);
        return;
    }
    let obj = {
        id:doc.length+1,
        name:name,
        currentClass: parseInt(currentClass),
        division:division
    }
    doc.push(obj);
    res.send(obj);
});

app.put("/api/student/:id", (req, res) => {
    res.set("content-type", "application/x-www-form-urlencoded");
    let id = req.params.id;
    let {name, currentClass, division} = req.body;

    if(!name || !currentClass || !division){
        res.status(400);
        return;
    }
    let flag = false;
    for(let obj in doc){
        if(doc[obj]["id"] === parseInt(id)){
            flag = true;
            doc[obj]["name"] = name;
            doc[obj]["currentClass"] = currentClass;
            doc[obj]["division"] = division;
        }
           
    }
    if(!flag){
        res.status(400);
        return;
    }
    res.send(doc);
    // res.send(obj.id);
});

app.delete("/api/student/:id", (req, res) => {
    let id = req.params.id;
    let flag = false;
    let index = null;
    for(let obj in doc){
        if(doc[obj]["id"] === parseInt(id)){
            flag = true;
            index = obj;
        }
    }
    if(!flag){
        res.status(404);
        return;
    }
    doc.splice(index, 1);
    res.send(doc);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   