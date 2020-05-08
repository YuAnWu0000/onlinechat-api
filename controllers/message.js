const { findAllMessages, deleteAllMessages } = require('../services/firebase.js');
module.exports.getAllMessages = async (req, res) => {
  const result = await findAllMessages()
  res.json({
    code: 1001,
    message: 'success',
    data: result,
  });
}

module.exports.deleteAllMessages = async (req, res) => {
  const result = await deleteAllMessages()
  res.json({
    code: 1001,
    message: 'success',
    data: result,
  });
}