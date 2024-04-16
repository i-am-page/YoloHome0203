import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/adafruit_client/service/adafruit_client_service.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/auth/model/system_record_model.dart';
import 'package:farm_smass/source/features/auth/model/user_model.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:farm_smass/source/utils/router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart';
import 'package:routemaster/routemaster.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(
    const ProviderScope(child: MyApp()),
  );
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  UserModel? userModel;
  AdafruitSystemRecordModel? systemRecord;

  Future<void> getData(WidgetRef ref, User data) async {
    if (ref.watch(userProvider) == null) {
      userModel = await ref
          .watch(authControllerProvider.notifier)
          .getUserData(data.uid)
          .first;
      ref.read(userProvider.notifier).update((state) => userModel);
    }

    if (ref.watch(adafruitSystemProvider) == null) {
      systemRecord = await ref
          .watch(adafruitClientControllerProvider)
          .getSystemRecord(data.uid)
          .first;

      ref
          .watch(adafruitSystemProvider.notifier)
          .update((state) => systemRecord);
      await ref.watch(adafruitClientControllerProvider).connect();
    }
  }

  @override
  Widget build(BuildContext context) {
    return ref.watch(authStateChangeProvider).when(
          data: (data) {
            if (data != null) {
              return FutureBuilder<void>(
                future: getData(ref, data),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.done) {
                    return MaterialApp.router(
                      title: "Smart Garden",
                      routerDelegate: RoutemasterDelegate(
                        routesBuilder: (_) => loggedInRoute,
                      ),
                      routeInformationParser: const RoutemasterParser(),
                      debugShowCheckedModeBanner: false,
                    );
                  } else {
                    return const LoaderCircle(
                      SingleChildScrollView: null,
                    );
                  }
                },
              );
            } else {
              return MaterialApp.router(
                title: "Smart Garden",
                routerDelegate: RoutemasterDelegate(
                  routesBuilder: (_) => loggedOutRoute,
                ),
                routeInformationParser: const RoutemasterParser(),
                debugShowCheckedModeBanner: false,
              );
            }
          },
          error: (Object error, StackTrace stackTrace) => Text('Error:$error'),
          loading: () => const LoaderCircle(
            SingleChildScrollView: null,
          ),
        );
  }
  /*Widget build(BuildContext context) {
    
    return ref.watch(authStateChangeProvider).when(
          data: (data) => MaterialApp.router(
            title: "Smart Garden",
            routerDelegate: RoutemasterDelegate(routesBuilder: (context) {
              if (data != null) {
                getData(ref, data);

                return loggedInRoute;
              }
              return loggedOutRoute;
            }),
            routeInformationParser: const RoutemasterParser(),
            debugShowCheckedModeBanner: false,
          ),
          error: (Object error, StackTrace stackTrace) => Text('Error:$error'),
          loading: () => const LoaderCircle(
            SingleChildScrollView: null,
          ),
        );
  }*/
}

/*
class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(authStateChangeProvider).when(
          data: (data) {
            if (data != null) {
              return FutureBuilder(
                future: getData(ref, data),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const LoaderCircle(SingleChildScrollView: null);
                  } else {
                    final userModel = ref.watch(userProvider);
                    final systemRecord = ref.watch(adafruitSystemProvider);

                    return MaterialApp.router(
                      title: "Smart Garden",
                      routerDelegate:
                          RoutemasterDelegate(routesBuilder: (context) {
                        if (userModel != null && systemRecord != null) {
                          return loggedInRoute;
                        } else
                          return loggedOutRoute;
                      }),
                      routeInformationParser: const RoutemasterParser(),
                      debugShowCheckedModeBanner: false,
                    );
                  }
                },
              );
            } else {
              return MaterialApp.router(
                title: "Smart Garden",
                routerDelegate: RoutemasterDelegate(routesBuilder: (context) {
                  return loggedOutRoute;
                }),
                routeInformationParser: const RoutemasterParser(),
                debugShowCheckedModeBanner: false,
              );
            }
          },
          error: (Object error, StackTrace stackTrace) => Text('Error:$error'),
          loading: () => const LoaderCircle(
            SingleChildScrollView: null,
          ),
        );
  }

  Future<void> getData(WidgetRef ref, User data) async {
    final userModel = await ref
        .watch(authControllerProvider.notifier)
        .getUserData(data.uid)
        .first;
    ref.read(userProvider.notifier).update((state) => userModel);

    final systemRecord = await ref
        .watch(adafruitClientControllerProvider)
        .getSystemRecord(data.uid)
        .first;

    ref.watch(adafruitSystemProvider.notifier).update((state) => systemRecord);
    await ref.read(adafruitClientControllerProvider).connect();
  }
}*/

/*
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}*/