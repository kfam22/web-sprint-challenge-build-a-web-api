const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { logger } = require('./projects/projects-middleware');

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Don't worry, be happy!</h2>`);
  });

  server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
  });

  server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: "something went wrong",
      message: err.message,
      stack: err.stack
    })
  })

module.exports = server;
