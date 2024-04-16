import 'package:flutter_riverpod/flutter_riverpod.dart';

final QueryParametersProvider = StateProvider<QueryParameters?>((ref) => null);

class QueryParameters {
  String collection;
  String feed_name;
  String date;

  QueryParameters(this.collection, this.feed_name, this.date);
}
