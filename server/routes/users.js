const express = require('express');
const router = express.Router();
const User = require('../models/User');


// GET /api/users/ 'Get all Users' -> find();
router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    })
});

// GET /api/users:id 'Get single User' -> findById()
router.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).send('Bummer! User doesn\'t exist.');
      res.status(200).json(user);
    })
});

// POST /api/users 'Create a User' -> save()
router.post('/', (req, res) => {
  let user = new User(req.body);
    user
      .save()
      .then(user => {
        res.status(201).json(user);
      })
});

// PUT /api/users/:id 'Update a User' -> FindByIdAndUpdate()
router.put('/:id', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id)
    .then(user => {
      res.status(204).json(user);
    })
});

// DELETE /api/users/:id 'Delete a User' -> findByIdAndRemove()
router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
});

module.exports = router;