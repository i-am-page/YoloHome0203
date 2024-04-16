import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/sensor_data/model/sensor_data_model.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/provider/firebase_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final sensorDataServiceProvider = Provider<SensorDataService>((ref) {
  return SensorDataService(firestore: ref.watch(firestoreProvider));
});

class SensorDataService {
  final FirebaseFirestore _firestore;
  SensorDataService({
    required FirebaseFirestore firestore,
  }) : _firestore = firestore;
  Stream<List<SensorDataModel>> getDataPoints(
      String collectionRef, String feed_name, String date) {
    String collectionName = collectionRef + "/" + feed_name + "/" + date;
    return _firestore
        .collection(collectionName)
        .orderBy("Time")
        .snapshots()
        .map((event) {
      return event.docs
          .map((e) => SensorDataModel.fromMap(e.data() as Map<String, dynamic>))
          .toList();
    });
    /*_HumidRecord.snapshots().map((event) {
      return event.docs
          .map((e) => SensorDataModel.fromMap(e.data as Map<String, dynamic>))
          .toList();
    });*/
  }

  Stream<List<SensorDataModel>> test() {
    return _firestore
        .collection("HumidRecord/humiditysensor/2023-04-21")
        .orderBy("Time")
        .snapshots()
        .map((event) {
      return event.docs
          .map((e) => SensorDataModel.fromMap(e.data() as Map<String, dynamic>))
          .toList();
    });
  }
}
