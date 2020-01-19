import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryMgntData } from './category.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CategoryDataService } from '../../services/category-data.service';

@Component({
  templateUrl: './category-management.component.html',
  styleUrls:['./category-management.component.scss'],
  providers:[CategoryService]
})
export class CategoryManagementComponent implements OnInit {

  error: any;
  public data: CategoryMgntData;
  public datao : any;
  public filterQuery = '';
  public catName:Array<string> = [];

  constructor(
    private dataTableService: CategoryService,
    private categoryDataService: CategoryDataService,
    private router : Router
    ) {
    this.dataTableService.getData()
      .subscribe(
        (data: any) => {
          this.data = [...data.body];
          this.datao = _.map(this.data, (x) =>{
            this.catName[x.CategoryID] = x.Name;
            return _.assign(x, {
              Status: x.Status ? 'Active' : 'Inactive'
            });
          });

          this.categoryDataService.changeData(_.map(this.data, (res:any)=>{
            if(!res.Parent || res.Parent==null){
              return {
                CategoryID: res.CategoryID,
                Name:res.Name
              }
            }
          }))

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

  public openCategoryForm(categoryID){

  }

}
