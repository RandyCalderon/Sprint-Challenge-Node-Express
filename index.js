const express = require('express')
const server = express()
server.use(express.json())

const actionModel = require('./data/helpers/actionModel')
const projectModel = require('./data/helpers/projectModel')
const mappers = require('./data/helpers/mappers')


// projectModel
server.get('/api/projects', async (req, res) => {
    try {
        const getProject = await projectModel.get()
        res.status(200).json(getProject)
    } catch(err) {

    }
})

server.get('/api/projects/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (id === undefined) {
            return res.status(404).json({error: "The id for that project can't be found"})
        }
        const getProjectAction = await projectModel.getProjectActions(id)
        res.status(200).json(getProjectAction)
    } catch(err) {
        res.status(404).json({error: "Project not found"})
    }
})


server.post('api/projects', async (req, res) => {
    try {
        const { name } = req.body
        const projectInsert = await projectModel.insert({name})
        res.status(200).json(projectInsert)
    } catch(err) {
        
    }
})


// actionModel

server.get('/api/actions', async (req, res) => {
    try {
        const actionGet = await actionModel.get()
        res.status(200).json(actionGet)
    } catch(err) {

    }
})

server.get('/api/actions/:id', async (req, res) => {
    try {   
        const id = req.params.id
        const actionGetId = await actionModel.get(id)
        res.status(200).json(actionGetId)
    } catch(err) {
        res.status(500).json({error: "Unable to retrieve action data"})
    }
})
server.listen(8000)