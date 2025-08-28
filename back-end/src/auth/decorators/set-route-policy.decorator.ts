import { SetMetadata } from '@nestjs/common';
import { ROUTE_POLICY_KEY } from '../constants/route.constants';
import { Roles } from '../enums/roles.enums';

export const SetRoutePolicy = (...args: Roles[]) => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
