import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { UserService } from "../user-management/user.service"
import swal from "sweetalert2"

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;
  preview:string;
  logoview:string;
  fileName:string;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
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
      swal.fire("Success!", `Your profile has been updated.`, "success")
    }, error=>{
      console.log(error)
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
