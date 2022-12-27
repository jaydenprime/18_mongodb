const User = require("../models/User");

module.exports = {
    getUsers(req, res) {
        User.find()
          .select('-__v')
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            res.status(500).json(err);
            console.log(err);
          });
      },
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this ID!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this ID!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this ID!' });
            }
    
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
          })
          .then(() => {
            res.json({ message: 'user and thoughts deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this ID!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this ID!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    
}