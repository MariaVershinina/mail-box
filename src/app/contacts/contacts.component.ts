import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { UsersService } from './../services/users.service';
import { User } from './../models';
import * as _ from 'underscore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  public users;
  public changingUser:User;
  public canChange:boolean = false;
  public showForm:boolean = false;
  public currentUser:User = new User();
  public deleteArray = [];
  public message: boolean = false;
  public messageAdd: boolean = false;
  public hasChanged: boolean = false;


  constructor(private usersService: UsersService) {
    usersService.users.subscribe(users => this.users = users);
  }

  addForm(){
    this.showForm = true;
    return false;
  }

  cancel(){
    this.showForm = false;
    this.canChange = false;
    
    return false;
  }

// Используется для чекбоксов
  createArray(user){
    if(~(this.deleteArray.indexOf(user))){
      this.deleteArray = _.without(this.deleteArray, user);
    } else {
      this.deleteArray.push(user);
    }   
  }

  addUser(event: any): void {
    let m = _.indexOf(_.pluck(this.users, 'email'), this.currentUser.email);//проверка пользователя
    if (m != -1){
      this.message = true;
      setTimeout(function() {this.message = false;}.bind(this), 1500);
      return;
    }
    this.showForm = false;
    this.createUser();
    event.preventDefault();
  }

  private deleteUser(): void {
    this.deleteArray.map( (email) =>{ return  this.usersService.deleteUser(email) });
  }

  private createUser(): void {
      let createuser: User = new User();
      createuser.email =  this.currentUser.email;
      createuser.name = this.currentUser.name;
      createuser.surname = this.currentUser.surname;
      this.usersService.addUser(createuser);
      this.currentUser = new User();
      this.messageAdd = true;
      setTimeout(function() {this.messageAdd = false;}.bind(this), 1500);
  }

  public changeUserData(user){
    this.changingUser = user;
    this.canChange = true;
  }

  public changeUser(name, surname){
    this.usersService.changeUser(this.changingUser.email, name, surname);
    this.hasChanged = true;
    setTimeout(function() {
        this.canChange = false;
        this.hasChanged = false;}.bind(this), 2000);
  }

  ngOnInit() {
  }

}
