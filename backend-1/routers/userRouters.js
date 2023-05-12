const express = require('express');

// const protectRoute = require('../routers/authHelpers')
const {getUsers, postUser2, updateUser2, deleteUser, getUserById} = require('../controllers/userControllers')
const userRouter = express.Router()

console.log('userRouter')
userRouter
.route('/')
.get(getUsers)
.post(postUser2)
.patch(updateUser2)
.delete(deleteUser)

// userRouter
// .route('/getCookies')
// .get(getCookies)

// userRouter
// .route('/setCookies')
// .get(setCookies)

userRouter
.route('/:id')
.get(getUserById)



module.exports = userRouter