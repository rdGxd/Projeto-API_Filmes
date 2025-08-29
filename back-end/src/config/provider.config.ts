import { APP_GUARD } from '@nestjs/core';
import { AuthAndPolicyGuard } from '../auth/guards/auth-and-policy.guard';

export const GlobalProvider = () => {
  const AuthGuard = {
    provide: APP_GUARD,
    useClass: AuthAndPolicyGuard,
  };

  return [AuthGuard];
};
