import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:toggle_switch/toggle_switch.dart';

class DeviceControllerView extends ConsumerStatefulWidget {
  const DeviceControllerView({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _DeviceControllerViewState();
}

class _DeviceControllerViewState extends ConsumerState<DeviceControllerView> {
  List<bool> switchValues = [false, false, false, false];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          "Devices controller",
          style: TextStyle(
            color: Color.fromARGB(255, 255, 255, 255),
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: const Color.fromARGB(255, 1, 94, 58),
      ),
      body: ListView.builder(
        itemCount: 1,
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            title: Text('Light bulb'),
            trailing: Switch(
              value: switchValues[index],
              onChanged: (value) {
                if (value == true) {
                  ref
                      .watch(adafruitClientControllerProvider)
                      .publish('light-bulb', '1');
                } else if (value == false) {
                  ref
                      .watch(adafruitClientControllerProvider)
                      .publish('light-bulb', '0');
                }
                setState(() {
                  switchValues[index] = value;
                });
              },
            ),
          );
        },
      ),
    );
  }
}
