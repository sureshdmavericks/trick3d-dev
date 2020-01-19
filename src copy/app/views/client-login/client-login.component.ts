import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService, ClientManagementData } from '../client-management/client.service';

@Component({
  templateUrl: './client-login.component.html',
  providers:[ClientService]
})
export class ClientLoginComponent implements OnInit {

  error: any;
  public data: ClientManagementData;
  public filterQuery = '';

  constructor(
    private dataTableService: ClientService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: any) => {
          setTimeout(() => {
            this.data = [...data];
            }, 1000);
        }, // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
  }

  addClient(){
    this.router.navigateByUrl('/client-form')
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
