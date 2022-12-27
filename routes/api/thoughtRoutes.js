const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// APLI for thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// API for thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// API for thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// API for thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;