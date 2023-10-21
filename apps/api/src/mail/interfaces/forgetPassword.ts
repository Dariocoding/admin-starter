import { User } from 'src/modules/users/entities/user.entity';

export class ForgetPassword {
  urlRecovery: string;
  user: User;
}
