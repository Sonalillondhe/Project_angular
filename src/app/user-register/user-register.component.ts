import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  errormessage: string = '';

  isUpdate: boolean = false;

  constructor(private fb: FormBuilder, private https: HttpService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void
   {
    console.log(" user data received from dashboard Comp: ", this.data.rowData); // to get data from dashboard comp

    this.createFormStructure();

    if (this.data != undefined && this.data.action == "Edit") 
    {
      this.isUpdate = true;

      this.registrationForm.patchValue(this.data.rowData);
      this.registrationForm.get('user_password')?.setValue(this.data.rowData.user_pwd);
      this.registrationForm.get('user_contact_no')?.setValue(this.data.rowData.user_phone_no);

    }
  }

  createFormStructure() {

    this.registrationForm = this.fb.group({

      'user_name': this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(10),
      Validators.pattern("[a-zA-Z]{2,10}")]),
      'user_password': this.fb.control('', [Validators.required, Validators.minLength(5)]),
      'user_contact_no': this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'user_gender': this.fb.control('', []),
      'user_email': this.fb.control('', [Validators.required]),


    })

  }

  PerformAction() 
  {
    if (!this.isUpdate) 
    {
      this.signup()
    }
    else 
    {
      this.updateUserData();
    }
  }

  updateUserData() 
  {
    this.dialogRef.close({"data":this.registrationForm.value});

    this.https.UpdateUserData('update_user', this.registrationForm.value).subscribe((res: any) => {
      console.log(res);
    },
      (error) => {

      }
    )
  }
  signup() {
    // console.log(this.registrationForm.value)

    let formData = new FormData();

    formData.set('user_name', this.registrationForm.get('user_name')?.value);
    formData.set('user_password', this.registrationForm.get('user_password')?.value);
    formData.set('user_contact_no', this.registrationForm.get('user_contact_no')?.value);
    formData.set('user_gender', this.registrationForm.get('user_gender')?.value);
    formData.set('user_email', this.registrationForm.get('user_email')?.value);
    // console.log(formData);


    this.https.saveDataToServer('Register', formData).subscribe(
      (response: any) => {
        this.errormessage = '';
        console.log(response)
        if (response.status === 1) {
          this.errormessage = response.message;
        }
      })


  }





  get Name() {
    return this.registrationForm.controls['user_name'];
  }
  get email() {
    return this.registrationForm.controls['user_email'];
  }

  get password() {
    return this.registrationForm.controls['user_password'];
  }
  get mobileNo() {
    return this.registrationForm.controls['user_contact_no'];
  }







}

