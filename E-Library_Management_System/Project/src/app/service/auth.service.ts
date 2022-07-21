import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

user:any;
isAuthenticated=false;
isAdmin=false;
isUser=false;
response:any;
data:any;
  constructor(private http:HttpClient,private router:Router) { }

  public authenticateEmployee(data:any)
  {

    console.log(data);
    return this.http.get('http://localhost:3000/signupuser').subscribe(response=>{
    console.log(response);
      this.user=response;
      console.log(this.user);
      this.data=data;
      this.authenticateUser();
      this.navigateUser();
    })
  }

  authenticateUser()
  {
    console.log(this.user);
    
    this.response=(this.user.find((x:any)=>{
      console.log(x.userName);
      return x.username==this.data.username && x.createpassword==this.data.createpassword
   

    }))
  }

navigateUser(){
  if(this.response)
  {
    this.checkRole();
  }
  else{
    alert ("Invalid Credential");
  }
}
checkRole()
{
  this.isAuthenticated=true;
  if(this.response.role ==='admin')
  {
    this.isAdmin=true;
    this.isAuthenticated=true;
    this.router.navigate(['/adminlanding']);
  }
  else if(this.response.role==='user')
  {
    this.isUser=true;
    this.isAuthenticated=true;
    this.router.navigate(['/afterlogin']);
  }
  else
  {
    alert ("Invalid user");
  }
}
}

 