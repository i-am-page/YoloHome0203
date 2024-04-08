const Record = require('../models/Record');
const firebaseApp = require('../config/db/index');
const axios = require('axios');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} = require('firebase/firestore');

const db = getFirestore(firebaseApp);


async function getDataFromAPI(Api) {
    try {
        const response = await axios.get(Api);
        return response.data.last_value;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function addDataToAdafruit(Api,value){
    try {
        const response = await axios.post(Api, {
            value: value
        });
        return response.data.last_value;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

exports.Index = async function (req, res) {
    try {
        //load data from adafruit to firebase
        const fan_lastvalue = await getDataFromAPI('https://io.adafruit.com/api/v2/thanhdanh2754/feeds/fan/');
        const light_lastvalue = await getDataFromAPI('https://io.adafruit.com/api/v2/thanhdanh2754/feeds/light/');
        const temp_lastvalue = await getDataFromAPI('https://io.adafruit.com/api/v2/thanhdanh2754/feeds/tempx/');
        const humidity_lastvalue = await getDataFromAPI('https://io.adafruit.com/api/v2/thanhdanh2754/feeds/humidx/');
        const lightvalue_lastvalue = await getDataFromAPI('https://io.adafruit.com/api/v2/thanhdanh2754/feeds/lightx/');

        const record = {
            time: new Date().toISOString(),
            temp: temp_lastvalue,
            light: light_lastvalue,
            humidity: humidity_lastvalue,
            lightvalue: lightvalue_lastvalue,
            fan: fan_lastvalue
        };
        await addDoc(collection(db, 'record'), record);

        //retrieve data from firebase
        const records = await getDocs(collection(db, 'record'));
        const recordArray = [];
        if (records.empty) {
            res.status(400).send('No records found');
        } else {
            records.forEach((doc) => {
                //console.log(doc.data());
                const record = new Record(
                    time = doc.data().time,
                    doc.data().temp,
                    doc.data().light,
                    doc.data().humidity,
                    doc.data().lightvalue,
                    doc.data().fan
                )
                recordArray.push(record);
            });
            res.status(200).send(recordArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


exports.Store = async function (req, res) {
    try {
        const data = req.body;
        //add data to adafruit
        await addDataToAdafruit('https://io.adafruit.com/api/v2/webhooks/feed/sUs7BVXhmMBCrh6kJcvMiYEwpqAv', data.fan);
        await addDataToAdafruit('https://io.adafruit.com/api/v2/webhooks/feed/EV7Kr8ULbGybCr8BVufY11GMJ6eB', data.light);

        //add data to firebase
        await addDoc(collection(db, 'record'), data);
        res.status(200).send('record created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

