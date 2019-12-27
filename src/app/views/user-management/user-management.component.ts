import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementData, UserService, UserData } from './user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { ConfirmComponent } from '../modals/confirm/confirm.component';

@Component({
  templateUrl: './user-management.component.html',
  providers: [ UserService ],
})
export class UserManagementComponent implements OnInit {
  modalRef: BsModalRef;
  error: any;
  public data: UserManagementData;
  datao:any;
  public filterQuery = '';

  constructor(
    private modalService: BsModalService,
    private dataTableService: UserService,
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
          console.log('this.datao::',this.datao)
        },
        error => this.error = error
      );
  }

  ngOnInit() {
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

    this.modalRef = this.modalService.show(ConfirmComponent, {
      initialState: {
        prompt: 'Are you sure you want to delete this record?',
        callback: (result) => {
          if(result == 'no') {
            event.target.checked = !event.target.checked;
            return
          };
          this.dataTableService.status(Status, UserID).subscribe((res:any)=>{
            console.log(res);
          }, error=>{
            console.log(error);
          })
        }
      }
    });
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
