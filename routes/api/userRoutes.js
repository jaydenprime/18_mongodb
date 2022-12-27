const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// API for users
router.route('/')
    .get(getUsers)
    .post(createUser);

// API users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// API for users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
