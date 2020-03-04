import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ColorPickerModule } from 'ngx-color-picker';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { ClientManagementComponent } from './views/client-management/client-management.component';
import { ClientFormComponent } from './views/client-form/client-form.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { UsageLogsComponent } from './views/usage-logs/usage-logs.component';
import { ClientLoginComponent } from './views/client-login/client-login.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { AssetManagementComponent } from './views/asset-management/asset-management.component';
import { ChangeAssetCategoryComponent } from './views/modals/change-asset-category/change-asset-category.component';

//Modal components

import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { DataFilterPipe } from './views/client-management/datafilterpipe';

// Import containers
import { DefaultLayoutComponent } from './containers';

//services
import { JwtModule } from '@auth0/angular-jwt';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SidebarNavCustomComponent,
  LoginComponent,
  P404Component,
  P500Component,
  ClientManagementComponent,
  ClientFormComponent,
  UserFormComponent,
  UserManagementComponent,
  UsageLogsComponent,
  ClientLoginComponent,
  NotificationsComponent,
  ProfileComponent,
  ChangeAssetCategoryComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AuthGuardService } from './authentication/auth-guard.service';
import { RoleGuardService } from './authentication/role-guard.service';
import { AuthService } from './authentication/auth.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderInterceptor } from './loader.interceptor';
import { InitialUploadComponent } from './views/asset-management/initial-upload/initial-upload.component';
import { AdminReviewComponent } from './views/asset-management/admin-review/admin-review.component';
import { CategoryManagementComponent } from './views/category-management/category-management.component';
import { CategoryFormComponent } from './views/category-form/category-form.component';
import { SidebarNavCustomComponent } from './containers/sidebar-nav-custom/sidebar-nav-custom.component';
import { LoginService } from './views/login/login.service';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ConfirmComponent } from './views/modals/confirm/confirm.component';
import { CreatePasswordComponent } from './views/create-password/create-password.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';

@NgModule({
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('token');
        },
        whitelistedDomains: ['you API url']
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTableModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ColorPickerModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset
    })
  ],
  declarations: [
    AppComponent,
    DataFilterPipe,
    ...APP_CONTAINERS,
    LoaderComponent,
    AssetManagementComponent,
    ChangeAssetCategoryComponent,
    InitialUploadComponent,
    AdminReviewComponent,
    CategoryManagementComponent,
    CategoryFormComponent,
    ForgotPasswordComponent,
    ConfirmComponent,
    CreatePasswordComponent,
    ChangePasswordComponent
  ],
  entryComponents: [
    ChangeAssetCategoryComponent,
    ConfirmComponent
  ],
  providers: [
    NgxNavigationWithDataComponent,
    AuthGuardService,
    LoginService,
    RoleGuardService,
    AuthService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
