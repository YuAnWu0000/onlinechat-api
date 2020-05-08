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
      return messageStacks;
  } catch (err) {
    console.log(err);
  }
}

module.exports.deleteAllMessages = async () => {
  try {
    const batch = db.batch();
    await db.collection('message').get().then(qs => {
      qs.forEach(messageDoc => {
        batch.delete(messageDoc.ref);
      });
      batch.commit();
    });
    return 'Deleted all documents in message';
  } catch (err) {
    console.log(err);
  }
}