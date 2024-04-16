import 'dart:async';
import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/adafruit_client/model/data_model.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/failure_message.dart';
import 'package:farm_smass/source/utils/provider/firebase_provider.dart';
import 'package:farm_smass/source/utils/type_defs.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
/*
final AdafruitSystemRecordModel _systemRecordModel = AdafruitSystemRecordModel(
    1883,
    "humiditysensor",
    "tempsensor-temp",
    "lightsensor",
    "light-bulb",
    "io.adafruit.com",
    "ThuanKhang",
    "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC");*/
/*
final adafruitMQTTServiceProvider = Provider((ref) => AdafruitMQTTService(
    username: _systemRecordModel.username, key: _systemRecordModel.API_Key));

final messageStreamProvider = StreamProvider(
    (ref) => ref.watch(adafruitMQTTServiceProvider).messageStream);

class AdafruitMQTTService {
  late MqttServerClient _client;
  final String _username;
  final String _key;
  final List<String> _messages = [];
  AdafruitMQTTService({required String username, required String key})
      : _username = username,
        _key = key;

  final StreamController<List<String>> _messageStreamController =
      StreamController.broadcast();

  Future<void> connect() async {
    try {
      _client = MqttServerClient('io.adafruit.com', _key);
      _client.port = 1883;
      _client.keepAlivePeriod = 60;

      _client.logging(on: true);

      final connMessage = MqttConnectMessage()
          .authenticateAs(_username, _key)
          .withClientIdentifier('myClientID')
          .withWillTopic(
              'willtopic') // If you set this you must set a will message
          .withWillMessage('My Will message')
          .startClean() // Non persistent session for testing
          .withWillQos(MqttQos.atMostOnce);

      _client.connectionMessage = connMessage;

      await _client.connect();
      print("connected");
      //subscribe(_systemRecordModel.HumidFeed);
      subscribe(_systemRecordModel.TempFeed);
      //subscribe(_systemRecordModel.LightFeed);
    } catch (e) {
      print('Error: $e');
    }
  }

  void subscribe(String feed) {
    String topic = "$_username/feeds/$feed";
    _client.subscribe(topic, MqttQos.atMostOnce);
    print("subscribed to");
    _client.updates?.listen((List<MqttReceivedMessage<MqttMessage>> c) {
      final MqttPublishMessage message = c[0].payload as MqttPublishMessage;
      final String payload =
          MqttPublishPayload.bytesToStringAsString(message.payload.message);

      print('Received message:$payload from topic:${c[0].topic}>');
      _messages.add(payload);
      _messageStreamController.add(List<String>.from(_messages));
    });
  }

  void unsubscribe(String feed) {
    String topic = "$_username/feeds/$feed/json";
    _client.unsubscribe(topic);
  }

  void publish(String feed, String message) {
    String topic = "$_username/feeds/$feed";
    final MqttClientPayloadBuilder builder = MqttClientPayloadBuilder();
    builder.addString(message);
    _client.publishMessage(topic, MqttQos.exactlyOnce, builder.payload!);
  }

  void disconnect() {
    _client.disconnect();
    _messageStreamController.close();
  }

  Stream<List<String>> get messageStream => _messageStreamController.stream;
}
*/
/*
final adafruitMQTTServiceProvider = Provider((ref) => AdafruitMQTTService(
    username: ref.watch(systemRecordProvider)!.username,
    key: ref.watch(systemRecordProvider)!.API_Key));*/

final adafruitMQTTServiceProvider = Provider(
    (ref) => AdafruitMQTTService(firestore: ref.watch(firestoreProvider)));

class AdafruitMQTTService {
  final FirebaseFirestore _firestore;
  late MqttServerClient _client;

  AdafruitMQTTService({required FirebaseFirestore firestore})
      : _firestore = firestore;

  /*final StreamController<DataModel> _messageStreamController =
      StreamController.broadcast();*/

  Future<void> connect(String broker, String username, String key) async {
    try {
      _client = MqttServerClient(broker, key);
      _client.port = 1883;

      _client.logging(on: true);

      final connMessage = MqttConnectMessage()
          .authenticateAs(username, key)
          .withClientIdentifier('myClientID')
          .withWillTopic(
              'willtopic') // If you set this you must set a will message
          .withWillMessage('My Will message')
          .startClean() // Non persistent session for testing
          .withWillQos(MqttQos.atMostOnce);

      _client.connectionMessage = connMessage;

      await _client.connect();
      print("connected");
    } catch (e) {
      print('Error: $e');
    }
  }

  void subscribe(String username, String feed) {
    String topic = "$username/feeds/$feed/json";
    _client.subscribe(topic, MqttQos.atMostOnce);
    print("subscribed to");
    _client.updates?.listen((List<MqttReceivedMessage<MqttMessage>> c) {
      final MqttPublishMessage message = c[0].payload as MqttPublishMessage;
      final String payload =
          MqttPublishPayload.bytesToStringAsString(message.payload.message);
      print('Received message:$payload from topic:${c[0].topic}>');

      //_messageStreamController.add(DataModel.fromJson(payload));
    });
  }

  void unsubscribe(String username, String feed) {
    String topic = "$username/feeds/$feed/json";
    _client.unsubscribe(topic);
  }

  void publish(String username, String feed, String message) {
    String topic = "$username/feeds/$feed";
    final MqttClientPayloadBuilder builder = MqttClientPayloadBuilder();
    builder.addString(message);
    _client.publishMessage(topic, MqttQos.exactlyOnce, builder.payload!);
  }

  void disconnect() {
    _client.disconnect();
    //_messageStreamController.close();
  }

  bool isConnected() {
    return _client.connectionStatus!.state == MqttConnectionState.connected;
  }
  /*
  FutureEither<AdafruitSystemRecordModel> getSystemRecord(String uid) async {
    try {
      final systemRecord = await getSystemRecordByID(uid).first;
      return right(systemRecord);
    } catch (e) {
      return left(FailureMessage(e.toString()));
    }
  }*/

  CollectionReference get _systemRecord =>
      _firestore.collection(FirebaseConstants.systemRecordCollection);

  Stream<AdafruitSystemRecordModel> getSystemRecordByID(String user_id) {
    return _systemRecord.doc(user_id).snapshots().map((event) {
      return AdafruitSystemRecordModel.fromMap(
          event.data() as Map<String, dynamic>);
    });

    //Stream<DataModel> get messageStream => _messageStreamController.stream;
  }
}
/*
void main() async {
  String username = "ThuanKhang";
  String api_key = "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC";
  List<String> feed_name = ["tempsensor-temp", "lightsensor", "humiditysensor"];
  AdafruitMQTTService test =
      AdafruitMQTTService(key: api_key, username: username);
  await test.connect();
  test.messageStream.listen((event) {
    print("TED" + event.toString());
  });
  //test.subscribe();
}*/
