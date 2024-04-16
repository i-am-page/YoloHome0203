import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:farm_smass/source/features/notifications/model/notification_model.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/provider/firebase_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final NotificationServiceProvider = Provider((ref) {
  return NotificationService(firestore: ref.watch(firestoreProvider), ref: ref);
});

class NotificationService {
  final FirebaseFirestore _firestore;
  final Ref _ref;
  NotificationService({required FirebaseFirestore firestore, required Ref ref})
      : _firestore = firestore,
        _ref = ref;

  /*
  TODO
  FutureVoid createGroup() async {
    
  }*/
  Stream<List<NotificationModel>> getNotifs(String user_id) {
    return _notificationCollection
        .where('user_id',
            isEqualTo: _ref.watch(adafruitSystemProvider)!.API_Key)
        .orderBy("Time", descending: true)
        .snapshots()
        .map((event) {
      return event.docs
          .map((e) =>
              NotificationModel.fromMap(e.data() as Map<String, dynamic>))
          .toList();
    });
  }

  void sendNotification(String message) async {
    final notificationRef = _firestore.collection('notifications').doc();
    NotificationModel notif = NotificationModel(
        Description: message,
        Time: DateTime.now(),
        user_id: _ref.watch(adafruitSystemProvider)!.API_Key);
    await notificationRef.set(notif.toMap());
  }
  /*
  Stream<NotificationModel> getPlantGroupDetailByID(String group_id) {
    return _notificationCollection.doc(group_id).snapshots().map((event) =>
        NotificationModel.fromMap(event.data() as Map<String, dynamic>));
  }*/

  CollectionReference get _notificationCollection =>
      _firestore.collection(FirebaseConstants.notificationCollection);
  /*
  static final NotificationService _notificationService =
      NotificationService._internal();

  factory NotificationService() {
    return _notificationService;
  }

  NotificationService._internal();*/
}
