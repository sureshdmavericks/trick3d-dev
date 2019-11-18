import { Component, OnInit } from '@angular/core';
import { ClientManagementData, ClientService } from './../client-management/client.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user-management.component.html',
  providers: [ ClientService ],
})
export class UserManagementComponent implements OnInit {

  error: any;
  public data: ClientManagementData;
  public filterQuery = '';

  constructor(
    private dataTableService: ClientService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: ClientManagementData) => {
          setTimeout(() => {
            this.data = [...data];
            }, 1000);
        }, // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
  }

  addUser(){
    this.router.navigateByUrl('/user-form')
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
