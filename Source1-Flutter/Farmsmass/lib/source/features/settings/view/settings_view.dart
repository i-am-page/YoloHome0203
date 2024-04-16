import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:getwidget/getwidget.dart';

class SettingsView extends ConsumerWidget {
  const SettingsView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        appBar: AppBar(
          title: Text("App Settings"),
          backgroundColor: Colors.blue,
        ),
        body: Card(
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: const [
              Padding(padding: EdgeInsets.all(25)),
              // GFListTile(
              //     titleText: 'Username',
              //     subTitleText: 'Edit Username',
              //     icon: Icon(Icons.favorite)),
              // GFListTile(
              //     titleText: 'Password',
              //     subTitleText: 'Edit Password',
              //     icon: Icon(Icons.favorite)),
              // GFListTile(
              //     titleText: 'Garden',
              //     subTitleText: 'Change information about the garden',
              //     icon: Icon(Icons.favorite)),
              GFListTile(
                  titleText: 'App Settings',
                  subTitleText: 'Light/Dark Mode, Languages,...',
                  icon: Icon(Icons.favorite)),
              GFListTile(
                  titleText: 'About',
                  subTitleText: 'Meet the creators',
                  icon: Icon(Icons.favorite)),
            ])));
  }
}
