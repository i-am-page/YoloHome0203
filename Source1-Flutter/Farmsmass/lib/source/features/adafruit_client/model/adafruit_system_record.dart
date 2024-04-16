import 'dart:convert';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class AdafruitSystemRecordModel {
  final int port;
  final String HumidFeed;
  final String LightFeed;
  final String TempFeed;
  final String LightBulbFeed;
  final String broker;
  final String username;
  final String API_Key;
  final int threshold_humid;
  final int threshold_light;
  final int threshold_temp;

  AdafruitSystemRecordModel(
    this.port,
    this.HumidFeed,
    this.LightFeed,
    this.TempFeed,
    this.LightBulbFeed,
    this.broker,
    this.username,
    this.API_Key,
    this.threshold_humid,
    this.threshold_light,
    this.threshold_temp,
  );

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'port': port,
      'HumidFeed': HumidFeed,
      'LightFeed': LightFeed,
      'TempFeed': TempFeed,
      'LightBulbFeed': LightBulbFeed,
      'broker': broker,
      'username': username,
      'API_Key': API_Key,
      'threshold_humid': threshold_humid,
      'threshold_light': threshold_light,
      'threshold_temp': threshold_temp,
    };
  }

  factory AdafruitSystemRecordModel.fromMap(Map<String, dynamic> map) {
    return AdafruitSystemRecordModel(
      map['port'] as int,
      map['HumidFeed'] as String,
      map['LightFeed'] as String,
      map['TempFeed'] as String,
      map['LightBulbFeed'] as String,
      map['broker'] as String,
      map['username'] as String,
      map['API_Key'] as String,
      map['threshold_humid'] as int,
      map['threshold_light'] as int,
      map['threshold_temp'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory AdafruitSystemRecordModel.fromJson(String source) =>
      AdafruitSystemRecordModel.fromMap(
          json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'AdafruitSystemRecordModel(port: $port, HumidFeed: $HumidFeed, LightFeed: $LightFeed, TempFeed: $TempFeed, LightBulbFeed: $LightBulbFeed, broker: $broker, username: $username, API_Key: $API_Key, threshold_humid: $threshold_humid, threshold_light: $threshold_light, threshold_temp: $threshold_temp)';
  }

  AdafruitSystemRecordModel copyWith({
    int? port,
    String? HumidFeed,
    String? LightFeed,
    String? TempFeed,
    String? LightBulbFeed,
    String? broker,
    String? username,
    String? API_Key,
    int? threshold_humid,
    int? threshold_light,
    int? threshold_temp,
  }) {
    return AdafruitSystemRecordModel(
      port ?? this.port,
      HumidFeed ?? this.HumidFeed,
      LightFeed ?? this.LightFeed,
      TempFeed ?? this.TempFeed,
      LightBulbFeed ?? this.LightBulbFeed,
      broker ?? this.broker,
      username ?? this.username,
      API_Key ?? this.API_Key,
      threshold_humid ?? this.threshold_humid,
      threshold_light ?? this.threshold_light,
      threshold_temp ?? this.threshold_temp,
    );
  }

  @override
  bool operator ==(covariant AdafruitSystemRecordModel other) {
    if (identical(this, other)) return true;

    return other.port == port &&
        other.HumidFeed == HumidFeed &&
        other.LightFeed == LightFeed &&
        other.TempFeed == TempFeed &&
        other.LightBulbFeed == LightBulbFeed &&
        other.broker == broker &&
        other.username == username &&
        other.API_Key == API_Key &&
        other.threshold_humid == threshold_humid &&
        other.threshold_light == threshold_light &&
        other.threshold_temp == threshold_temp;
  }

  @override
  int get hashCode {
    return port.hashCode ^
        HumidFeed.hashCode ^
        LightFeed.hashCode ^
        TempFeed.hashCode ^
        LightBulbFeed.hashCode ^
        broker.hashCode ^
        username.hashCode ^
        API_Key.hashCode ^
        threshold_humid.hashCode ^
        threshold_light.hashCode ^
        threshold_temp.hashCode;
  }
}
