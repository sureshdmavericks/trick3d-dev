import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService, CategoryMgntData } from '../category-management/category.service'
import { CategoryDataService } from '../../services/category-data.service';
import swal from 'sweetalert2';
import { AuthService } from '../../authentication/auth.service';

@Component({
  templateUrl: './category-form.component.html',
  providers:[CategoryService,AuthService]
})
export class CategoryFormComponent implements OnInit {

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  parentData:CategoryMgntData;

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _authService:AuthService,
    private _categoryDataService:CategoryDataService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){
    this.getCategoryData();
  }

  private getCategoryData(){
    this._categoryDataService.customerData.subscribe(res=>{
      console.log('res::',res);
      if(!res){
        this._categoryService.getParentData().subscribe(data=>{
          this.parentData = data.body;
        })
        return;
      }
      this.parentData = res;
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire('Error',error.error.message,'error');
      }
    })
  }

  createForm() {
    this.simpleForm = this.fb.group({
      Parent:[''],
      Name: ['', [Validators.required]],
    });

  }

  get f() { return this.simpleForm.controls; }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();

  }

  onSubmit() {
    this.submitted = true;
    if (this.simpleForm.invalid) {
      return;
    }

    this._categoryService.postData(this.simpleForm.value).subscribe(res=>{
      console.log(res);
      swal.fire('Success',`Category added.`, 'success').then(result=>{
        this._router.navigateByUrl('category-management');
      });
    }, error=>{
      console.log(error.error.error);
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire('Error',error.error.message,'error');
      }
    })
  }

}
