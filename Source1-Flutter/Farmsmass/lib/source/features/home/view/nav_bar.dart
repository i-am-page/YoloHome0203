import 'package:flutter/material.dart';
import 'package:routemaster/routemaster.dart';

class MyBottomNavigationBar extends StatefulWidget {
  const MyBottomNavigationBar({Key? key}) : super(key: key);

  @override
  _MyBottomNavigationBarState createState() => _MyBottomNavigationBarState();
}

class _MyBottomNavigationBarState extends State<MyBottomNavigationBar> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _currentIndex,
      onTap: (index) {
        setState(() {
          _currentIndex = index;
        });
        switch (index) {
          case 0:
            Routemaster.of(context).push('/');
            break;
          case 1:
            Routemaster.of(context).push('/account');
            break;
          case 2:
            Routemaster.of(context).push('/garden');
            break;
        }
      },
      items: [
        BottomNavigationBarItem(
          label: 'Home',
          icon: Icon(Icons.home),
        ),
        BottomNavigationBarItem(
          label: 'account',
          icon: Icon(Icons.search),
        ),
        BottomNavigationBarItem(
          label: 'garden',
          icon: Icon(Icons.person),
        ),
      ],
    );
  }
}
