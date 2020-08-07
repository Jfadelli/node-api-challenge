// code away!
const express = require('express')
const logger = require('./middleware/logger')
const errorCatcher = require('./middleware/errorCatcher')
const welcomeRouter = require('./routers/welcomeRouter')
const projectsRouter = require('./routers/projectRouter')
const actionsRouter = require('./routers/actionsRouter')

const api = express.Router();

//port & ip
const server = express()
const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 4000

//global
server.use(express.json())
server.use(logger.logger)

//routes
server.use('/api/', api)

//subroutes
api.use('/projects', projectsRouter);
api.use('/actions', actionsRouter);

//routes
server.use('/', welcomeRouter)


//misc
server.use(errorCatcher.errorCatcher);
server.listen(port, ()=>{
    console.log(`\n*** Server listening on ${host}:${port}`)
})