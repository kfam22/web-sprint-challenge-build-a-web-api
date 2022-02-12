// add middleware here related to actions
// 1. validate action id
// 2. validate action

const Action = require('./actions-model');
const yup = require('yup');

  async function validateActionId(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({ message: "action not found"})
        } else {
            req.action = action;
            next();
        }
    }catch(err){
        next(err);
    }
  }

  const postActionSchema = yup.object({    
      project_id: yup.number().required(),
      description: yup.string().trim().required(),
      notes: yup.string().trim().required(),
  });

  async function validateActionPost(req, res, next){
    try {
        const validated = await postActionSchema.validate(req.body);
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

  const updateActionSchema = yup.object({    
    project_id: yup.number().required(),
    description: yup.string().trim().required(),
    notes: yup.string().trim().required(),
    completed: yup.bool().required()
});

async function validateActionUpdate(req, res, next){
    try {
        const validated = await updateActionSchema.validate(req.body);
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

  module.exports = { validateActionId, validateActionPost, validateActionUpdate };
