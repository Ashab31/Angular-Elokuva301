import { Routes, Route } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';
import { UserComponent } from './user.component';

/**
 * Provides helper methods to create routes.
 */
export class UserService {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: UserComponent,
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
