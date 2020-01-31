import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationFormsService } from './validation-forms.service';
import { UserService } from '../user-management/user.service';
import swal from 'sweetalert2';
import { ClientService } from '../client-management/client.service';
import _ from 'lodash';

export class User {
  RoleID:number;
  FirstName:string;
  LastName:string;
  UserName:string;
  Email:string;
}

@Component({
  templateUrl: './user-form.component.html',
  providers:[ValidationFormsService, UserService,ClientService]
})
export class UserFormComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  roles:any;
  clients:any;
  showClients:boolean = false;

  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private _userService:UserService,
    private _clientService:ClientService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){
    this.getRoles();
  }

  createForm() {
 
    this.simpleForm = this.fb.group({
      RoleID:[0, [Validators.required]],
      ClientID:[""],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      UserName: ['', [Validators.required, Validators.minLength(this.vf.formRules.usernameMin), Validators.pattern(this.vf.formRules.nonEmpty)] ],
      Email: ['', [Validators.required, Validators.email] ],
      // accept: [false, [Validators.requiredTrue] ]
    });
  }

  // convenience getter for easy access to form fields
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
    this._userService.create(this.simpleForm.value).subscribe((data:any)=>{
      swal.fire('Success','User added successfully.','success').then(result=>{
        this._router.navigateByUrl('user-management')
      })
    }, err=>{
      swal.fire('Oops!',err.error.error.message,'error');
    })
  }

  private getClients() {
    this._clientService.getData().subscribe(response => {
      this.clients = _.map(response.body, x => {
        if (x.Status) {
          return x
        }
      })
    })
  }

  toggleClients(event){
    console.log(event.target.value)
    let role = event.target.value;
    if(role==2){
      this.getClients();
      this.showClients = true;
    }else{
      this.showClients = false;
    }
  }



  getRoles(){
    this._userService.roles().subscribe((data:any)=>{
      this.roles = data.body;
    }, err=>{
      console.log(err)
    })
  }

}
