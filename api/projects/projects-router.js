// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProject } = require('./projects-middleware');
const Project = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log('get request to api/projects');
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(err =>{
        next(err);
    })
})

router.get('/:id', validateProjectId, (req,res) => {
    res.json(req.project);
})

router.post('/', validateProject, (req,res,next) => {
    console.log(`post request with payload:${req.body} to api/projects`);
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        next(err)
    })
})

router.put('/:id', validateProjectId, validateProject, (req,res,next) => {
    console.log(`put request with payload:${req.body} to: api/projects/id:${req.params.id}`);
    Project.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        next(err)
    })
})

router.delete('/:id', validateProjectId, (req,res,next) => {
    console.log(`delete request id:${req.params.id} to api/projects`);
    Project.remove(req.params.id)
    .then(()=> {
        res.status(200).json({ message: `project id:${req.params.id} has been deleted` })
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id/actions', validateProjectId, (req,res,next) => {
    console.log(`get request to api/projects/${req.params.id}/actions`);
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: "something went wrong",
      message: err.message,
      stack: err.stack
    })
  })

module.exports = router