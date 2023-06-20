import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  
  registrationForm!: FormGroup ;
  errormessage:string='';
  selectedId:string|null=null;
  constructor(private fb: FormBuilder,private https:HttpService,private route:ActivatedRoute) {
  }

  ngOnInit(): void 
  {
    this.createFormStructure();

    this.selectedId = this.route.snapshot.paramMap.get("id");
    console.log("Selectedid", this.selectedId);
    
    
  }

  createFormStructure() {

    this.registrationForm = this.fb.group({
      
      // 'username': this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), 
      //   Validators.pattern("[a-zA-Z]{2,10}")]),
      // 'userpassword':this.fb.control ('', [Validators.required,Validators.minLength(5)]),
      // 'usercontactno':this.fb.control ('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      // 'usergender': this.fb.control('', []),
      // 'useremail': this.fb.control('', [Validators.required]),

      'username': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), 
        Validators.pattern("[a-zA-Z]{2,10}")]],
      'userpassword': ['', [Validators.required,Validators.minLength(5)]],
      'usercontactno': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      'usergender': ['', []],
      'useremail': ['', [Validators.required]],

  })

  }
  
  save() 
  {
    // console.log(this.registrationForm.value)

    let formData= new FormData();

    formData.set('user_name',this.registrationForm.get('username')?.value);
    formData.set('user_password',this.registrationForm.get('userpassword')?.value);
    formData.set('user_contact_no',this.registrationForm.get('usercontactno')?.value);
    formData.set('user_gender',this.registrationForm.get('usergender')?.value);
    formData.set('user_email',this.registrationForm.get('useremail')?.value);
    // console.log(formData);

   
this.https.saveDataToServer('Register',formData).subscribe(
  (response: any) => 
    { 
      this.errormessage='';
      console.log(response)
        if (response.status === 1) 
        {
          this.errormessage =response.message;
        }
      })

}

  


  
  get Name() {
    return this.registrationForm.controls['username'];
  }
  get email() {
    return this.registrationForm.controls['useremail'];
  }

  get password() {
    return this.registrationForm.controls['userpassword'];
  }
  get mobileNo() {
    return this.registrationForm.controls['usercontactno'];
  }


  

  


}

