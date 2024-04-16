import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class GardenManagerView extends ConsumerWidget {
  const GardenManagerView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final AdafruitSystemRecord = ref.watch(adafruitSystemProvider)!;
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(
            "Garden manager",
            style: TextStyle(
              color: Color.fromARGB(255, 255, 255, 255),
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          backgroundColor: const Color.fromARGB(255, 1, 94, 58),
        ),
        body: Form(
          key: GlobalKey<FormState>(),
          child: Column(
            children: <Widget>[
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.username,
                  decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Adafruit Username',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: '100m^2',
                  decoration: const InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Area',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.threshold_humid.toString(),
                  decoration: const InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Humidity Threshold (%)',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.threshold_light.toString(),
                  decoration: const InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Light Threshold (Lux)',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.threshold_temp.toString(),
                  decoration: const InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Temperature Threshold (°C)',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.TempFeed,
                  decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Temperature Feed',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.LightFeed,
                  decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Light Feed',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.HumidFeed,
                  decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Humidity Feed',
                  )),
              TextFormField(
                  enabled: false,
                  initialValue: AdafruitSystemRecord.LightBulbFeed,
                  decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    labelText: 'Light Bulb Feed',
                  )),
              Padding(
                padding: EdgeInsets.all(16.0),
              ),
              ElevatedButton(
                onPressed: () {},
                child: Text("Finish"),
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(
                    Color.fromARGB(255, 1, 94, 58),
                  ),
                ),
              )
            ],
          ),
        ));
  }
}
