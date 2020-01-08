import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event } from '@angular/router';
import { ClientService } from '../client-management/client.service';
import swal from 'sweetalert2'; 

@Component({
  templateUrl: './client-form.component.html',
  providers:[ClientService]
})
export class ClientFormComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  isSwalVisible:boolean = false;
  swalText:string = '';

  constructor(
    private fb: FormBuilder,
    private dataTableService: ClientService,
    private _router:Router
  ) {
    this.createForm();
  }

  ngOnInit(){

  }

  createForm() {
    this.simpleForm = this.fb.group({
      FullName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      FirstName: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Website: ['', [Validators.required] ],
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

    console.log(this.simpleForm)

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    this.dataTableService.create(this.simpleForm.value).subscribe(res=>{
        console.log(res);
        swal.fire('Hey!', 'Client added successfully','success')
        this._router.navigateByUrl('client-management')
    }, err =>{
      console.log(err)
      swal.fire('Oh!', err.error.error.message, 'error');
    })
  }

}
