import 'package:farm_smass/main.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/notifications/model/notification_model.dart';
import 'package:farm_smass/source/features/notifications/service/notification_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final notificationStreamProvider = StreamProvider((ref) {
  final notifController = ref.watch(NotificationControllerProvider.notifier);
  return notifController.getNotifs();
});

final NotificationControllerProvider =
    StateNotifierProvider<NotificationController, bool>((ref) {
  final notifservice = ref.watch(NotificationServiceProvider);
  return NotificationController(notifService: notifservice, ref: ref);
});

//////////////////////////////////////////
class NotificationController extends StateNotifier<bool> {
  final NotificationService _notifService;
  final Ref _ref;

  NotificationController(
      {required NotificationService notifService, required Ref ref})
      : _notifService = notifService,
        _ref = ref,
        super(false);

  void createGroup() {
    //todo
  }

  Stream<List<NotificationModel>> getNotifs() {
    final uid = _ref.watch(userProvider)!.uid;
    return _notifService.getNotifs(uid);
  }
}
