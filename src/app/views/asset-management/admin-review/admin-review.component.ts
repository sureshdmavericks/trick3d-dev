import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {

  simpleForm: FormGroup;

  product_data:object;

  constructor(
    public navCtrl: NgxNavigationWithDataComponent,
    private fb: FormBuilder
    ) { 
    console.log(this.navCtrl.data);
    if(Object.keys(this.navCtrl.data).length === 0){
      this.navCtrl.navigate('assets');
      return;
    }
    this.product_data = this.navCtrl.data;
  }

  ngOnInit() {
    this.simpleForm = this.fb.group({

    })
  }

}
