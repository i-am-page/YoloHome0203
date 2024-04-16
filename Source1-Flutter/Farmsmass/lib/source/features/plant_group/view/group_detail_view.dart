import 'package:farm_smass/source/features/plant_group/controller/group_controller.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:toggle_switch/toggle_switch.dart';

class GroupDetailView extends ConsumerWidget {
  final String group_id;
  final bool isSwitched = false;
  const GroupDetailView({super.key, required this.group_id});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ref.watch(getPlantGroupByIDProvider(group_id)).when(
            data: (PlantGroup) => Container(
                  child: Center(
                      child: Text(
                          "Plant: ${PlantGroup.name}\nQuantity: ${PlantGroup.quantity}\nid: ${PlantGroup.id}\n ${PlantGroup.avg_suitable_humid}")),
                ),
            error: (error, StackTrace) => Text(error.toString()),
            loading: () => LoaderCircle(SingleChildScrollView: null)),
      ],
    ));
  }
}
