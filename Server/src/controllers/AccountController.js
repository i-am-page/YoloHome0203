//const Record = require('../models/Record');
const firebaseApp = require('../config/db/index');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where
} = require('firebase/firestore');

const db = getFirestore(firebaseApp);
exports.Login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const accountRef = collection(db, "account");
        const q = query(accountRef,
            where("username", "==", username),
            where("password", "==", password)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            res.status(400).send('No matching documents');
        } else {
            const accountSnap = querySnapshot.docs[0];
            res.status(200).send('Login successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}
