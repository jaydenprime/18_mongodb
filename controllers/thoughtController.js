const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => {
            res.json(thoughts);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thoughts) => {
            !thoughts ? res.status(404).json({ message: 'no thought with this ID!' }) : res.json(thoughts)
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughts._id } },
                { new: true }
            )
        })
        .then((userThoughts) => {
            !userThoughts ? res.status(404).json({ message: 'no thought with this ID!' }) : res.json(userThoughts)
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
        )
        .then((thoughts) => {
            !thoughts ? res.status(404).json({ message: 'no thought with this ID!' }) : res.json(thoughts)
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thoughts) => {
            !thoughts ? res.status(404).json({ message: 'no thought with this ID!' }) : res.json(thoughts);
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((thoughts) => {
            !thoughts ? res.status(404).json({ message: 'thought created but no thought with this ID!' }) : res.json(thoughts);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        })
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((reactions) => {
            !reactions ? res.status(404).json({ message: 'no thought with this ID!' }) : res.json(reactions)
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((reactions) => {
            !reactions ? res.status(404).json({ message: 'thought created but no thought with this ID!' }) : res.json(reactions);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        })
    },
}