// Write your "projects" router here!
const express = require('express');
const { validateProjectId } = require('./projects-middleware');
const Project = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log('get request to api/projects');
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    //Returns an array of projects as the body of the response.
    //If there are no projects it responds with an empty array.
})
router.get('/:id', validateProjectId, (req,res,next) => {
    res.json(req.project);
    // Returns a project with the given `id` as the body of the response.
    // If there is no project with the given `id` it responds with a status code 404.
})
router.post('/', (req,res,next) => {
    console.log(`post request with payload:${req.body} to api/projects`);
    // Returns the newly created project as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.put('/:id', validateProjectId, (req,res,next) => {
    console.log(`put request with payload:${req.body} to: api/projects/id:${req.params.id}`);
    // Returns the updated project as the body of the response.
    // If there is no project with the given `id` it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.delete('/:id', validateProjectId, (req,res,next) => {
    console.log(`delete request id:${req.params.id} to api/projects`);
    // Returns no response body.
    // If there is no project with the given `id` it responds with a status code 404.
})
router.get('/:id/actions', validateProjectId, (req,res,next) => {
    console.log(`get request to api/projects/${req.params.id}/actions`);
    // Returns an array of actions (could be empty) belonging to a project with the given `id`.
    // If there is no project with the given `id` it responds with a status code 404.
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: "something went wrong",
      message: err.message,
      stack: err.stack
    })
  })

module.exports = router