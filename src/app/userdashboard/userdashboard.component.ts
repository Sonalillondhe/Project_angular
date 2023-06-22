import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  displayedColumns: string[] = ['user_name', 'user_id', 'user_email', 'user_phone_no', 'user_gender',
    'user_pwd', 'user_reg_date', 'Action']

  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpService, private dialog: MatDialog) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  OnEdit(rowdata: any) 
  {
    console.log("rowdata",rowdata);

    let config = new MatDialogConfig();
    config.width = "800px";
    
    config.data =     // to send data to dashboard comp
    {
      'action':"Edit",
      'rowData': rowdata    
    };

    const dialogRef=this.dialog.open(UserRegisterComponent, config);

    dialogRef.afterClosed().subscribe((e1:any)=>{
      console.log('data from received after closed',e1);
   
     let  selectedIndex= this.dataSource.data.findIndex((el:any)=> el.user_id === rowdata.user_id);
     console.log("selectedId",selectedIndex);

     this.dataSource.data[selectedIndex].user_name=e1.data.user_name;
     this.dataSource.data[selectedIndex].user_email=e1.data.user_email;
     this.dataSource.data[selectedIndex].user_gender=e1.data.user_gender;
     this.dataSource.data[selectedIndex].user_pwd=e1.data.user_password;
     this.dataSource.data[selectedIndex].user_phone_no=e1.data.user_contact_no;

     this.dataSource = new MatTableDataSource(this.dataSource.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     console.log('data from received after closed',this.dataSource.data);

    })
    
  }


  OnDelete(row:any)
  {
    let obj=
    { 
      user_id:row.user_id
    }
    this.http.DeleteDataFromserver('remove_user',obj).subscribe((res:any)=>
    {
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.UserList();
  }

  UserList() {
    this.http.getDataFromServer('').subscribe((res: any) => {
      if (res && res.status == 1 && res.data.length > 0) {
        this.dataSource = new MatTableDataSource(res.data);
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => { }
    )
  }

}

