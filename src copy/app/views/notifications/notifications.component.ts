import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationData } from './notification.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './notifications.component.html',
  providers:[NotificationService]
})
export class NotificationsComponent implements OnInit {

  error: any;
  public data: NotificationData;
  public filterQuery = '';

  constructor(
    private dataTableService: NotificationService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: NotificationData) => {
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
