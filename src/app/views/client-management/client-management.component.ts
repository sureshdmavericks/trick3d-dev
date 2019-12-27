import { Component, OnInit } from '@angular/core';
import { ClientManagementData, ClientService } from './client.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  templateUrl: 'client-management.component.html',
  providers: [ ClientService ],
})
export class ClientManagementComponent implements OnInit {

  error: any;
  public clients: ClientManagementData;
  public filterQuery = '';

  constructor(
    private dataTableService: ClientService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data:any) => {
            this.clients = _.map(data.body, function(x) {
              return _.assign(x, {
                FullName: `${x.FirstName} ${x.LastName}`
              });
            });
        },
        error => this.error = error
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
