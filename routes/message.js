const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');

// middleware
// router.use(function timeLog(req, res, next) {
//   console.log('Get Message Router Time: ', Date.now());
//   next();
// });
router.get('/all', messageController.getAllMessages);
router.delete('/all', messageController.deleteAllMessages);

module.exports = router;