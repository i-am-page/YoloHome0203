// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/adafruit_client/controller/adafruit_client_controller.dart';
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/adafruit_client/service/adafruit_mqtt_client_service.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/plant_group/controller/group_controller.dart';
import 'package:farm_smass/source/features/plant_group/model/group_model.dart';
import 'package:farm_smass/source/features/sensor_data/controller/sensor_data_controller.dart';
import 'package:farm_smass/source/features/sensor_data/model/sensor_data_model.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:farm_smass/source/utils/query_parameters.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:routemaster/routemaster.dart';

/*
final AdafruitSystemRecordModel systemRecordModel = AdafruitSystemRecordModel(
    1883,
    "humiditysensor",
    "tempsensor-temp",
    "lightsensor",
    "io.adafruit.com",
    "ThuanKhang",
    "",
    "aio_kryr46NwnMtVJ0zg5XpZ9zjO9OhC");


final AdafruitMQTTService test =
    AdafruitMQTTService(systemRecord: systemRecordModel);
*/

class SensorDataView extends ConsumerStatefulWidget {
  String collection;
  String feed_name;
  String date;
  QueryParameters query;
  SensorDataView(
      {required this.collection,
      required this.feed_name,
      required this.date,
      super.key})
      : query = QueryParameters(collection, feed_name, date);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SensorDataViewState();
}

class _SensorDataViewState extends ConsumerState<SensorDataView> {
  /*void getQuery(String collection, String feed_name, String date) {
    query = QueryParameters(collection, feed_name, date);
    ref.read(QueryParametersProvider.notifier).update((state) {
      return query;
    });
  }*/

  @override
  void initState() {
    super.initState();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeRight,
      DeviceOrientation.landscapeLeft,
    ]);
  }

  @override
  dispose() {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    super.dispose();
  }

  void navigateToHome(BuildContext context) {
    Routemaster.of(context).push("/");
  }

  @override
  Widget build(BuildContext context) {
    print(widget.date);
    /*final service = ref.watch(adafruitClientControllerProvider);
    service.initialize();*/
    //getQuery(widget.collection, widget.feed_name, widget.date);
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;
    return MaterialApp(
      home: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            // Text(widget.feed_name)
            backgroundColor: const Color.fromARGB(255, 1, 94, 58),
            elevation: 0,

            leading: Padding(
              padding: EdgeInsets.only(left: screenWidth * 0.02),
              child: IconButton(
                icon: Icon(Icons.arrow_back, size: screenHeight * 0.09),
                onPressed: () {
                  navigateToHome(context);
                },
              ),
            ),
            centerTitle: true,
            title: Text(
              widget.feed_name,
              style: TextStyle(
                color: Color.fromARGB(255, 255, 255, 255),
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          body: Padding(
            padding: const EdgeInsets.all(10.0),
            child: ref.watch(getDataPointProvider(widget.query)).when(
                data: (messages) {
                  return AspectRatio(
                    aspectRatio: 2,
                    child: LineChart(
                        swapAnimationDuration:
                            Duration(milliseconds: 20), // Optional
                        swapAnimationCurve: Curves.linear, // Optional
                        LineChartData(
                            minY: 0,
                            maxY: 100,
                            lineTouchData: LineTouchData(
                                touchSpotThreshold:
                                    20, // increase the touch spot threshold to increase distance between points

                                enabled: true,
                                touchCallback: (FlTouchEvent event,
                                    LineTouchResponse? touchResponse) {
                                  // TODO : Utilize touch event here to perform any operation
                                },
                                touchTooltipData: LineTouchTooltipData(
                                  tooltipBgColor: Colors.blue,
                                  tooltipRoundedRadius: 20.0,
                                  showOnTopOfTheChartBoxArea: true,
                                  fitInsideHorizontally: true,
                                  fitInsideVertically: true,
                                  tooltipMargin: 0,
                                  getTooltipItems: (touchedSpots) {
                                    return touchedSpots.map(
                                      (LineBarSpot touchedSpot) {
                                        const textStyle = TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.w700,
                                          color: Colors.white,
                                        );
                                        final time =
                                            DateFormat('yyyy-MM-dd HH:mm:ss')
                                                .format(DateTime
                                                    .fromMicrosecondsSinceEpoch(
                                          touchedSpot.x.toInt(),
                                        ));
                                        return LineTooltipItem(
                                          '$time\n${messages[touchedSpot.spotIndex].Value.toStringAsFixed(2)}',
                                          textStyle,
                                        );
                                      },
                                    ).toList();
                                  },
                                ),
                                getTouchedSpotIndicator:
                                    (LineChartBarData barData,
                                        List<int> indicators) {
                                  return indicators.map(
                                    (int index) {
                                      final line = FlLine(
                                          color: Colors.grey,
                                          strokeWidth: 1,
                                          dashArray: [2, 4]);
                                      return TouchedSpotIndicatorData(
                                        line,
                                        FlDotData(show: false),
                                      );
                                    },
                                  ).toList();
                                },
                                getTouchLineEnd: (_, __) => double.infinity),
                            gridData: FlGridData(show: false),
                            titlesData: FlTitlesData(
                              bottomTitles: AxisTitles(
                                sideTitles: SideTitles(
                                  showTitles: false,
                                  reservedSize: 30,
                                  /*getTitlesWidget: (value, meta) {
                                    DateTime date =
                                        DateTime.fromMicrosecondsSinceEpoch(
                                      value.toInt(),
                                    );

                                    final formatter = DateFormat('HH:mm');
                                    final timeString = formatter.format(date);

                                    return Text(
                                      timeString,
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.black,
                                      ),
                                    );
                                  },*/
                                ),
                              ),
                              topTitles: AxisTitles(
                                  sideTitles: SideTitles(showTitles: false)),
                              rightTitles: AxisTitles(
                                  sideTitles: SideTitles(showTitles: false)),
                            ),
                            lineBarsData: [
                              LineChartBarData(
                                  spots: messages
                                      .map((e) => FlSpot(
                                          e.Time.microsecondsSinceEpoch
                                              .toDouble(),
                                          e.Value.toDouble()))
                                      .toList(),
                                  isCurved: false,
                                  preventCurveOverShooting: true,
                                  dotData: FlDotData(show: true))
                            ])),
                  );

                  //return Center(child: Text(messages[0]));
                  /*return ListView.builder(
                      itemCount: messages.length,
                      shrinkWrap: true,
                      scrollDirection: Axis.vertical,
                      itemBuilder: (BuildContext context, int index) {
                        return Center(
                          child: ListTile(
                              title: Text(messages[index].toString() +
                                  messages.length.toString())),
                        ); //UI
                      });*/
                },
                error: (error, stackTrace) => Text(error.toString()),
                loading: () => const LoaderCircle(
                      SingleChildScrollView: null,
                    )),
          ),
        ),
      ),
    );
  }
}

/*
class SensorDataView extends ConsumerWidget {
  final String collection;
  final String feed_name;
  final String date;
  final QueryParameters queryParameters;
  SensorDataView(
      {required this.collection,
      required this.feed_name,
      required this.date,
      super.key})
      : queryParameters = QueryParameters(collection, feed_name, date);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    /*return Container(
      child: Text(collection + feed_name + date),
    );*/
    return MaterialApp(
      home: Scaffold(
        body: ref.watch(getDataPointProvider(queryParameters)).when(
            data: (messages) {
              //return Center(child: Text(messages[0]));
              return ListView.builder(
                  itemCount: messages.length,
                  shrinkWrap: true,
                  scrollDirection: Axis.vertical,
                  itemBuilder: (BuildContext context, int index) {
                    return Center(
                      child: ListTile(
                          title: Text(messages[index].toString() +
                              messages.length.toString())),
                    ); //UI
                  });
            },
            error: (error, stackTrace) => Text(error.toString()),
            loading: () => const LoaderCircle(
                  SingleChildScrollView: null,
                )),
      ),
    );
  }
}
*/