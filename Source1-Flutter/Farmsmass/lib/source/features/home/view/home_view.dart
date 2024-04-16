import 'package:farm_smass/main.dart';
import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/auth/model/user_model.dart';
import 'package:farm_smass/source/features/plant_group/controller/group_controller.dart';
import 'package:farm_smass/source/features/plant_group/model/group_model.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:flutter/material.dart';
import 'package:farm_smass/source/features/DLmodel/DLmodel.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:fpdart/fpdart.dart';
import 'package:getwidget/getwidget.dart';
import 'package:routemaster/routemaster.dart';
import 'package:intl/intl.dart';

import 'package:farm_smass/source/utils/router.dart';
import 'nav_bar.dart';
/*
void getSystem(WidgetRef ref) async {
  var systemRecord1 =
      await ref.watch(authControllerProvider.notifier).getSystemRecord().first;

  ref.read(systemRecordProvider.notifier).update((state) => systemRecord1);
}*/

class HomeView extends ConsumerWidget {
  const HomeView({super.key});

  /////////////////Navigation/////////////////
  void navigateToCreateGroup(BuildContext context) {
    Routemaster.of(context).push("/create-group");
  }

  void navigateToSettings(BuildContext context) {
    Routemaster.of(context).push("/settings");
  }

  void navigateToServerForm(BuildContext context) {
    Routemaster.of(context).push("/adaform");
  }

  void navigateToAccountManager(BuildContext context) {
    Routemaster.of(context).push("/account");
  }

  void navigateToGardenManager(BuildContext context) {
    Routemaster.of(context).push("/garden");
  }

  void navigateToDevicesController(BuildContext context) {
    Routemaster.of(context).push("/devices");
  }

  void navigateToPlantGroupDetail(
      BuildContext context, PlantGroupModel plantModel) {
    Routemaster.of(context).push("/${plantModel.id}");
  }

  void navigateToHumidSensorDataGraph(
      BuildContext context, AdafruitSystemRecordModel sysRecord) {
    Routemaster.of(context).push('/sensor_data', queryParameters: {
      'collection': FirebaseConstants.humidRecordCollection,
      'feed_name': sysRecord.HumidFeed,
      'date': DateFormat('yyyy-MM-dd').format(DateTime.now())
    });
  }

  void navigateToTempSensorDataGraph(
      BuildContext context, AdafruitSystemRecordModel sysRecord) {
    Routemaster.of(context).push('/sensor_data', queryParameters: {
      'collection': FirebaseConstants.tempRecordCollection,
      'feed_name': sysRecord.TempFeed,
      'date': DateFormat('yyyy-MM-dd').format(DateTime.now())
    });
  }

  void navigateToLightSensorDataGraph(
      BuildContext context, AdafruitSystemRecordModel sysRecord) {
    Routemaster.of(context).push('/sensor_data', queryParameters: {
      'collection': FirebaseConstants.lightRecordCollection,
      'feed_name': sysRecord.LightFeed,
      'date': DateFormat('yyyy-MM-dd').format(DateTime.now())
    });
  }

  void navigateToNotifications(BuildContext context) {
    Routemaster.of(context).push('/notif');
  }

  void navigateToAIModel(BuildContext context) {
    Routemaster.of(context).push('/ai');
  }

  /////////////////Navigation/////////////////
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //getSystem(ref);

    //final systemRecord = ref.watch(systemRecordProvider);
    //
    void signOut(WidgetRef ref) {
      ref.read(adafruitClientControllerProvider).disconnect();
      ref.read(authControllerProvider.notifier).signOut();
    }

    //
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    final user = ref.watch(userProvider)!;
    //initializeSerivce(ref, user);
    final AdafruitSystemRecord = ref.watch(adafruitSystemProvider)!;
    //final AdafruitSystemRecord = ref.watch(adafruitSystemProvider)!;
    //final user1 = ref.watch(userProvider1)!;
    //////////////////////UI Part (Card Shape Style)//////////////
    Widget buildCard(PlantGroupModel plantModel) => InkWell(
        child: Container(
            width: width * 0.45,
            margin: const EdgeInsets.only(left: 5),
            color: Colors.transparent,
            child: SizedBox(
              child: Stack(
                children: <Widget>[
                  Positioned(
                    bottom: 5,
                    left: 0,
                    child: Container(
                      height: height * 0.215,
                      width: width * 0.38,
                      decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(20)),
                        color: Color.fromARGB(215, 4, 123, 77),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: EdgeInsets.fromLTRB(
                                width * 0.03, height * 0.02, 0, 0),
                            child: Text(
                              plantModel.quantity.toString(), //Số lượng cây
                              style: const TextStyle(
                                  color: Color.fromARGB(252, 209, 254, 253),
                                  fontSize: 18),
                            ),
                          ),
                          Container(
                              padding: EdgeInsets.fromLTRB(
                                  width * 0.03, height * 0.1, 0, 0),
                              child: Text(
                                plantModel.name,
                                style: const TextStyle(
                                    color: Color.fromARGB(252, 209, 254, 253),
                                    fontSize: 18,
                                    fontWeight: FontWeight.w600),
                              )),
                          Container(
                              padding:
                                  EdgeInsets.fromLTRB(width * 0.03, 0, 0, 0),
                              child: const Text(
                                "Places",
                                style: TextStyle(
                                    color: Color.fromARGB(252, 209, 254, 253),
                                    fontSize: 15,
                                    fontWeight: FontWeight.w500),
                              )),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    height: height * 0.25,
                    alignment: Alignment.topRight,
                    child: Image.asset('assets/plants/${plantModel.imgpath}'),
                  ),
                ],
              ),
            )),
        onTap: () {
          navigateToPlantGroupDetail(context, plantModel);
        });
    //////////////////////UI Part (Card Shape Style)//////////////

    return MaterialApp(
      title: "HOME",
      home: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          toolbarHeight: height * 0.1,
          leadingWidth: width,
          elevation: 0.0,
          title: Row(
            children: [
              Expanded(
                  child: PopupMenuButton(
                icon: Icon(
                  const IconData(0xe318, fontFamily: 'MaterialIcons'),
                  color: const Color.fromARGB(255, 1, 94, 58),
                  size: height * 0.1 * 0.5 * 1.32,
                ),
                color: const Color.fromARGB(186, 31, 217, 167),
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(15.0))),
                padding: EdgeInsets.fromLTRB(0, 0, width * 0.09, 0),
                itemBuilder: (context) {
                  return [
                    PopupMenuItem(
                        padding: EdgeInsets.fromLTRB(width * 0.09,
                            height * 0.07, width * 0.09, height * 0.01),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              minimumSize: const Size.fromHeight(50),
                              backgroundColor:
                                  const Color.fromARGB(255, 0, 115, 63)),
                          child: const Text(
                            'Garden Manager',
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          onPressed: () {
                            navigateToGardenManager(context);
                          },
                        )),
                    PopupMenuItem(
                        padding: EdgeInsets.fromLTRB(width * 0.09,
                            height * 0.01, width * 0.09, height * 0.01),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              minimumSize: const Size.fromHeight(50),
                              backgroundColor:
                                  const Color.fromARGB(255, 0, 115, 63)),
                          child: const Text(
                            'Account Manager',
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          onPressed: () {
                            navigateToAccountManager(context);
                          },
                        )),
                    PopupMenuItem(
                        padding: EdgeInsets.fromLTRB(width * 0.09,
                            height * 0.01, width * 0.09, height * 0.01),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size.fromHeight(50),
                            backgroundColor:
                                const Color.fromARGB(255, 0, 115, 63),
                          ),
                          child: const Text(
                            'App Settings',
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          onPressed: () {
                            navigateToSettings(context);
                          },
                        )),
                    PopupMenuItem(
                        padding: EdgeInsets.fromLTRB(width * 0.09,
                            height * 0.01, width * 0.09, height * 0.01),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size.fromHeight(50),
                            backgroundColor:
                                const Color.fromARGB(255, 0, 115, 63),
                          ),
                          child: const Text(
                            'LOG OUT',
                            style: TextStyle(
                                color: Color.fromARGB(231, 255, 69, 69),
                                fontSize: 25,
                                fontWeight: FontWeight.w600),
                          ),
                          onPressed: () {
                            signOut(ref);
                          },
                        )),
                  ];
                },
              )),
              Expanded(
                  flex: 2,
                  child: Image.asset(
                    'assets/images/logo1.png',
                  )),
              Expanded(
                child: IconButton(
                  padding:
                      EdgeInsets.fromLTRB(width * 0.05, height * 0.0062, 0, 0),
                  icon: Stack(
                    children: <Widget>[
                      Icon(
                        const IconData(0xf3ad, fontFamily: 'MaterialIcons'),
                        color: const Color.fromARGB(255, 0, 70, 11),
                        size: height * 0.1 * 0.5 * 1.2,
                      ),
                      Positioned(
                        right: 0,
                        top: 0,
                        child: Container(
                          padding: const EdgeInsets.all(1),
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text(
                            '12',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      )
                    ],
                  ),
                  onPressed: () {
                    navigateToNotifications(context);
                  },
                ),
              )
            ],
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                  height: height * 0.07,
                  child: Row(children: [
                    Container(
                        padding: EdgeInsets.fromLTRB(width * 0.065, 0, 0, 0),
                        child: const Text(
                          "My Plants",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                              color: Color.fromARGB(255, 1, 94, 58)),
                        )),
                    IconButton(
                      padding: EdgeInsets.fromLTRB(width * 0.51, 0, 0, 0),
                      iconSize: 25,
                      icon: const Icon(Icons.my_library_add_rounded,
                          color: Color.fromARGB(255, 1, 94, 58)),
                      onPressed: () {
                        navigateToCreateGroup(context);
                      },
                    ),
                  ])),
              Container(
                padding: EdgeInsets.fromLTRB(width * 0.03, 0, 0, 0),
                height: height * 0.3,
                color: Colors.transparent,
                child: ref.watch(plantGroupsProvider).when(
                    data: (plantGroups) => ListView.builder(
                        shrinkWrap: true,
                        itemCount: plantGroups.length,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (BuildContext context, int index) {
                          final plantGroup = plantGroups[index];
                          return buildCard(plantGroup); //UI Build Card
                        }),
                    error: (error, stackTrace) => Text(error.toString()),
                    loading: () => const LoaderCircle(
                          SingleChildScrollView: null,
                        )),
              ),
              Container(
                  height: height * 0.07,
                  child: Row(children: [
                    Container(
                        padding: EdgeInsets.fromLTRB(width * 0.065, 0, 0, 0),
                        child: const Text(
                          "Explored",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                              color: Color.fromARGB(255, 1, 94, 58)),
                        )),
                    // IconButton(
                    //   padding: EdgeInsets.fromLTRB(width * 0.5, 0, 0, 0),
                    //   iconSize: 25,
                    //   icon: const Icon(Icons.more_horiz,
                    //       size: 50, color: Color.fromARGB(255, 1, 94, 58)),
                    //   onPressed: () {},
                    // ),
                  ])),
              Container(
                padding: EdgeInsets.fromLTRB(width * 0.03, 0, 0, 0),
                height: height * 0.3,
                color: Colors.transparent,
                child: ref.watch(plantGroupsProvider).when(
                    data: (plantGroups) => ListView.builder(
                        shrinkWrap: true,
                        itemCount: plantGroups.length,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (BuildContext context, int index) {
                          final plantGroup = plantGroups[index];
                          return buildCard(plantGroup); //UI Build Card
                        }),
                    error: (error, stackTrace) => Text(error.toString()),
                    loading: () => const LoaderCircle(
                          SingleChildScrollView: null,
                        )),
              ),
              Container(
                  height: height * 0.07,
                  child: Row(children: [
                    Container(
                        padding: EdgeInsets.fromLTRB(width * 0.065, 0, 0, 0),
                        child: const Text(
                          "Garden Utilities",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                              color: Color.fromARGB(255, 1, 94, 58)),
                        )),
                  ])),
              Container(
                padding:
                    EdgeInsets.fromLTRB(width * 0.065, 0, width * 0.065, 0),
                child: Column(
                  children: [
                    Row(
                      children: <Widget>[
                        Expanded(
                          child: Container(
                            height: MediaQuery.of(context).size.height * 0.1,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor:
                                    Colors.blue, // Background color
                              ),
                              onPressed: () {
                                navigateToHumidSensorDataGraph(
                                    context, AdafruitSystemRecord);
                              },
                              icon: const Icon(Icons.cabin),
                              label: const Text('Humidity Sensor'),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Container(
                            height: MediaQuery.of(context).size.height * 0.1,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.red, // Background color
                              ),
                              onPressed: () {
                                navigateToTempSensorDataGraph(
                                    context, AdafruitSystemRecord);
                              },
                              icon: const Icon(Icons.thermostat),
                              label: const Text('Temperature Sensor'),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: <Widget>[
                        Expanded(
                          child: Container(
                            height: MediaQuery.of(context).size.height * 0.1,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Color.fromARGB(
                                    255, 237, 111, 0), // Background color
                              ),
                              onPressed: () {
                                navigateToLightSensorDataGraph(
                                    context, AdafruitSystemRecord);
                              },
                              icon: const Icon(Icons.sunny),
                              label: const Text('Light Sensor',
                                  style: TextStyle(color: Colors.white)),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Container(
                            height: MediaQuery.of(context).size.height * 0.1,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor:
                                    Colors.green, // Background color
                              ),
                              icon: const Icon(Icons.settings),
                              onPressed: () {
                                navigateToDevicesController(context);
                              },
                              label: const Text('Devices Controller'),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            height: MediaQuery.of(context).size.height * 0.1,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor:
                                    Colors.blue, // Background color
                              ),
                              onPressed: () {
                                navigateToAIModel(context);
                              },
                              icon: const Icon(IconData(0xf2d2,
                                  fontFamily: 'MaterialIcons')),
                              label: const Text('AI'),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 36),
                  ],
                ),
              ),
            ],
          ),
        ),
        /*bottomNavigationBar: Container(
            height: height * 0.1,
            child: BottomNavigationBar(
              backgroundColor: Colors.transparent,
              showSelectedLabels: false,
              showUnselectedLabels: false,
              elevation: 0,
              items: <BottomNavigationBarItem>[
                BottomNavigationBarItem(
                  icon: Expanded(
                    child: Icon(IconData(0xf45f, fontFamily: 'MaterialIcons'),
                        color: Color.fromARGB(255, 1, 94, 58),
                        size: height * 0.1 * 0.5 * 1.19),
                  ),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: Expanded(
                    child: Icon(
                      IconData(
                        0xe038,
                        fontFamily: 'MaterialIcons',
                      ),
                      size: height * 0.1 * 0.5 * 1.19,
                      color: Color.fromARGB(255, 1, 94, 58),
                    ),
                  ),
                  label: 'Alarm',
                ),
              ],
            ),*/
      ),
    );
  }
}
