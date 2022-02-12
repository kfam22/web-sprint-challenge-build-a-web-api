// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProjectPost, validateProjectUpdate } = require('./projects-middleware');
const Project = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
    Project.get()
    .then(projects => {
        res.json(projects);
    })
    .catch(err =>{
        next(err);
    });
});

router.get('/:id', validateProjectId, (req,res) => {
    res.json(req.project);
})

router.post('/', validateProjectPost, (req,res,next) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        next(err);
    });
});

router.put('/:id', validateProjectId, validateProjectUpdate, (req,res,next) => {
    Project.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        next(err);
    });
});

router.delete('/:id', validateProjectId, (req,res,next) => {
    Project.remove(req.params.id)
    .then(()=> {
        res.status(200).json({ message: `project id:${req.params.id} has been deleted` });
    })
    .catch(err => {
        next(err);
    });
});

router.get('/:id/actions', validateProjectId, (req,res,next) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        next(err);
    });
});

module.exports = router;