const firebase = require('firebase');
firebase.initializeApp({
  projectId: 'onlinechat-8ca50'
});
const db = firebase.firestore();

module.exports.pushMessage = async (messageObj) => {
  try {
    const ref = db.collection('message').doc(messageObj.time.toString());
    const result = await ref.set(messageObj);
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports.findAllMessages = async () => {
  try {
      const messageStacks = [];
      await db.collection('message').get().then(qs => {
        qs.forEach(messageDoc => {
          messageStacks.push(messageDoc.data());
        });
      });
      console.log('messageStacks---------------: ', messageStacks);
      return messageStacks;
  } catch (err) {
    console.log(err);
  }
}