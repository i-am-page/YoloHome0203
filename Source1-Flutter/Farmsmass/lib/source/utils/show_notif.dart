import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

void showSnackBar(BuildContext context, String text) {
  ScaffoldMessenger.of(context).showSnackBar(
    new SnackBar(
      content: Text(text),
    ),
  );
}
