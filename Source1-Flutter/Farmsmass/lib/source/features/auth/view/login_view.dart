import 'package:farm_smass/source/features/auth/controller/auth_controller.dart';
import 'package:farm_smass/source/features/auth/service/auth_service.dart';
import 'package:farm_smass/source/utils/loader_circle.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginView extends ConsumerWidget {
  LoginView({Key? key}) : super(key: key);
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _pwController = TextEditingController();

  void signInWithMail(
      BuildContext context, WidgetRef ref, String email, String pw) {
    ref
        .read(authControllerProvider.notifier)
        .signInWithMail(context, email, pw);
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isLoading = ref.watch(authControllerProvider);
    return Scaffold(
      body: isLoading
          ? const LoaderCircle(
              SingleChildScrollView: null,
            )
          : SingleChildScrollView(
              child: Container(
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                  begin: Alignment.topRight,
                  end: Alignment.bottomLeft,
                  colors: [
                    Color.fromARGB(255, 162, 251, 230),
                    Color.fromARGB(255, 37, 236, 157),
                    Color.fromARGB(255, 1, 162, 49),
                  ],
                )),
                child: Stack(
                  children: [
                    Container(
                        child: Column(
                      children: [
                        Container(
                            padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                            child: Image.asset('assets/images/logo1.png')),
                        Container(
                            child: Text(
                          textAlign: TextAlign.center,
                          'SMART GARDEN',
                          style: TextStyle(
                              color: Color.fromARGB(255, 0, 116, 62),
                              fontWeight: FontWeight.bold,
                              fontSize: 24.0),
                        )),
                      ],
                    )),
                    Container(
                      child: Center(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Container(
                              padding:
                                  const EdgeInsets.fromLTRB(20, 150, 20, 0),
                              child: TextField(
                                controller: _emailController,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(90.0),
                                  ),
                                  labelText: 'Email',
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                              child: TextField(
                                controller: _pwController,
                                obscureText: true,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(90.0),
                                  ),
                                  labelText: 'Password',
                                ),
                              ),
                            ),
                            Container(
                                height: 80,
                                padding: const EdgeInsets.all(20),
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    minimumSize: const Size.fromHeight(50),
                                  ),
                                  child: const Text('SIGN IN'),
                                  onPressed: () {
                                    signInWithMail(
                                        context,
                                        ref,
                                        _emailController.text,
                                        _pwController.text);
                                  },
                                )),
                            TextButton(
                              onPressed: () {},
                              child: Text(
                                'Forgot your password?',
                                style: TextStyle(color: Colors.grey[600]),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );

    // body: isLoading
    //     ? const LoaderCircle()
    //     : SingleChildScrollView(
    //         child: Center(
    //         child: Column(
    //           crossAxisAlignment: CrossAxisAlignment.center,
    //           mainAxisAlignment: MainAxisAlignment.center,
    //           children: <Widget>[
    //             Container(
    //               padding: const EdgeInsets.fromLTRB(20, 20, 20, 100),
    //               child: Image.asset('assets/images/logo.png'),
    //             ),
    //             Container(
    //               padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
    //               child: TextField(
    //                 controller: _emailController,
    //                 decoration: InputDecoration(
    //                   border: OutlineInputBorder(
    //                     borderRadius: BorderRadius.circular(90.0),
    //                   ),
    //                   labelText: 'Email',
    //                 ),
    //               ),
    //             ),
    //             Container(
    //               padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
    //               child: TextField(
    //                 controller: _pwController,
    //                 obscureText: true,
    //                 decoration: InputDecoration(
    //                   border: OutlineInputBorder(
    //                     borderRadius: BorderRadius.circular(90.0),
    //                   ),
    //                   labelText: 'Mật khẩu',
    //                 ),
    //               ),
    //             ),
    //             Container(
    //                 height: 80,
    //                 padding: const EdgeInsets.all(20),
    //                 child: ElevatedButton(
    //                   style: ElevatedButton.styleFrom(
    //                     minimumSize: const Size.fromHeight(50),
    //                   ),
    //                   child: const Text('Đăng nhập'),
    //                   onPressed: () {
    //                     signInWithMail(context, ref, _emailController.text,
    //                         _pwController.text);
    //                   },
    //                 )),
    //             TextButton(
    //               onPressed: () {},
    //               child: Text(
    //                 'Quên mật khẩu?',
    //                 style: TextStyle(color: Colors.grey[600]),
    //               ),
    //             ),
    //           ],
    //         ),
    //       ))
  }
}
