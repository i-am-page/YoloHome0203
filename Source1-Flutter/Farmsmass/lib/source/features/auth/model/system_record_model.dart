// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class SystemRecordModel {
  final int port;
  final String HumidFeed;
  final String LightFeed;
  final String TempFeed;
  final String LightBulbFeed;
  final String broker;
  final String username;
  final String API_Key;
  SystemRecordModel({
    required this.port,
    required this.HumidFeed,
    required this.LightFeed,
    required this.TempFeed,
    required this.LightBulbFeed,
    required this.broker,
    required this.username,
    required this.API_Key,
  });

  SystemRecordModel copyWith({
    int? port,
    String? HumidFeed,
    String? LightFeed,
    String? TempFeed,
    String? LightBulbFeed,
    String? broker,
    String? username,
    String? API_Key,
  }) {
    return SystemRecordModel(
      port: port ?? this.port,
      HumidFeed: HumidFeed ?? this.HumidFeed,
      LightFeed: LightFeed ?? this.LightFeed,
      TempFeed: TempFeed ?? this.TempFeed,
      LightBulbFeed: LightBulbFeed ?? this.LightBulbFeed,
      broker: broker ?? this.broker,
      username: username ?? this.username,
      API_Key: API_Key ?? this.API_Key,
    );
  }

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
    };
  }

  factory SystemRecordModel.fromMap(Map<String, dynamic> map) {
    return SystemRecordModel(
      port: map['port'] as int,
      HumidFeed: map['HumidFeed'] as String,
      LightFeed: map['LightFeed'] as String,
      TempFeed: map['TempFeed'] as String,
      LightBulbFeed: map['LightBulbFeed'] as String,
      broker: map['broker'] as String,
      username: map['username'] as String,
      API_Key: map['API_Key'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory SystemRecordModel.fromJson(String source) =>
      SystemRecordModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'SystemRecordModel(port: $port, HumidFeed: $HumidFeed, LightFeed: $LightFeed, TempFeed: $TempFeed, LightBulbFeed: $LightBulbFeed, broker: $broker, username: $username, API_Key: $API_Key)';
  }

  @override
  bool operator ==(covariant SystemRecordModel other) {
    if (identical(this, other)) return true;

    return other.port == port &&
        other.HumidFeed == HumidFeed &&
        other.LightFeed == LightFeed &&
        other.TempFeed == TempFeed &&
        other.LightBulbFeed == LightBulbFeed &&
        other.broker == broker &&
        other.username == username &&
        other.API_Key == API_Key;
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
        API_Key.hashCode;
  }
}
