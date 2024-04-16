// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class SensorDataModel {
  DateTime Time;
  int Value;
  SensorDataModel({
    required this.Time,
    required this.Value,
  });

  SensorDataModel copyWith({
    DateTime? Time,
    int? Value,
  }) {
    return SensorDataModel(
      Time: Time ?? this.Time,
      Value: Value ?? this.Value,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'Time': Time.millisecondsSinceEpoch,
      'Value': Value,
    };
  }

  factory SensorDataModel.fromMap(Map<String, dynamic> map) {
    return SensorDataModel(
      Time: DateTime.fromMillisecondsSinceEpoch(
          map['Time'].millisecondsSinceEpoch),
      Value: map['Value'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory SensorDataModel.fromJson(String source) =>
      SensorDataModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'SensorDataModel(Time: $Time, Value: $Value)';

  @override
  bool operator ==(covariant SensorDataModel other) {
    if (identical(this, other)) return true;

    return other.Time == Time && other.Value == Value;
  }

  @override
  int get hashCode => Time.hashCode ^ Value.hashCode;
}
