const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/crud-form")

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Mongodb connection has been established')
})

const DataSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    checkbox: Boolean,
    radio: String,
    dropdown: String
}, {timestamps: true})

const Data = mongoose.model('Data', DataSchema)

app.get('/api/data', async(req, res) => {
    try {
        const data = await Data.find()
        res.status(200).json({data})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.post('/api/data', async(req, res) => {
    try {
        const newData = await Data.create(req.body)
        res.status(201).json({newData})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.get('/api/data/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await Data.findById(id)
        res.status(200).json({data})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.put('/api/data/:id', async(req, res) => {
    try {
        const {id} = req.params
        const updatedData = await Data.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({updatedData})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.delete('/api/data/:id', async(req, res) => {
    try {
        const {id} = req.params
        const deleteData = await Data.findByIdAndDelete(id)
        res.json({message: "Data deleted successfully"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.get('/', (req, res) => {
    res.send('hello crud form')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})