import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/adafruit_client/model/data_model.dart';
import 'package:farm_smass/source/features/adafruit_client/service/adafruit_client_service.dart';
import 'package:farm_smass/source/features/adafruit_client/service/adafruit_mqtt_client_service.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/show_notif.dart';
import 'package:farm_smass/source/utils/type_defs.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart';

/*
final AdafruitSystemRecordModel _systemRecordModel = AdafruitSystemRecordModel(
    1883,
    "humiditysensor",
    "tempsensor-temp",
    "lightsensor",
    "light-bulb",
    "io.adafruit.com",
    "ThuanKhang",
    "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC");
*/
/*
final selectedSystemProvider = Provider<AdafruitSystemRecordModel>((ref) {
  return _systemRecordModel;
});

final adafruitClientControllerProvider = Provider((ref) =>
    AdafruitClientController(sysModel: ref.watch(selectedSystemProvider)));

final messageStreamProvider = StreamProvider((ref) {
  final controller = ref.watch(adafruitClientControllerProvider);
  return controller.messageStream;
});



final _adafruitMQTTServiceProvider =
    Provider.autoDispose<AdafruitMQTTService>((ref) {
  final systemRecord = ref.watch(selectedSystemProvider);
  return ref.watch(adafruitMQTTServiceProviderFamily(systemRecord));
});

final messageStreamProvider = StreamProvider.autoDispose((ref) {
  final controller = ref.watch(adafruitClientControllerProvider);
  return controller.messageStream;
});

final adafruitClientControllerProvider = Provider.autoDispose((ref) {
  final service = ref.watch(_adafruitMQTTServiceProvider);
  return AdafruitClientController(mqttService: service);
});

final selectedSystemProvider = Provider<AdafruitSystemRecordModel>((ref) {
  return _systemRecordModel;
});

final adafruitClientControllerProvider = Provider((ref) =>
    AdafruitClientController(sysModel: ref.watch(selectedSystemProvider)));

final TempMessageStreamProvider = StreamProvider((ref) {
  final controller = ref.watch(adafruitClientControllerProvider);
  return controller.TempMessageStream;
});*/
final adafruitSystemProvider = StateProvider<AdafruitSystemRecordModel?>((ref) {
  ref.listenSelf((previous, next) {
    print('$next => $previous');
  });

  ref.onDispose(() {
    print('userProvider has been disposed');
  });

  /*return AdafruitSystemRecordModel(
      1883,
      "humiditysensor",
      "tempsensor-temp",
      "lightsensor",
      "light-bulb",
      "io.adafruit.com",
      "ThuanKhang",
      "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC")*/
  null;
});

final adafruitClientControllerProvider = Provider((ref) =>
    AdafruitClientController(
        mqttService: ref.watch(adafruitMQTTServiceProvider), ref: ref));

class AdafruitClientController {
  final AdafruitMQTTService _mqttService;
  final Ref _ref;
  /*final AdafruitSystemRecordModel _sysModel;
  final List<DataModel> _TempMessages = [];

  final StreamController<List<DataModel>> _TempMessageStreamController =
      StreamController.broadcast();*/

  AdafruitClientController(
      {required AdafruitMQTTService mqttService, required Ref ref})
      : _mqttService = mqttService,
        _ref = ref;
  /*
  Future<void> initialize() async {
    await connect();
    listenToMessage();
    _TempMessages.add(DataModel(
        last_value: "0", created_at: DateTime.now(), key: "tempsensor-temp"));
    _TempMessageStreamController.add(List<DataModel>.from(_TempMessages));
  }*/

  Future<void> connect() async {
    final systemRec = _ref.watch(adafruitSystemProvider)!;
    await _mqttService.connect(
        systemRec.broker, systemRec.username, systemRec.API_Key);
  }
  /*
  void subscribe() {
    _mqttService.subscribe(_systemRecordModel.HumidFeed);
    _mqttService.subscribe(_systemRecordModel.TempFeed);
    _mqttService.subscribe(_systemRecordModel.LightFeed);
  }*/

  void publish(String topic, String message) {
    final systemRec = _ref.watch(adafruitSystemProvider);
    if (_mqttService.isConnected()) {
      _mqttService.publish(systemRec!.username, topic, message);
    } else {
      print("Retry connecting...");
      connect();
    }
  }

  void disconnect() {
    _mqttService.disconnect();
    _ref.watch(adafruitSystemProvider.notifier).update((state) => null);
  }

  Stream getSystemRecord(String uid) {
    return _mqttService.getSystemRecordByID(uid);
  }

  bool isConnected() {
    return _mqttService.isConnected();
  }
  /*
  void listenToMessage() {
    _mqttService.messageStream.listen((event) {
      if (event.key == _sysModel.TempFeed && !_TempMessages.contains(event)) {
        _TempMessages.add(event);
        _TempMessageStreamController.add(List<DataModel>.from(_TempMessages));
      }
    });
  }

  Stream<List<DataModel>> get TempMessageStream =>
      _TempMessageStreamController.stream;*/
}
