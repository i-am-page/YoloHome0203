import 'dart:convert';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class PlantGroupModel {
  final String id;
  final String name;
  final int quantity;
  final String user_id;
  final int avg_suitable_humid;
  final int avg_suitable_temp;
  final int avg_suitable_light;
  final String imgpath;
  PlantGroupModel({
    required this.id,
    required this.name,
    required this.quantity,
    required this.user_id,
    required this.avg_suitable_humid,
    required this.avg_suitable_temp,
    required this.avg_suitable_light,
    required this.imgpath,
  });

  PlantGroupModel copyWith({
    String? id,
    String? name,
    int? quantity,
    String? user_id,
    int? avg_suitable_humid,
    int? avg_suitable_temp,
    int? avg_suitable_light,
    String? imgpath,
  }) {
    return PlantGroupModel(
      id: id ?? this.id,
      name: name ?? this.name,
      quantity: quantity ?? this.quantity,
      user_id: user_id ?? this.user_id,
      avg_suitable_humid: avg_suitable_humid ?? this.avg_suitable_humid,
      avg_suitable_temp: avg_suitable_temp ?? this.avg_suitable_temp,
      avg_suitable_light: avg_suitable_light ?? this.avg_suitable_light,
      imgpath: imgpath ?? this.imgpath,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'quantity': quantity,
      'user_id': user_id,
      'avg_suitable_humid': avg_suitable_humid,
      'avg_suitable_temp': avg_suitable_temp,
      'avg_suitable_light': avg_suitable_light,
      'imgpath': imgpath,
    };
  }

  factory PlantGroupModel.fromMap(Map<String, dynamic> map) {
    return PlantGroupModel(
      id: map['id'] as String,
      name: map['name'] as String,
      quantity: map['quantity'] as int,
      user_id: map['user_id'] as String,
      avg_suitable_humid: map['avg_suitable_humid'] as int,
      avg_suitable_temp: map['avg_suitable_temp'] as int,
      avg_suitable_light: map['avg_suitable_light'] as int,
      imgpath: map['imgpath'] as String,
    );
  }

  @override
  String toString() {
    return 'PlantGroupModel(id: $id, name: $name, quantity: $quantity, user_id: $user_id, avg_suitable_humid: $avg_suitable_humid, avg_suitable_temp: $avg_suitable_temp, avg_suitable_light: $avg_suitable_light, imgpath: $imgpath)';
  }

  @override
  bool operator ==(covariant PlantGroupModel other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.name == name &&
        other.quantity == quantity &&
        other.user_id == user_id &&
        other.avg_suitable_humid == avg_suitable_humid &&
        other.avg_suitable_temp == avg_suitable_temp &&
        other.avg_suitable_light == avg_suitable_light &&
        other.imgpath == imgpath;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        quantity.hashCode ^
        user_id.hashCode ^
        avg_suitable_humid.hashCode ^
        avg_suitable_temp.hashCode ^
        avg_suitable_light.hashCode ^
        imgpath.hashCode;
  }

  String toJson() => json.encode(toMap());

  factory PlantGroupModel.fromJson(String source) =>
      PlantGroupModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
