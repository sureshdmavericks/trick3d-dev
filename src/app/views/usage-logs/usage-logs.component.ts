import { Component, OnInit } from '@angular/core';
import { UsageLogsData, UsageService } from './usage.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './usage-logs.component.html',
  providers: [ UsageService ],
})
export class UsageLogsComponent implements OnInit {

  error: any;
  public data: UsageLogsData;
  public filterQuery = '';

  constructor(
    private dataTableService: UsageService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: UsageLogsData) => {
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
