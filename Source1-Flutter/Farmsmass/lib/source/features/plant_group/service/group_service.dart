import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:farm_smass/source/features/plant_group/model/group_model.dart';
import 'package:farm_smass/source/utils/provider/firebase_provider.dart';
import 'package:farm_smass/source/utils/constants/firebase_constants.dart';
import 'package:farm_smass/source/utils/type_defs.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final groupServiceProvider = Provider<GroupService>((ref) {
  return GroupService(firestore: ref.watch(firestoreProvider));
});

class GroupService {
  final FirebaseFirestore _firestore;
  GroupService({required FirebaseFirestore firestore}) : _firestore = firestore;

  /*
  TODO
  FutureVoid createGroup() async {
    
  }*/
  Stream<List<PlantGroupModel>> getPlantGroups(String user_id) {
    return _plantGroup
        .where('user_id', isEqualTo: user_id)
        .snapshots()
        .map((event) {
      List<PlantGroupModel> plantGroups = [];
      for (var doc in event.docs) {
        plantGroups
            .add(PlantGroupModel.fromMap(doc.data() as Map<String, dynamic>));
      }

      return plantGroups;
    });
  }

  Stream<PlantGroupModel> getPlantGroupDetailByID(String group_id) {
    return _plantGroup.doc(group_id).snapshots().map((event) =>
        PlantGroupModel.fromMap(event.data() as Map<String, dynamic>));
  }

  CollectionReference get _plantGroup =>
      _firestore.collection(FirebaseConstants.plantGroupCollection);
}
