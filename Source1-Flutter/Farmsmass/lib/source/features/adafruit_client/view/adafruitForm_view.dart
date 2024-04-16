import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Define a custom Form widget.
class AdafruitFormView extends ConsumerWidget {
  const AdafruitFormView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Edit server details"),
          backgroundColor: Colors.blue,
        ),
        body: Form(
          key: GlobalKey<FormState>(),
          child: Column(
            children: <Widget>[
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Server Address',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Server Username',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Server API Key',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Temperature Feed',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Light Feed',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Humidity Feed',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Light Bulbs Feed',
              )),
              Padding(
                padding: EdgeInsets.all(16.0),
              ),
              ElevatedButton(
                  onPressed: () {}, child: Text("Finish server details"))
            ],
          ),
        ));
  }
}
