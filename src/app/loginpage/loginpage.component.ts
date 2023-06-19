import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginForm!: FormGroup;

  errormessage: string = '';

  constructor(private fb: FormBuilder,private http: HttpService,private https: HttpClient,private router: Router) { }

  ngOnInit(): void
  {
     this.LoginFormstructure();
  }

  LoginFormstructure() 
  {
    this.loginForm = this.fb.group({

      'user_email': ['', [Validators.required]],
      'user_pwd': ['', [Validators.required]],
    })
  }


  Save()
   {
    // let params = new HttpParams();
    // // console.log(this.loginForm.value);
    // const formValues = this.loginForm.value;
    // Object.keys(formValues).forEach((key) =>
    //  {
    //   if (formValues[key])
    //    {
    //      params = params.set(key, formValues[key]);
    //    }
    // });

    let endPoint = 'login?' + 'user_email=' + this.loginForm.get('user_email')?.value + "&" +
      'user_pwd=' + this.loginForm.get('user_pwd')?.value;

   
    this.http.getDataFromServer(endPoint).subscribe(
      (response: any) => 
      {
        this.errormessage = '';
        console.log(response);

        if (response.status == 1)
        {
          this.router.navigate(['/dashboard']);
        }
        if (response.status === 0) 
        {
          this.errormessage = response.message;
        }
      })

    //     this.https.get('https://devrunner.co.in/machine_test/index.php/web_api/Users/login',{params }).subscribe(
    //     (response:any) => {
    //       // Handle the response
    //       console.log(response);
    // })

  }
  get Email() {
    return this.loginForm.controls['user_email'];
  }

  get password() {
    return this.loginForm.controls['user_pwd'];
  }

}
