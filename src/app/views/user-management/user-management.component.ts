import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementData, UserService, UserData } from './user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import _ from 'lodash';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import swal from 'sweetalert2';
import { AuthService } from '../../authentication/auth.service';

@Component({
  templateUrl: './user-management.component.html',
  providers: [ UserService, AuthService ],
})
export class UserManagementComponent implements OnInit {
  modalRef: BsModalRef;
  error: any;
  public data: UserManagementData;
  datao:any;
  public filterQuery = '';

  constructor(
    private dataTableService: UserService,
    private _authService: AuthService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: any) => {
          this.data = [...data.body];
          this.datao = _.map(this.data, function(x) {
            return _.assign(x, {
              FullName: `${x.FirstName} ${x.LastName}`
            });
          });
          // console.log('this.datao::',this.datao)
        },
        error => this.error = error
      );
  }

  ngOnInit() {
    console.log(this._authService.isClient())
    console.log(this._authService.getData())
  }

  addUser(){
    this.router.navigateByUrl('/user-form')
  }

  changeStatus(event:any, user:UserData){
    if(!user) return;
    let Status = event.target.checked;
    let {
      UserID
    } = user;

    swal.fire({
      title: 'Are you sure?',
      text: `User will be ${Status?'activated':'inactivated'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.dataTableService.status(Status, UserID).subscribe((res:any)=>{
          swal.fire("Success", `User ${Status?'activated':'inactivated'}`, "success")
        }, err=>{
          swal.fire("Oops!", err.error.error.message, "error")
        })
      }else{
        event.target.checked = !event.target.checked;
      }
    })
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
  }

}
