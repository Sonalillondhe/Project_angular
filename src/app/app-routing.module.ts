import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {path:'userRegister',component:UserRegisterComponent},
  {path:'update-user/:id',component:UserRegisterComponent},
  {path:'userLogin',component:LoginpageComponent},
  {path:'', redirectTo :'/userLogin', pathMatch:'full' },
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  // {path:"dashboard:/",component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
