// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserModel {
  final String name;
  final String email;
  final String uid;
  final bool isRegistered;
  UserModel({
    required this.name,
    required this.email,
    required this.uid,
    this.isRegistered = false,
  });

  UserModel copyWith({
    String? name,
    String? email,
    String? uid,
    bool? isRegistered,
  }) {
    return UserModel(
      name: name ?? this.name,
      email: email ?? this.email,
      uid: uid ?? this.uid,
      isRegistered: isRegistered ?? this.isRegistered,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'email': email,
      'uid': uid,
      'isRegistered': isRegistered,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      name: map['name'] as String,
      email: map['email'] as String,
      uid: map['uid'] as String,
      isRegistered: map['isRegistered'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory UserModel.fromJson(String source) =>
      UserModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'UserModel(name: $name, email: $email, uid: $uid, isRegistered: $isRegistered)';
  }

  @override
  bool operator ==(covariant UserModel other) {
    if (identical(this, other)) return true;

    return other.name == name &&
        other.email == email &&
        other.uid == uid &&
        other.isRegistered == isRegistered;
  }

  @override
  int get hashCode {
    return name.hashCode ^
        email.hashCode ^
        uid.hashCode ^
        isRegistered.hashCode;
  }
}
