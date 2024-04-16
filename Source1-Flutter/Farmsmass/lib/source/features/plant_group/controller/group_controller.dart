import 'package:farm_smass/main.dart';
import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/plant_group/model/group_model.dart';
import 'package:farm_smass/source/features/plant_group/service/group_service.dart';
import 'package:fpdart/fpdart.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

//////////////////////Provider////////////////////
final plantGroupsProvider = StreamProvider((ref) {
  final groupController = ref.watch(GroupControllerProvider.notifier);
  return groupController.getPlantGroups();
});

final GroupControllerProvider =
    StateNotifierProvider<GroupController, bool>((ref) {
  final groupService = ref.watch(groupServiceProvider);
  return GroupController(groupService: groupService, ref: ref);
});

final getPlantGroupByIDProvider = StreamProvider.family((ref, String group_id) {
  return ref
      .watch(GroupControllerProvider.notifier)
      .getPlantGroupDetailByID(group_id);
});

//////////////////////////////////////////
class GroupController extends StateNotifier<bool> {
  final GroupService _groupService;
  final Ref _ref;

  GroupController({required GroupService groupService, required Ref ref})
      : _groupService = groupService,
        _ref = ref,
        super(false);

  void createGroup() {
    //todo
  }

  Stream<List<PlantGroupModel>> getPlantGroups() {
    final uid = _ref.watch(userProvider)!.uid;
    return _groupService.getPlantGroups(uid);
  }

  Stream<PlantGroupModel> getPlantGroupDetailByID(String group_id) {
    return _groupService.getPlantGroupDetailByID(group_id);
  }
}
