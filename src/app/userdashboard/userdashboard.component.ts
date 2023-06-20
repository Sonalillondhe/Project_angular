import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit{
 
  displayedColumns: string[]=['user_name', 'user_id','user_email','user_phone_no' ,'user_gender',
  'user_pwd','user_reg_date','Action']
 
  dataSource!: MatTableDataSource<any>;
 
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private http:HttpService,private dialog:MatDialog){}
  
  applyFilter(event: Event)
   {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 
   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }
 
 OnEdit()
 {
 let config= new MatDialogConfig();
 config.width="800px";
//  config.panelClass="model";

 this.dialog.open(UserRegisterComponent, config);
 }
   ngOnInit(): void {
      this.UserList();
   }
 
   UserList()
   {
     this.http.getDataFromServer('').subscribe((res:any)=>
     {
       if( res && res.status== 1 && res.data.length >0 )
       {
        this.dataSource = new MatTableDataSource(res.data);
         console.log(res);
         this.dataSource.paginator= this.paginator;
         this.dataSource.sort = this.sort;
       }
     },error=>{}
     )
   }
   
 }
 
