##Setup##
import sys
from Adafruit_IO import MQTTClient
import serial.tools.list_ports
import serial
import random # Thu vien de sinh so ngau nhien
import time # Thu vien thoi gian

##Bien toan cuc##
AIO_FEED_ID = ["tempsensor-temp", "lightsensor", "humiditysensor", "light-bulb"]
AIO_USERNAME = "ThuanKhang"
AIO_KEY = "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC"
mess = ""

##Ham chuc nang##
def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")

def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)

def message(client, feed_id, payload):
    print("Nhan du lieu " + payload + " tu feed " + feed_id)
    ser.write((str(payload) + "#").encode())

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range (0, N):
        port = ports[i]
        strPort = str(port)
        if "COM5" in strPort: ##mac dinh chuong trinh dung port COM4
            splitPort = strPort.split(" ")
            commPort = splitPort[0]
    return commPort

def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[1] == "TEMP":
        client.publish("tempsensor-temp", splitData[2])
    elif splitData[1] == "LIGHT":
        client.publish("lightsensor", splitData[2])
    elif splitData[1] == "HUMID":
        client.publish("humiditysensor", splitData[2])
    elif splitData[1] == "BULB":
        if splitData[2] == "1" or splitData[2] == "0":
            client.publish("light-bulb", splitData[2])
        else: print("Khong the day len gia tri khac 0 hoac 1")
    
def readSerial():
    bytesToRead = ser.in_waiting
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]
    
##Cau hinh Gateway##
client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

ser = serial.Serial(port = getPort(), baudrate = 115200)

while True:
    # value = random.randint(0, 100) #Tra ve nhiet do tu 1 - 100
    # print("Cap nhat: ", value)
    # client.publish("tempsensor-temp", value)
    readSerial()
    time.sleep(5) #Delay 5s