// Write your "actions" router here!
const express = require('express');
const {} = require('./actions-middleware');
const Actions = require('./actions-model');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.body);
    // Returns an array of actions (or an empty array) as the body of the response.
})
router.get('/:id', (req, res, next) => {
    console.log(req.body);
    // Returns an action with the given `id` as the body of the response.
    // If there is no action with the given `id` it responds with a status code 404.
})
router.post('/', (req, res, next) => {
    console.log(req.body);
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.put('/:id', (req, res, next) => {
    console.log(req.body);
    // Returns the updated action as the body of the response.
    // If there is no action with the given `id` it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
})
router.delete('/:id', (req, res, next) => {
    console.log(req.body);
    // Returns no response body.
    // If there is no action with the given `id` it responds with a status code 404.
})

module.exports = router;