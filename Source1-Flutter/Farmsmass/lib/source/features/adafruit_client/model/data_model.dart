// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class DataModel {
  String last_value;
  DateTime created_at;
  String key;
  DataModel({
    required this.last_value,
    required this.created_at,
    required this.key,
  });

  DataModel copyWith({
    String? last_value,
    DateTime? created_at,
    String? key,
  }) {
    return DataModel(
      last_value: last_value ?? this.last_value,
      created_at: created_at ?? this.created_at,
      key: key ?? this.key,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'last_value': last_value,
      'created_at': created_at,
      'key': key,
    };
  }

  factory DataModel.fromMap(Map<String, dynamic> map) {
    return DataModel(
      last_value: map['last_value'] as String,
      created_at: DateTime.parse(map['data']['created_at']),
      key: map['key'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory DataModel.fromJson(String source) =>
      DataModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'DataModel(last_value: $last_value, created_at: $created_at, key: $key)';

  @override
  bool operator ==(covariant DataModel other) {
    if (identical(this, other)) return true;

    return other.last_value == last_value &&
        other.created_at == created_at &&
        other.key == key;
  }

  @override
  int get hashCode => last_value.hashCode ^ created_at.hashCode ^ key.hashCode;
}
/*class DataModel {
  double lastValue;
  DateTime updatedAt;
  String key;

  
  DataModel({
    required this.lastValue,
    required this.updatedAt,
    required this.key,
  });

  DataModel copyWith({
    double? lastValue,
    DateTime? updatedAt,
    String? key,
  }) {
    return DataModel(
      lastValue: lastValue ?? this.lastValue,
      updatedAt: updatedAt ?? this.updatedAt,
      key: key ?? this.key,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'last_value': lastValue,
      'updated_at': updatedAt,
      'key': key,
    };
  }

  factory DataModel.fromMap(Map<String, dynamic> map) {
    return DataModel(
      lastValue: map['last_value'] as double,
      updatedAt: DateTime.parse(map['data']['created_at']),
      key: map['key'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory DataModel.fromJson(String source) =>
      DataModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'DataModel(lastValue: $lastValue, updatedAt: $updatedAt, key: $key)';

  @override
  bool operator ==(covariant DataModel other) {
    if (identical(this, other)) return true;

    return other.lastValue == lastValue &&
        other.updatedAt == updatedAt &&
        other.key == key;
  }

  @override
  int get hashCode => lastValue.hashCode ^ updatedAt.hashCode ^ key.hashCode;

  DataModel({
    required this.lastValue,
    required this.updatedAt,
    required this.key,
  });

  DataModel copyWith({
    double? lastValue,
    DateTime? updatedAt,
    String? key,
  }) {
    return DataModel(
      lastValue: lastValue ?? this.lastValue,
      updatedAt: updatedAt ?? this.updatedAt,
      key: key ?? this.key,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'last_value': lastValue.toString(),
      'updated_at': updatedAt.millisecondsSinceEpoch.toString(),
      'key': key,
    };
  }

  factory DataModel.fromMap(Map<String, dynamic> map) {
    return DataModel(
      lastValue: map['last_value'] as double,
      updatedAt: DateTime.parse(map['data']['created_at']),
      key: map['key'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory DataModel.fromJson(String source) =>
      DataModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'DataModel(lastValue: $lastValue, updatedAt: $updatedAt, key: $key)';

  @override
  bool operator ==(covariant DataModel other) {
    if (identical(this, other)) return true;

    return other.lastValue == lastValue &&
        other.updatedAt == updatedAt &&
        other.key == key;
  }

  @override
  int get hashCode => lastValue.hashCode ^ updatedAt.hashCode ^ key.hashCode;
}
*/

