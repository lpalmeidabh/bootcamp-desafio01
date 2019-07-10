const express = require('express');

const server = express();
server.use(express.json());

var reqs = 0;
server.use( (req, res, next) => {
    console.log(`Requisições: ${reqs+=1}`);
    return next();
});

function doesProjectExist(req, res, next) {
    const {id} = req.params;
    if(!projects.find(item => item.id === id.toString())){
        return res.status(400).json({ error: 'Project does not exist'});
    }

    return next();
};
const projects = [];

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const {id, title, tasks} = req.body;
    projects.push({"id": id, "title": title, "tasks": []});
    return res.json(projects);
});

server.post('/projects/:id/tasks', doesProjectExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    const project = projects.find(item => item.id === id.toString());
    project.tasks.push(title);

    return res.json(projects);
});

server.put('/projects/:id', doesProjectExist, (req, res) => {
    const{id} = req.params;
   const {title} = req.body;

   const project = projects.find(item => item.id === id);
    project.title = title;
    return res.json(projects);
});

server.delete('/projects/:id', doesProjectExist, (req, res) => {
    const{id} = req.params;
    const {title} = req.body;

    const project = projects.find(item => item.id === id);
    const index = projects.indexOf(project);
    projects.splice(index,1);

});

server.listen(3000);