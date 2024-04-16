//2 routes, login and logout
import 'package:farm_smass/source/features/DLmodel/DLmodel.dart';
import 'package:farm_smass/source/features/account_manager/view/account_manager.dart';
import 'package:farm_smass/source/features/adafruit_client/view/adafruitForm_view.dart';
import 'package:farm_smass/source/features/device_controller/view/device_controller.dart';
import 'package:farm_smass/source/features/notifications/view/notification_view.dart';
import 'package:farm_smass/source/features/sensor_data/view/sensor_data_view.dart';
import 'package:flutter/material.dart';
import 'package:routemaster/routemaster.dart';
import 'package:farm_smass/source/features/auth/view/login_view.dart';
import 'package:farm_smass/source/features/home/view/home_view.dart';
import 'package:farm_smass/source/features/plant_group/view/create_group_view.dart';
import 'package:farm_smass/source/features/plant_group/view/group_detail_view.dart';
import 'package:farm_smass/source/features/settings/view/settings_view.dart';
import 'package:farm_smass/source/features/settings/view/garden_view.dart';

final loggedOutRoute = RouteMap(routes: {
  '/': (_) => MaterialPage(child: LoginView()),
});

final loggedInRoute = RouteMap(routes: {
  '/': (_) => const MaterialPage(
        child: HomeView(),
      ),
  '/create-group': (_) => const MaterialPage(child: CreateGroupView()),
  '/settings': (_) => const MaterialPage(child: SettingsView()),
  '/ai': (_) => const MaterialPage(child: PlantDiseaseRecogniser()),
  '/adaform': (_) => const MaterialPage(child: AdafruitFormView()),
  '/account': (_) => const MaterialPage(child: AccountManagerView()),
  '/devices': (_) => const MaterialPage(child: DeviceControllerView()),
  '/garden': (_) => const MaterialPage(child: GardenManagerView()),
  '/notif': (_) => const MaterialPage(child: NotificationView()),
  '/sensor_data': (route) => MaterialPage(
          child: SensorDataView(
        collection: route.queryParameters['collection']!,
        feed_name: route.queryParameters['feed_name']!,
        date: route.queryParameters['date']!,
      )),
  '/:plant_group_id': (route) => MaterialPage(
      child:
          GroupDetailView(group_id: route.pathParameters['plant_group_id']!)),
});
