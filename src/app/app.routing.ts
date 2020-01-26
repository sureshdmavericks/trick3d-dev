import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './authentication/auth-guard.service';

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
import { P500Component } from './views/error/500.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';

export const routes: Routes = [

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Trick3D Admin Portal Forgot Password Page'
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
        canActivate: [AuthGuard],
        data: {
          expectedRole: [1,2,3,4,5]
        }
      },
      {
        path: 'client-management',
        component: ClientManagementComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: [1,3]
        }
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'usage-logs',
        component: UsageLogsComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,3]
        }
      },
      {
        path: 'client-login',
        component: ClientLoginComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,3]
        }
      },
      {
        path: 'client-form',
        component: ClientFormComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: [1,3]
        }
      },
      {
        path: 'user-form',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3,4,5]
        }
      },
      {
        path: 'assets',
        component: AssetManagementComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'initupload',
        component: InitialUploadComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'marking',
        component: ClientMarkingComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'product-review',
        component: AdminReviewComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [1,2,3]
        }
      },
      {
        path: 'category-management',
        component: CategoryManagementComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [2]
        }
      },
      {
        path: 'category-form',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole: [2]
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole:[1,2,3,4,5]
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data:{
          expectedRole:[1,2,3,4,5]
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
