import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';
import {provideNgxWebstorage, SESSION_STORAGE, withNgxWebstorageConfig, withSessionStorage} from 'ngx-webstorage';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(), 
    importProvidersFrom(MatIconModule, MatButtonModule, MatTooltipModule, MatBadgeModule),
    provideRouter(routes),
    provideHttpClient(), // Add this
    provideHttpClient(withInterceptors([authInterceptor])),
  provideNgxWebstorage(
		withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
		withSessionStorage(),
	),
  { provide: SESSION_STORAGE, useValue: window.sessionStorage }  
  ]
};
