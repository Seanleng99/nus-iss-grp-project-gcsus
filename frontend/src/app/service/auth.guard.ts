import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../service/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(ApiService);
  const router = inject(Router);

  if (!auth.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
