const express = require('express')
const server = express()
server.use(express.json())

const actionModel = require('./data/helpers/actionModel')
const projectModel = require('./data/helpers/projectModel')
const mappers = require('./data/helpers/mappers')

server.get('/api/project', async (req, res) => {
    try {
        const getProject = await projectModel.get()
        res.status(200).json(getProject)
    } catch(err) {

    }
})

server.get('/api/project/:id', async (req, res) => {
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

server.post('api/project', async (req, res) => {
    try {
        const { name } = req.body
        const projectInsert = await projectModel.insert({name})
        res.status(200).json(projectInsert)
    } catch(err) {
        
    }
})

server.listen(8000)