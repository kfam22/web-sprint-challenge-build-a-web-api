// add middlewares here related to projects
// 1. logger
// 2. validate id
// 3. validate post

const Project = require('./projects-model');

function logger(req, res, next) {
    const time = new Date().toLocaleString()
    console.log(`[timestamp: ${time}] [method: ${req.method}] [url: ${req.url}]`)
    next()
  };

  async function validateProjectId(req, res, next){
    //   console.log('validateProjectIdMiddleware');     
    // If there is no project with the given `id` it responds with a status code 404.
    try{
        const project = await Project.get(req.params.id)
        if(!project){
            console.log('id validation: failed');
            res.status(404).json({ message: "project not found"})
        } else {
            req.project = project;
            console.log('id validation: success');
            next();
        }
    }catch(err){
        next(err)
    }
  }

  module.exports = { logger, validateProjectId }
