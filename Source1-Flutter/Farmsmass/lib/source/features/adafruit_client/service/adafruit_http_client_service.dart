import 'package:http/http.dart' as http;
import 'dart:convert';

class AdafruitHTTPService {
  static const String baseUrl =
      'https://io.adafruit.com/api/v2/YOUR_USERNAME/feeds/YOUR_FEED_NAME/data';

  Future<List<dynamic>> fetchData(DateTime startDate, DateTime endDate) async {
    final response = await http
        .get(Uri.parse('$baseUrl?start_time=$startDate&end_time=$endDate'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data;
    } else {
      throw Exception('Failed to fetch data');
    }
  }
}
