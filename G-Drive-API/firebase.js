const admin = require("firebase-admin");
const serviceAccount = require("./config/g-drive-clone-8de4e-firebase-adminsdk-tda75-5dcc0d859f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:"gs://g-drive-clone-8de4e.appspot.com"
})

module.exports = admin