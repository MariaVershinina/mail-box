import { MessagesService } from './../services/messages.service';
import { UsersService } from './../services/users.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {initialMessages} from '../Data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  public user;
  showDialog = false;
  constructor( private messagesService:MessagesService,
                private usersService:UsersService,
               private router:Router,
               private auth:AuthService) {

    messagesService.messages.subscribe();
    this.messagesService.initial();
    if(localStorage.getItem("mailuser"))
      {this.usersService.users.map((users)=>{return users.filter((user)=>user.email === localStorage.getItem("mailuser"))})
                              .subscribe((e)=>{this.user=e[0]})};

  }
   
  createMessage() {
     this.router.navigate(['/newmessage']);
  }
  
  logOut(){
    this.auth.isLoggedOut();
  }
  ngOnInit() {
   
  }
   

}
