import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:getwidget/components/list_tile/gf_list_tile.dart';

class CreateGroupView extends ConsumerStatefulWidget {
  const CreateGroupView({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _CreateGroupViewState();
}

class _CreateGroupViewState extends ConsumerState<CreateGroupView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(
            "Create plant group",
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
                labelText: 'Plant name',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Plant group',
              )),
              TextFormField(
                  decoration: const InputDecoration(
                icon: Icon(Icons.person),
                hintText: '',
                labelText: 'Info',
              )),
              // TextFormField(
              //     decoration: const InputDecoration(
              //   icon: Icon(Icons.person),
              //   hintText: '',
              //   labelText: 'Temperature Feed',
              // )),
              // TextFormField(
              //     decoration: const InputDecoration(
              //   icon: Icon(Icons.person),
              //   hintText: '',
              //   labelText: 'Light Feed',
              // )),
              // TextFormField(
              //     decoration: const InputDecoration(
              //   icon: Icon(Icons.person),
              //   hintText: '',
              //   labelText: 'Humidity Feed',
              // )),
              // TextFormField(
              //     decoration: const InputDecoration(
              //   icon: Icon(Icons.person),
              //   hintText: '',
              //   labelText: 'Light Bulbs Feed',
              // )),
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
