import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datafromapi:User[]=[];
  
  userEmail: string | null=null;
  userPass: string | null=null;

  constructor(private http:HttpService,private route:ActivatedRoute){}

  ngOnInit(): void {

   this.usersData();
  }

  usersData()
  {
     this.http.getDataFromServer("Register").subscribe((res:any)=>
     {
       console.log("result",res.message);
       
      //  if(res && res.length>0)
      //  {
            this.datafromapi= res.data; 
      //  }
      
    },
   error=> {
    console.log("error");
    })
  }
  
  updateUser(userid:any){
    
  }

  deleteUser(user_id: any) 
  {
    console.log(user_id);

    const endPoint = "remove_user";
    this.http.DeleteDataFromserver(endPoint,user_id).subscribe((res: any) => 
    {
      console.log(res);
      console.log("deleted id",res.user_id);

    });

  }
   
}

export interface User {

   user_name:string,
   user_pwd:string,
   user_phone_no:number,
   user_gender:number,
   user_email:string,
   user_id?:number,


}

