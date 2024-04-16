import 'package:farm_smass/source/utils/failure_message.dart';
import 'package:fpdart/fpdart.dart';

typedef FutureEither<T> = Future<Either<FailureMessage, T>>;
typedef FutureVoid = FutureEither<void>;
