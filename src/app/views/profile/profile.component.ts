import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { UserService } from "../user-management/user.service"
import swal from "sweetalert2";
import { AuthService } from '../../authentication/auth.service';
import { ThemeService } from './../../containers/default-layout/theme';

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [UserService, AuthService]
})
export class ProfileComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  preview:string;
  logoview:string;
  fileName:string;

  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private _router: Router,
    private _authService:AuthService,
    private _userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this._userService.getProfile().subscribe(response => {
      console.log(response.body)
      this.simpleForm.patchValue({
        Email: response.body.Email,
        FirstName: response.body.FirstName,
        LastName: response.body.LastName,
        UserName: response.body.UserName,
        ProfilePic:response.body.ProfilePic,
        Logo:response.body.Logo,
        HeaderColor:response.body.HeaderColor,
        FontColor:response.body.FontColor,
        SidebarColor:response.body.SidebarColor
      })
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire('Oops!',error.error.error.message || `something went wrong`, 'error')
      }
    })
  }

  createForm() {
    this.simpleForm = this.fb.group({
      UserName: ["", [Validators.required]],
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      HeaderColor: [""],
      SidebarColor: [""],
      FontColor: [""],
      ProfilePic: [""],
      Logo: [""]
    })
  }
  colorChanged(event:Event, field:string){
    // console.log(event);
    this.f[field].setValue(event);
  }

  get f() {
    return this.simpleForm.controls
  }

  onReset() {
    this.submitted = false
    this.simpleForm.reset()
  }

  cancel() {
    this._router.navigateByUrl("assets")
  }

  onSubmit() {
    this.submitted = true
    console.log(this.simpleForm.value);
    if (this.simpleForm.invalid) {
      return
    }

    // return;
    let data = {
      FirstName : this.simpleForm.controls["FirstName"].value,
      LastName  : this.simpleForm.controls["LastName"].value,
      ProfilePic: this.simpleForm.controls["ProfilePic"].value,
      Logo: this.simpleForm.controls["Logo"].value,
      HeaderColor: this.simpleForm.controls["HeaderColor"].value,
      SidebarColor: this.simpleForm.controls["SidebarColor"].value,
      FontColor: this.simpleForm.controls["FontColor"].value
    }
    this._userService.updateProfile(data).subscribe(response => {
      console.log(response.body)
      swal.fire("Success!", `Your profile has been updated.`, "success").then(res=>{
        this.themeService.registerTheme({name:'delta', properties:{
          '--background': data.HeaderColor,
          '--on-background': data.FontColor,
          '--sidebar': data.SidebarColor,
          '--on-sidebar': data.FontColor,
        }})
        const active = this.themeService.updateTheme('delta',{
          '--background': data.HeaderColor,
          '--on-background': data.FontColor,
          '--sidebar': data.SidebarColor,
          '--on-sidebar': data.FontColor,
          
        });
        this.themeService.setTheme('delta');
      })
    }, error=>{
      if(error.error && error.error.error && error.error.error.code=='INVALID_ACCESS_TOKEN'){
        console.log('in token error');
        this._authService.logout();
      }else{
        swal.fire('Oops!',error.error.error.message || `something went wrong`, 'error')
      }
    })
  }

  onFileChange(event, type:string) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (type == "profile") {
          this.preview = reader.result as string;
          this.simpleForm.patchValue({
            ProfilePic: file
          });
        }else{
          this.fileName = file.name;
          this.logoview = reader.result as string;
          this.simpleForm.patchValue({
            Logo: file
          });
        }
        this.cd.markForCheck()
      }
    }
  }
}
