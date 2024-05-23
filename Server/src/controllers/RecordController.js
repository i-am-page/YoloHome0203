const Record = require('../models/Record');
const firebaseApp = require('../config/db/index');
const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
const { Timestamp } = require('@google-cloud/firestore');

const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    orderBy,
    query,
    limit,
    where
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

async function addDataToAdafruit(Api, value) {
    try {
        const response = await axios.post(Api, {
            value: value
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

exports.Statistics = async function (req, res) {
    try {
        const recordRef = collection(db, 'record');
        const q = query(recordRef, orderBy('time', 'desc'), limit(10));
        const records = await getDocs(q);
        const recordArray = [];
        if (records.empty) {
            res.status(400).send('No records found');
        } else {
            records.forEach((doc) => {
                const record = new Record(
                    time = doc.data().time,
                    temp = doc.data().temp,
                    light = doc.data().light,
                    humidity = doc.data().humidity,
                    lightvalue = doc.data().lightvalue,
                    fan = doc.data().fan
                )
                recordArray.push(record);
            });
            res.status(200).send(recordArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
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


        const currentTime = new Date();

        // Convert the current time to GMT+7
        const gmtPlus7Time = new Date(currentTime.getTime() + (7 * 60 * 60 * 1000));

        const record = {
            time: gmtPlus7Time.toISOString(),
            temp: temp_lastvalue,
            light: light_lastvalue,
            humidity: humidity_lastvalue,
            lightvalue: lightvalue_lastvalue,
            fan: fan_lastvalue
        };
        await addDoc(collection(db, 'record'), record);

        //retrieve data from firebase
        const recordRef = collection(db, 'record');
        const q = query(recordRef, orderBy('time', 'desc'), limit(1));
        const records = await getDocs(q);
        const recordArray = [];
        if (records.empty) {
            res.status(400).send('No records found');
        } else {
            records.forEach((doc) => {
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
            res.status(200).send(recordArray[recordArray.length - 1]);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.Store = async function (req, res) {
    try {
        const data = req.body;
        //add data to adafruit
        if (!(data.light === undefined)) {
            await addDataToAdafruit('https://io.adafruit.com/api/v2/webhooks/feed/EV7Kr8ULbGybCr8BVufY11GMJ6eB', data.light);
        }
        if (!(data.fan === undefined)) {
            await addDataToAdafruit('https://io.adafruit.com/api/v2/webhooks/feed/sUs7BVXhmMBCrh6kJcvMiYEwpqAv', data.fan);
        }
        //add data to firebase
        await addDoc(collection(db, 'record'), data);
        res.status(200).send({ status: 'record created successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


exports.Export = async function (req, res) {
    try {
        const start = new Date(req.query.start)
        const end = new Date(req.query.end)
        const recordRef = collection(db, 'record');
        const q = query(recordRef, orderBy('time', 'desc'), limit(1000));
        const records = await getDocs(q);
        if (records.empty) {
            res.status(400).send('No records found');
        } else {
            const datas = records.docs.map((doc) => {
                const time = new Date(doc.data().time);
                if (time >= start && time <= end) {
                    return {
                        time: doc.data().time,
                        temp: doc.data().temp,
                        light: doc.data().light,
                        humidity: doc.data().humidity,
                        lightvalue: doc.data().lightvalue,
                    }
                }
            }
            );

            const avgdata = () => {
                const sums = {};
                const counts = {};

                datas.forEach((data) => {
                    if (data) {
                        const date = data.time.split('T')[0];
                        if (!sums[date]) {
                            sums[date] = {
                                temp: 0,
                                humidity: 0,
                                lightvalue: 0
                            };
                            counts[date] = 0;
                        }
                        sums[date].temp += parseFloat(data.temp);
                        sums[date].humidity += parseFloat(data.humidity);
                        sums[date].lightvalue += parseFloat(data.lightvalue);
                        counts[date]++;
                    }
                });
                const averages = {};
                for (const date in sums) {

                    averages[date] = {
                        date: date,
                        avgTemperature: (sums[date].temp / counts[date]).toFixed(2),
                        avgHumidity: (sums[date].humidity / counts[date]).toFixed(2),
                        avgLuminosity: (sums[date].lightvalue / counts[date]).toFixed(2)
                    };
                }

                return averages;
            };
            const avgdatas = avgdata();
            console.log(avgdatas);

            // Create a worksheet from your data
            const ws = XLSX.utils.json_to_sheet(Object.values(avgdatas));
            // Create a workbook and add the worksheet
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');
            // Generate a temporary file path
            const tempFilePath = '/tmp/temp.xlsx';

            // Write the XLSX file to the temp path
            XLSX.writeFile(wb, tempFilePath);
            // Send the file as a response
            res.download(tempFilePath, 'temp.xlsx', () => {
                // After the file is sent, delete the temporary file
                fs.unlink(tempFilePath, (err) => {
                    if (err) {
                        console.error('Error deleting temporary file:', err);
                    }
                });
            });

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
