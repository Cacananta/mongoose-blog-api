const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// GET /api/blogs/ 'Get all Blogs' -> find();
router.get('/', (req, res) => {
  Blog
    .find()
    .then(blog => {
      res.status(200).json(blog);
    });
});
// GET /api/blogs/featured 'Get all featured Blogs' -> where();
router.get('/featured', (req,res) => {
  Blog
    .where('/featured', {type: true})
      .then(blog => {
        res.status(200).json(blog);
      });
});

// GET /api/blogs/:id 'Get single Blogs' -> findById();
router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (!blog) res.status(404).send("Oh no! That author ID doesn't exist.");
      res.status(200).json(blog);
    });
});

// POST /api/blogs/ 'Create a Blog & associate to userId' -> save();

router.post('/', (req, res) => {
  let dbUser = null;

  User
    .findById(req.query.userId)
      .then(user => {
        dbUser = user;
        const newBlog = new Blog(req.body);
        newBlog.author = user._id;
        return newBlog.save();
  })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser.save().then(() => 
      res.status(201).json(blog))
  })
});
// PUT /api/blogs/:id 'Update a Blog' -> findByIdAndUpdate();

router.put('/:id', (req,res) => {
  Blog
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blog => {
      res.status(204).json(blog);
    });
});
// DELETE /api/blogs/:id 'Delete a Blog' -> findByIdAndRemove();
router.delete('/:id', (req, res) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(blog => {
      res.status(200).json(blog);
    });
});

module.exports = router;