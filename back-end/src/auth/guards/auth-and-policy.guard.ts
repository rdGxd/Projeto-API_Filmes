import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class AuthAndPolicyGuard implements CanActivate {
  constructor(
    private readonly authTokenGuard: AuthGuard,
    private readonly routePolicyGuard: RolesGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthValid = await this.authTokenGuard.canActivate(context);
    if (!isAuthValid) return false;

    return this.routePolicyGuard.canActivate(context);
  }
}
