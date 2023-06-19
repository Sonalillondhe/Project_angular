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
  currentPage = 1;
  itemsPerPage = 10;
  
  // datafromapi:any;
  userEmail: string | null=null;
  userPass: string | null=null;

  constructor(private http:HttpService,private route:ActivatedRoute){}

  ngOnInit(): void {

   this.usersData();

   console.log("activated route",this.route);
   this.userEmail=this.route.snapshot.queryParamMap.get('user_email');
   console.log(this.userEmail);
   this.userPass=this.route.snapshot.queryParamMap.get('user_pwd');
   console.log(this.userPass);
  
   
  }

  usersData()
  {
     this.http.getDataFromServer("").subscribe((res:any)=>
     {
       console.log("result",res.data);
       
      //  if(res && res.length>0){
        
        this.datafromapi= res.data;
        this.datafromapi=this.datafromapi;
      // }
      // this.datafromapi=res;
      // this.datafromapi=this.datafromapi.data;
    },
   error=> {
    console.log("error");
    })
  }
  deleteUser(user_id: any) 
  {
    const endPoint = "remove_user/" + user_id;
    this.http.DeleteDataFromserver(endPoint).subscribe((res: any) => 
    {
      console.log(res);
      this.datafromapi.splice(user_id, 1);
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

