// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:farm_smass/source/features/notifications/controller/notification_controller.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:routemaster/routemaster.dart';

void navigateToHome(BuildContext context) {
  Routemaster.of(context).push("/");
}

class NotificationView extends ConsumerWidget {
  const NotificationView({
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
        appBar: AppBar(
          // Text(widget.feed_name)
          backgroundColor: const Color.fromARGB(255, 1, 94, 58),
          elevation: 0,

          leading: Padding(
            padding: EdgeInsets.only(left: screenWidth * 0.02),
            child: IconButton(
              icon: Icon(Icons.arrow_back, size: screenHeight * 0.04),
              onPressed: () {
                navigateToHome(context);
              },
            ),
          ),
          centerTitle: true,
          title: Text(
            "Notifications",
            style: TextStyle(
              color: Color.fromARGB(255, 255, 255, 255),
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        body: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
              ref.watch(notificationStreamProvider).when(
                  data: (notifs) => ListView.builder(
                      shrinkWrap: true,
                      itemCount: notifs.length,
                      scrollDirection: Axis.vertical,
                      itemBuilder: (BuildContext context, int index) {
                        final notif = notifs[index];
                        return ListTile(
                          title: Text(notif.Description),
                          trailing: Text(notif.Time.toIso8601String()),
                        ); //UI Build Card
                      }),
                  error: (error, StackTrace) => Text(error.toString()),
                  loading: () => LoaderCircle(SingleChildScrollView: null)),
            ])));
  }
}
