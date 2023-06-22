import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [
  
  {path:'userRegister',component:UserRegisterComponent},
  {path:'userLogin',component:LoginpageComponent},
  {path:'', redirectTo :'/userLogin', pathMatch:'full' },
  {path:'Userdashboard',component:UserdashboardComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
