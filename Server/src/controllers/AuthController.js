const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
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
dotenv.config();

const register = async (req, res) => {
    //--------------------------------
    const { username, password } = req.body;
    const accountRef = collection(db, "account");
    const q = query(accountRef,
        where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        // Hash the password
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(password, salt);

        //store user to firestore
        const docRef = await addDoc(accountRef, {
            username,
            password: hashedPassword
        });
        res.status(201).send('User registered successfully');
    } else {
        res.status(400).send('User already exists');
    }
};

const authenticate = async (req, res) => {
    //--------------------------------
    const { username, password } = req.body;
    console.log(req.body)
    const accountRef = collection(db, "account");
    const q = query(accountRef,
        where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
         return res.status(400).send('User not found');
    } else {
        const accountSnap = querySnapshot.docs[0];
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, accountSnap.data().password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }
        // Create a JWT
        const token = jwt.sign({ username: accountSnap.data().username }, process.env.JWT_SECRET);
        res.status(200).json({token});
    }
};

module.exports = {
    register,
    authenticate,
};

