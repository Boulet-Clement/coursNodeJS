const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.post('/', (req,res) => {
    //res.send('You did a post request')
    res.status(201).json({ firstname: "John", lastname: "Doe" });
})

app.listen(port, ()=> {
    console.log(`Serveur is listening at localhost:${port}`)
})