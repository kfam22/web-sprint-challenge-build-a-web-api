// add middlewares here related to projects
// 1. logger
// 2. validate id
// 3. validate post

const Project = require('./projects-model');
const yup = require('yup');

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

  const projectSchema = yup.object({    
      //   project needs a name and description
      name: yup.string().trim().required(),
      description: yup.string().trim().required(),
  })

  async function validateProject(req, res, next){
    try {
        const validated = await projectSchema.validate(req.body);
        console.log('validation...', validated);
        req.body = validated;
        next()
    }
    catch(err){
        next({
            status: 400,
            message: err.message
        });
    }
  }

  module.exports = { logger, validateProjectId, validateProject }

//   const messageSchema = yup.object({
//     sender: yup.string().trim().min(3).required(),
//     text: yup.string().trim().min(3).required(),
// })

// const checkMessagePayload = async (req, res, next) => {
//     try {
//         const validated = await messageSchema.validate(req.body)
//         req.body = validated
//         next()
//     } catch(err) {
//         next(err)
//     }
// }