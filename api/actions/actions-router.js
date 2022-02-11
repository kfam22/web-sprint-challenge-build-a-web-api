// Write your "actions" router here!
const express = require('express');
const {validateActionPost, validateActionUpdate, validateActionId } = require('./actions-middleware');
const Actions = require('./actions-model');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.body);
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
})

router.post('/', validateActionPost, (req, res, next) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        next(err)
    })
})

router.put('/:id', validateActionId, validateActionUpdate, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        next(err)
    })
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
    .then(()=> {
        res.status(200).json({ message: `action id:${req.params.id} has been deleted` })
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;