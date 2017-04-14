import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { MessagesService } from './messages.service';
import {UsersService} from  './../services/users.service';
import { User } from '../models';

@Injectable()
export class AuthService {
  
  public currentUser:User;

  constructor(private usersService: UsersService,private router:Router) { }

  login(email: string, password: string){
        this.usersService.users.map((users)=>{return users.filter((user)=>user.email === email && user.password === password)})
                                .subscribe((user)=>this.currentUser=user[0])
        if(this.currentUser) {
          localStorage.setItem('mailuser', this.currentUser.email)
        return true;
        }
        return false;
   }

   isLoggedIn():boolean{
      if(localStorage.getItem("mailuser")){
        this.usersService.users.map((users)=>{
          return users.filter((user)=>user.email === localStorage.getItem("mailuser"))})
                                .subscribe((user)=>{this.currentUser=user[0]});
            
      return true;
      }
      return false;
   }

  isLoggedOut():boolean{
    localStorage.removeItem("mailuser");
    this.router.navigate(['auth']);
    return false;
  }

}