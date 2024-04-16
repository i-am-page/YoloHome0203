// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:farm_smass/source/features/adafruit_client/model/adafruit_system_record.dart';
import 'package:farm_smass/source/features/sensor_data/model/sensor_data_model.dart';
import 'package:farm_smass/source/features/sensor_data/service/sensor_data_service.dart';
import 'package:farm_smass/source/utils/query_parameters.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final sensorDataControllerProvider = StateNotifierProvider((ref) {
  final sensorDataService = ref.watch(sensorDataServiceProvider);
  return SensorDataController(sensorDataService: sensorDataService);
});

final getDataPointProvider =
    StreamProvider.family((ref, QueryParameters query) {
  return ref
      .watch(sensorDataControllerProvider.notifier)
      .getDataPoint(query.collection, query.feed_name, query.date);
});

final latestDataPointProvider =
    StreamProvider.family<SensorDataModel?, QueryParameters>((ref, query) {
  final dataStream =
      ref.watch(sensorDataControllerProvider.notifier).getDataPoint(
            query.collection,
            query.feed_name,
            query.date,
          );

  // Transform the stream of data points to a stream of the latest data point, or null if empty
  return dataStream
      .map((dataList) => dataList.isNotEmpty ? dataList.last : null);
});

final gettestProvider = StreamProvider((ref) {
  return ref.watch(sensorDataControllerProvider.notifier).test1();
});

class SensorDataController extends StateNotifier<bool> {
  final SensorDataService _sensorDataService;
  SensorDataController({
    required SensorDataService sensorDataService,
  })  : _sensorDataService = sensorDataService,
        super(false);

  Stream<List<SensorDataModel>> getDataPoint(
      String collectionRef, String feed_name, String date) {
    return _sensorDataService.getDataPoints(collectionRef, feed_name, date);
  }

  Stream<List<SensorDataModel>> test1() {
    return _sensorDataService.test();
  }
}
