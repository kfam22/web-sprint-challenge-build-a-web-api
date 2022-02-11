const Project = require('./projects-model');
const yup = require('yup');

function logger(req, res, next) {
    const time = new Date().toLocaleString()
    console.log(`[timestamp: ${time}] [method: ${req.method}] [url: ${req.url}]`)
    next()
  };

  async function validateProjectId(req, res, next){
    try{
        const project = await Project.get(req.params.id)
        if(!project){
            res.status(404).json({ message: "project not found"})
        } else {
            req.project = project;
            next();
        }
    }catch(err){
        next(err)
    }
  }

  const postProjectSchema = yup.object({    
      name: yup.string().trim().required(),
      description: yup.string().trim().required(),
  })

  async function validateProjectPost(req, res, next){
    try {
        const validated = await postProjectSchema.validate(req.body);
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

  const updateProjectSchema = yup.object({    
    name: yup.string().trim().required(),
    description: yup.string().trim().required(),
    completed: yup.bool().required()
})

async function validateProjectUpdate(req, res, next){
  try {
      const validated = await updateProjectSchema.validate(req.body);
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

  module.exports = { logger, validateProjectId, validateProjectPost, validateProjectUpdate }