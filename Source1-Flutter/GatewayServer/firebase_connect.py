
# from Adafruit_IO import Client
# import serial.tools.list_ports
# import serial

# AIO_FEED_ID = ["tempsensor-temp", "lightsensor", "humiditysensor"]
# AIO_USERNAME = "ThuanKhang"
# AIO_KEY = "aio_Cjdy59IWG0wQofeuPC1oGoVZezfi"


# client = Client(AIO_USERNAME, AIO_KEY)

# def subscribe(client, userdata, mid, granted_qos):
#     print("Subscribe thanh cong...")
    
# def message (client, feed_id, payload):
#     print("Nhan du lieu: " + payload)
#     ser.write((str(payload) + "#").encode())
    
# def getPort():
#     ports = serial.tools.list_ports.comports()
#     N = len(ports)
#     commPort = "None"
#     for i in range (0, N):
#         port = ports[i]
#         strPort = str(port)
#         if "COM4" in strPort: ##mac dinh chuong trinh dung port COM4
#             splitPort = strPort.split(" ")
#             commPort = splitPort[0]
#     return commPort
    
# ser = serial.Serial(port = getPort(), baudrate = 115200)

# # Get an array of all data from feed 'Test'
# data = client.data('tempsensor-temp', max_results=3)
# print(client.receive('tempsensor-temp'))
# client.on_subscribe = subscribe
# client.on_message = message



class SystemRecord:
    def __init__(self, API_Key, LightBulbFeed, TempFeed, HumidFeed, LightFeed, threshold_humid, threshold_light, threshold_temp):
        self.API_Key = API_Key
        self.LightBulbFeed = LightBulbFeed
        self.TempFeed = TempFeed
        self.HumidFeed = HumidFeed
        self.LightFeed = LightFeed
        self.threshold_humid = threshold_humid
        self.threshold_light = threshold_light
        self.threshold_temp = threshold_temp
    def to_dict(self):
        return {
            'API_Key': self.API_Key,
            'LightBulbFeed': self.LightBulbFeed,
            'TempFeed': self.TempFeed,
            'HumidFeed': self.HumidFeed,
            'LightFeed': self.LightFeed,
            'threshold_humid': self.threshold_humid, 
            'threshold_light': self.threshold_light, 
            'threshold_temp': self.threshold_temp
        }
import time
import paho.mqtt.client as mqtt
import json
import firebase_admin
from firebase_admin import credentials, firestore
import queue
from datetime import datetime
import pytz
#########################################################
# Firebase credentials
cred = credentials.Certificate('GatewayServer//farmsmass-firebase-adminsdk-xracd-4ee4e1fcdb.json')
firebase_admin.initialize_app(cred)

# Initialize Cloud Firestore client
db = firestore.client()
transaction = db.transaction()
# Initialize queue
q = queue.Queue()

#Time convert
def time_convert(timestamp_str):
    utc_time = datetime.strptime(timestamp_str, "%Y-%m-%dT%H:%M:%S.%fZ")
    utc_time = utc_time.replace(tzinfo=pytz.UTC)
    gmt7_time = utc_time.astimezone(pytz.timezone("Asia/Bangkok"))
    gmt7_date = utc_time.date()
    return gmt7_time, gmt7_date

# Define function to handle transaction
@firestore.transactional
def handle_transaction(transaction, feed_type, value, timestamp, feed_name):
    datetime1, date = time_convert(timestamp)
    
    # Create transaction to create Firestore document
    notif_message = ""
    notif_type = ""

    if feed_type == "ActivityRecord" and value == 0:
            notif_message = f"{feed_name} has been turned off"
            notif_type = "Acitivity"
    elif feed_type == "ActivityRecord" and value == 1:
            notif_message = f"{feed_name} has been turned on"
            notif_type = "Acitivity"
    elif feed_type == 'TempRecord' and value > UserData.threshold_temp:
            notif_message = "The temperature has exceeded the threshold, please water"
            notif_type = "Warning"
    elif feed_type == 'LightRecord' and value > UserData.threshold_light:
            notif_message = "The light has exceeded the threshold, please lower"
            notif_type = "Warning"
    elif feed_type == 'HumidRecord' and value > UserData.threshold_humid:
            notif_message = "The humidity has exceeded the threshold, please dry"
            notif_type = "Warning"

    if notif_message:
        print(f"Notified: {notif_message}")
        notifs_record = db.collection("Notifications")
        feed_record = notifs_record.document()
        feed_record.set({"Description": notif_message, "Time": datetime1, "user_id": api_key, 'notif_type': notif_type})
        notif_message = ""
    

    feed_type_record = db.collection(f"{feed_type}")
    feed_record = feed_type_record.document(f"{feed_name}")
    date_record = feed_record.collection(str(date)) #ref collection
    newRecordDoc = date_record.document()
    transaction.set(newRecordDoc, {"Value": value, "Time": datetime1}) #set the new record using trans
    print("Data added to Firebase")

# Define function to handle message
def handle_message(data):
        # Parse JSON data from message
        value = int(data["last_value"])
        timestamp = data['data']["created_at"]
        feed_name = data['key']
        print(feed_name)
        # print(timestamp)
        if(feed_name == getattr(UserData,'TempFeed')):
            feed_type = 'TempRecord'
        elif(feed_name == getattr(UserData,'LightFeed')):
            feed_type = 'LightRecord'
        elif (feed_name == getattr(UserData,'HumidFeed')):
             feed_type = 'HumidRecord'
        elif (feed_name == getattr(UserData,'LightBulbFeed')):
             feed_type = 'ActivityRecord'
        # Handle transaction
        handle_transaction(transaction, feed_type, value, timestamp, feed_name)

#########################################################
# Adafruit IO credentials
username = "ThuanKhang"
api_key = "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC"

# MQTT broker address and port
broker_address = "io.adafruit.com"
broker_port = 1883

systemRecordRef = db.collection('SystemRecord').where(u'API_Key', u'==', api_key).limit(1)

systemRecord = systemRecordRef.get()
if len(systemRecord) > 0:
    # Map document to data class
    UserData = SystemRecord(
        API_Key=systemRecord[0].to_dict()['API_Key'],
        LightBulbFeed=systemRecord[0].to_dict()['LightBulbFeed'],
        TempFeed=systemRecord[0].to_dict()['TempFeed'],
        HumidFeed=systemRecord[0].to_dict()['HumidFeed'],
        LightFeed=systemRecord[0].to_dict()['LightFeed'],
        threshold_humid=systemRecord[0].to_dict()['threshold_humid'],
        threshold_light=systemRecord[0].to_dict()['threshold_light'],
        threshold_temp=systemRecord[0].to_dict()['threshold_temp']
    )
    # print(UserData.API_Key)
    # print(UserData.LightBulbFeed)
    # print(UserData.TempFeed)
    # print(UserData.HumidFeed)
    # print(UserData.LightFeed)
    # print(UserData.threshold_humid)
else:
    print('No such document!')

# Feeds to subscribe to
feed_name = ["tempsensor-temp", "lightsensor", "humiditysensor", "light-bulb"]

# Callback function to handle incoming messages
def on_message(client, userdata, message):
        # Parse JSON payload
        payload = json.loads(message.payload.decode())
        print("New data has been added to the queue")
        q.put(payload)
        print(payload)
        # Define function to process messages from queue
        while q.qsize() > 0:
            try:
                # Get message from queue
                data = q.get()
                # Handle message
                handle_message(data)
            except Exception as e:
                # Handle any errors that may occur during processing
                print(f"Error: {e}" + "\nRetrying...")
                # Re-queue message for retry
                q.put(data)
                # Wait before retrying
                time.sleep(10)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        client.connected_flag = True #set flag
        print("Connected successfully to the broker")
    else:
        print("Bad connection returned code = ", rc)

mqtt.Client.connected_flag = False #create flag in class
# Create MQTT client instance
client = mqtt.Client()

# Set username and API key for authentication
client.username_pw_set(username, api_key)

# Connect to MQTT broker
client.connect(broker_address, broker_port)

# Subscribe to feed
for feed in feed_name:
    client.subscribe("{}/feeds/{}/json".format(username, feed))

# Set callback function for incoming messages
client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()

print("Connecting to broker ",broker_address)
client.connect(broker_address, broker_port) #connect to broker
while not client.connected_flag: #wait in loop
    print("In wait loop")
    time.sleep(1)
print("in Main Loop")