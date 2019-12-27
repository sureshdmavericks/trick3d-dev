import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryMgntData } from '../views/category-management/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  private category = new BehaviorSubject<CategoryMgntData>(null)
  customerData = this.category.asObservable()

  constructor() {}

  changeData(data: any) {
    this.category.next(data)
  }
}
