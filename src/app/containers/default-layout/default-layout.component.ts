import { Component, OnDestroy, Inject, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../views/login/login.service';
import swal from 'sweetalert2';
import { UserService } from '../../views/user-management/user.service';
import { ThemeService } from './theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers:[LoginService,UserService,ThemeService]
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  data:any;
  user_data : any;
  constructor(
    private themeService: ThemeService,
    private userService:UserService,
    private loginService:LoginService, 
    private _authService: AuthService, 
    private router: Router, @Inject(DOCUMENT) _document?: any
    ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.data = this._authService.getData();
    console.log(this.data);
    console.log(_authService.isFromAdmin());
  }

  ngOnInit(){ 
    console.log('in default init');
    this.userService.getProfile().subscribe(res=>{
      console.log(res.body);
      this.user_data = res.body;
      this.themeService.registerTheme({name:'delta', properties:{
        '--background': res.body.HeaderColor,
        '--on-background': res.body.FontColor,
        '--sidebar': res.body.SidebarColor,
        '--on-sidebar': res.body.FontColor,
      }})
      const active = this.themeService.updateTheme('delta',{
        '--background': res.body.HeaderColor,
        '--on-background': res.body.FontColor,
        '--sidebar': res.body.SidebarColor,
        '--on-sidebar': res.body.FontColor,
        
      });
      this.themeService.setTheme('delta');
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        this._authService.logout();
      }
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public logout(){
    
      let sessionData = JSON.parse(sessionStorage.getItem('token'));
      if(sessionData.length>1){
        sessionData.shift();
        this._authService.setData(sessionData[0], true);
        window.location.reload();
      }else{
        this._authService.setData(null);
        this.router.navigate(['/login']);
      }
    
  }

  public logoutMain(){
    console.log('token:',this._authService.getToken());
    this.loginService.logout(this._authService.getToken()).subscribe(res=>{
      this._authService.logout();
      swal.fire('Log Out',`Logged out successfully`,'success');
    }, error=>{
      this._authService.logout();
      swal.fire('Log Out',`Logged out successfully`,'success');
      // swal.fire('Error',error.error.error.message, 'error');
    })
  }

}
