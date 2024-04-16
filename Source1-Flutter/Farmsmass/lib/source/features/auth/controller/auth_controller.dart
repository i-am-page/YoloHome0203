import 'package:farm_smass/main.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/auth/model/system_record_model.dart';
import 'package:farm_smass/source/features/auth/model/user_model.dart';
import 'package:farm_smass/source/features/auth/service/auth_service.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:farm_smass/source/utils/show_notif.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final userProvider = StateProvider<UserModel?>((ref) {
  ref.listenSelf((previous, next) {
    print('$next => $previous');
  });

  ref.onDispose(() {
    print('userProvider has been disposed');
  });
  return /*UserModel(name: '', email: '', uid: '')*/ null;
});
/*
final systemRecordProvider = StateProvider<SystemRecordModel?>((ref) {
  ref.listenSelf((previous, next) {
    print('$next => $previous');
  });

  ref.onDispose(() {
    print('userProvider has been disposed');
  });
  return SystemRecordModel(
      port: 1883,
      HumidFeed: "",
      LightFeed: "",
      TempFeed: "",
      LightBulbFeed: "",
      broker: "io.adafruit.com",
      username: "",
      API_Key: "");
}
/*
    SystemRecordModel(
        port: 1883,
        HumidFeed: "",
        LightFeed: "",
        TempFeed: "",
        LightBulbFeed: "",
        broker: "io.adafruit.com",
        username: "",
        API_Key: "")*/
    );*/

final selectedSystemProvider = Provider((ref) {
  return SystemRecordModel(
      port: 1883,
      HumidFeed: "humidsensor",
      LightFeed: "lightsensor",
      TempFeed: "tempsensor-temp",
      LightBulbFeed: "light-bulb",
      broker: "io.adafruit.com",
      username: "ThuanKhang",
      API_Key: "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC");
});

final authControllerProvider = StateNotifierProvider<AuthController, bool>(
    (ref) =>
        AuthController(authService: ref.read(AuthServiceProvider), ref: ref));

final authStateChangeProvider = StreamProvider((ref) {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.authStateChange;
});

final getUserDataProvider = StreamProvider.family((ref, String uid) {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.getUserData(uid);
});

class AuthController extends StateNotifier<bool> {
  final AuthService _authService;
  final Ref _ref;
  AuthController({required AuthService authService, required Ref ref})
      : _authService = authService,
        _ref = ref,
        super(false); //khong load gi het nen set false

  Stream<User?> get authStateChange => _authService.authStateChange;

  void signInWithMail(BuildContext context, String mail, String pw) async {
    state = true; //bat dau load
    final user = await _authService.signInWithMail(mail, pw);
    state = false; //het load
    //user.fold((l),(r))
    user.fold((failureMess) => showSnackBar(context, failureMess.message),
        (userModel) {
      _ref.read(userProvider.notifier).update((state) => userModel);
    });
  }

  void signOut() async {
    _authService.signOut();
    _ref.watch(userProvider.notifier).update((state) => null);
  }

  Stream<UserModel> getUserData(String uid) {
    return _authService.getUserData(uid);
  }
}
