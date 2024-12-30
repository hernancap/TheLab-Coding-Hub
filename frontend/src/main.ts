import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './app/services/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
  provideRouter(appRoutes),
  provideHttpClient(withInterceptors([jwtInterceptor])),
  provideAnimationsAsync(),]
}).catch((err) => console.error(err));
