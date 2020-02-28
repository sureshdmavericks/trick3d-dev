import { Component, OnInit,  HostBinding, Input, HostListener } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { NavData } from '../../_nav';

@Component({
  selector: 'app-sidebar-nav-custom',
  templateUrl: './sidebar-nav-custom.component.html',
  styleUrls:['./sidebar-nav-custom.component.scss']
})
export class SidebarNavCustomComponent implements OnInit {

    @Input() navItems: Array<any>;
    @HostBinding('class.sidebar-nav') true;
    @HostBinding('attr.role') role;
    roleData:any;
    myRole: string;

    constructor(private _authService:AuthService) {
    }

    ngOnInit(){
        this.roleData = this._authService.getData();
        console.log(this.roleData);
        if(this.roleData)
        this.myRole = this.roleData.role;
    }

    public hideMobile() {
        if (document.body.classList.contains('sidebar-mobile-show')) {
          document.body.classList.toggle('sidebar-mobile-show');
        if (document.body.classList.contains('sidebar-show')) {
          document.body.classList.toggle('sidebar-show');
        }
      }
    }

    @HostListener('click', ['$event'])
    toggleOpen($event: any) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-mobile-show');
        document.querySelector('body').classList.toggle('sidebar-show');
    }

    isDivider(navItem:NavData) {
        return !!navItem.divider
    }

    isTitle(navItem:NavData) {
        return !!navItem.title
    }

    hasEmployeeRole(navItem:NavData){
        if(navItem.hasOwnProperty('children') && navItem.children.length > 0){
            let count = 0;
            for (let index = 0; index < navItem.children.length; index++) {
                const element = navItem.children[index];
                if(element.role==navItem.role && element.role.includes(1))
                count++;
            }
            return (count==navItem.children.length && navItem.role.includes(1));
        }
        return false;
    }

    isHasChild(navItem:NavData) {
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
    }

}
