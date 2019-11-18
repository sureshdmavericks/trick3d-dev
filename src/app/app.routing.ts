import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { P404Component } from './views/error/404.component';
import { ClientManagementComponent } from './views/client-management/client-management.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { UsageLogsComponent } from './views/usage-logs/usage-logs.component';
import { ClientLoginComponent } from './views/client-login/client-login.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ClientFormComponent } from './views/client-form/client-form.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { AssetManagementComponent } from './views/asset-management/asset-management.component';
import { CategoryManagementComponent } from './views/category-management/category-management.component';
import { CategoryFormComponent } from './views/category-form/category-form.component';
import { InitialUploadComponent } from './views/asset-management/initial-upload/initial-upload.component';
import { ClientMarkingComponent } from './views/asset-management/client-marking/client-marking.component';
import { AdminReviewComponent } from './views/asset-management/admin-review/admin-review.component';

export const routes: Routes = [

  {
    path: 'dashboard', pathMatch: 'full', redirectTo: '/dashboard'
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Trick3D Admin Portal Login Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate: [AuthGuard],
        data: {
          expectedRole: 'admin'
        }
      },
      {
    path: 'client-management',
    component: ClientManagementComponent,
    // canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    // canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'usage-logs',
    component: UsageLogsComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'client-login',
    component: ClientLoginComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'client-form',
    component: ClientFormComponent,
    // canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'assets',
    component: AssetManagementComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'initupload',
    component: InitialUploadComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'marking',
    component: ClientMarkingComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin-review',
    component: AdminReviewComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: 'admin'
    }
  },
  {
    path: 'category-management',
    component: CategoryManagementComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: ['admin','client']
    }
  },
  {
    path: 'category-form',
    component: CategoryFormComponent,
    // canActivate: [AuthGuard],
    data:{
      expectedRole: ['admin','client']
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard],
    data:{
      title: 'My Profile'
    }
  },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
