import express from 'express'

const port = 3000

const app = express();

let teaData = []
let nextId = 1

app.use(express.json())

//Adding tea
app.post('/teas', (req, res)=>{
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)

    res.status(200).send("Tea Added Successfully !!")
})

//Read all tea
app.get('/teas', (req, res)=>{
    res.status(201).send(teaData)
})

//Read with specified ID
app.get('/teas/:id', (req, res)=>{
    const teaId = req.params.id;
    const id = teaData.find(t => t.id===parseInt(teaId))
    
    if(!id){
        res.status(404).send("Tea Not Found !")
    }
    res.status(201).send(id)
})

//Update with the ID
app.put('/teas/:id', (req, res)=>{
    const teaId = req.params.id;
    const tea = teaData.find(t => t.id===parseInt(teaId))

    if(!tea)
        res.status(404).send("Tea Not Found !")

    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;

    res.status(202).send("Tea updated successfully !")
})

//Delete all teas
app.delete('/teas/:id', (req, res)=>{
    const teaId = req.params.id;
    const index = teaData.find(t => t.id === parseInt(teaData))

    if(index===-1){
        return res.status(404).send("Tea Not Found !!")
    }

    teaData.splice(index,  1);
    return res.status(404).send("Tea Deleted Successfully !!")
})

app.get('/about', (req, res)=>{
    console.log("Hello My Name is Ganesh, and I am a full stack developer now!")
})

app.listen(port, ()=>{
    console.log(`Server is listening on the port: ${port}`)
})