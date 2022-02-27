import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private _auth:AuthService,
    private router: Router
  ) { }
  // formValue!:FormGroup;
   showButton:boolean=true;
  // constructor(private formBuilder:FormBuilder,private _api:ApiService, private _auth:AuthService, private router: Router) { }
  badgeDanger:boolean=false;
  // ngOnInit(): void {
  //   this.formValue = this.formBuilder.group({
  //     userName:[''],
  //     password:[''],
  //  })

  //}



  ngOnInit() {
    this.formValue = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],

    }
    );
  }
  onSubmit(): void {
    this.showButton = false;
    if (this.formValue.valid) {
      this._auth.login(this.formValue.value).subscribe(
        (result:any) => {
          console.log("result",result);
          if(result===true){
            this.badgeDanger=false;
            this.router.navigate(['/home']);
          }else{
            this.badgeDanger=true;
          }
        },
        (err: Error) => {
          this.badgeDanger=true;
          alert(err.message);
        }
      );
    }
    setTimeout(()=>{
      this.showButton = true;
    },2000)
  }
  get registerFormControl() {
    return this.formValue.controls;
  }
  // onSubmit(){
  //   this._api.userLogin().subscribe(res=>{
  //    const user = res.find((a:any)=>{
  //       return a.userName === this.formValue.value.userName && a.password ===  this.formValue.value.password
  //    })

  //  })
  //  console.log("user")
  // }

}
