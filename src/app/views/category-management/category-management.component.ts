import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryMgntData } from './category.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './category-management.component.html',
  providers:[CategoryService]
})
export class CategoryManagementComponent implements OnInit {

  error: any;
  public data: CategoryMgntData;
  public filterQuery = '';

  constructor(
    private dataTableService: CategoryService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: CategoryMgntData) => {
          setTimeout(() => {
            this.data = [...data];
            }, 1000);
        }, // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
  }

  addCategory(){
    this.router.navigateByUrl('/category-form')
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
