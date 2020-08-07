const projects = require('../data/helpers/projectModel')
const router = require('express').Router();
const messages = require('../middleware/messageDirectory');

module.exports = router;

router.post('/', validateData, (req, res, next) => {  
    projects.insert(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log({err});
      next(messages.dbCreateError)
    })
  })

router.get('/', (req, res, next) => {
    projects.get()
    .then(data => res.json(data))
    .catch(err => {
        console.log(err)
        next(messages.dbRetrieveError)
    })
});

router.get('/:id', validateId, (req, res, next) => {
    projects.get(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log({err});
      next(messages.dbRetrieveError);
    })
  })
  
  router.get('/:id/actions', validateId, (req, res, next) => {
    projects.getProjectActions(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(messages.dbRetrieveError);
    })
  })
  
  router.put('/:id', validateId, validateData, (req, res, next) => {
    projects.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(messages.dbUpdateError);
    })
  })
  
  router.delete('/:id', validateId, (req, res, next) => {
    projects.remove(req.params.id)
    .then(result => {
      res.status(200).json({message: `Deleted Project with ID: ${req.params.id}`})
    })
    .catch(err => {
      next(messages.dbDeleteError);
    })
  })
  
  function validateData(req, res, next) {
    console.log(req.body)
    if (!req.body || !req.body.name || !req.body.description) {
      next(messages.incompleteData);
    } else {
      next();
    }
  }
  
  function validateId(req, res, next) {
    if (!req.params || !req.params.id || !isIntAsString(req.params.id)) {
      next(messages.notAcceptableValue)
    } else {
      next();
    }
  }
  
  function isIntAsString(value) {
    return /^\d+$/.test(value);
  }
