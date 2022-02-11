// Write your "projects" router here!
const express = require('express');
const {} = require('./projects-middleware');
const Projects = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log(req.body);
    //Returns an array of projects as the body of the response.
    //If there are no projects it responds with an empty array.
})
router.get('/:id', (req,res,next) => {
    console.log(req.body);
    // Returns a project with the given `id` as the body of the response.
    // If there is no project with the given `id` it responds with a status code 404.
})
router.post('/', (req,res,next) => {
    console.log(req.body);
    // Returns the newly created project as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.put('/:id', (req,res,next) => {
    console.log(req.body);
    // Returns the updated project as the body of the response.
    // If there is no project with the given `id` it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.delete('/:id', (req,res,next) => {
    console.log(req.body);
    // Returns no response body.
    // If there is no project with the given `id` it responds with a status code 404.
})
router.get('/:id/actions', (req,res,next) => {
    console.log(req.body);
    // Returns an array of actions (could be empty) belonging to a project with the given `id`.
    // If there is no project with the given `id` it responds with a status code 404.
})

module.exports = router