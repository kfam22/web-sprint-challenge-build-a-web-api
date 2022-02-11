// add middlewares here related to projects
// 1. logger
// 2. validate id
// 3. validate post

const Projects = require('./projects-model');

function logger(req, res, next) {
    const time = new Date().toLocaleString()
    console.log(`[timestamp: ${time}] [method: ${req.method}] [url: ${req.url}]`)
    next()
  };

  module.exports = { logger }
