import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/provider/firebase_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final adafruitClientServiceProvider = Provider<AdafruitClientService>((ref) {
  return AdafruitClientService(firestore: ref.watch(firestoreProvider));
});

class AdafruitClientService {
  final FirebaseFirestore _firestore;
  AdafruitClientService({required FirebaseFirestore firestore})
      : _firestore = firestore;

  CollectionReference get _systemRecord =>
      _firestore.collection(FirebaseConstants.systemRecordCollection);

  Stream<AdafruitSystemRecordModel> getSystemRecordByID(String user_id) {
    return _systemRecord.doc(user_id).snapshots().map((event) =>
        AdafruitSystemRecordModel.fromMap(
            event.data() as Map<String, dynamic>));
  }
}
