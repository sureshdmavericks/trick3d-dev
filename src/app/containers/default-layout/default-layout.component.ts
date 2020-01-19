import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'

})
export class DefaultLayoutComponent implements OnDestroy {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  data:any;
  constructor(private _authService: AuthService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.data = this._authService.getData().data;
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public logout(){
    let sessionData = JSON.parse(sessionStorage.getItem('token'))
    console.log('sessionData::',sessionData)
    if(sessionData.length>1){
      sessionData.shift();
      this._authService.setData(sessionData[0], true);
      console.log('sessionStorage::',sessionStorage.getItem('token'))
      window.location.reload();
    }else{
      this._authService.setData(null);
      this.router.navigate(['/']);
    }
    
  }

}
