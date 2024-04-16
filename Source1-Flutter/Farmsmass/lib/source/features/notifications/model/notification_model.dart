// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class NotificationModel {
  String Description;
  DateTime Time;
  String user_id;
  NotificationModel({
    required this.Description,
    required this.Time,
    required this.user_id,
  });

  NotificationModel copyWith({
    String? Description,
    DateTime? Time,
    String? user_id,
  }) {
    return NotificationModel(
      Description: Description ?? this.Description,
      Time: Time ?? this.Time,
      user_id: user_id ?? this.user_id,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'Description': Description,
      'Time': Time.millisecondsSinceEpoch,
      'user_id': user_id,
    };
  }

  factory NotificationModel.fromMap(Map<String, dynamic> map) {
    return NotificationModel(
      Description: map['Description'] as String,
      Time: DateTime.fromMillisecondsSinceEpoch(
          map['Time'].millisecondsSinceEpoch),
      user_id: map['user_id'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory NotificationModel.fromJson(String source) =>
      NotificationModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'NotificationModel(Description: $Description, Time: $Time, user_id: $user_id)';

  @override
  bool operator ==(covariant NotificationModel other) {
    if (identical(this, other)) return true;

    return other.Description == Description &&
        other.Time == Time &&
        other.user_id == user_id;
  }

  @override
  int get hashCode => Description.hashCode ^ Time.hashCode ^ user_id.hashCode;
}
