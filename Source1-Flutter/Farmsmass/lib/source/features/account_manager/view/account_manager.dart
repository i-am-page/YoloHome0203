import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AccountManagerView extends ConsumerWidget {
  const AccountManagerView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(
            "Edit account details",
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
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Username',
              )),
              TextFormField(
                  obscureText: true,
                  decoration: const InputDecoration(
                    icon: Icon(Icons.person),
                    hintText: '',
                    labelText: 'Password',
                  )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Name',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Email',
              )),
              const Padding(
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
