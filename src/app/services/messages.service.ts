import { Injectable } from '@angular/core';
import { Message } from '../models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AuthService}from './../services/auth.service'
import {initialMessages} from '../Data';
import * as _ from 'underscore';
import  "rxjs/add/operator/scan"
import  "rxjs/add/operator/publishReplay"
@Injectable()
export class MessagesService {
 
  messages: Observable<Message[]>;
  orderedMessages: Observable<Message[]>;
  function: Subject<Function> = new Subject<Function>();
 
  constructor(private authService:AuthService) { 
    this.function.subscribe();
    this.messages = this.function
      .scan((messages: Message[],operator: Function) =>{return operator(messages)},initialMessages)
      .map((messages: Message[])=>messages.filter((message)=>(message.sendTo.email===this.authService.currentUser.email||message.author.email===this.authService.currentUser.email)))
      .map((messages: Message[])=>messages.filter((message)=>(message.delete !==this.authService.currentUser.email)))
      .publishReplay(1) //кеш
      .refCount();
    this.orderedMessages = this.messages.map((messages: Message[]) => {
        return _.sortBy(messages, 'sentAt').reverse();
    });
  }
  //создание операторов для function
 initial(){
    this.function.next((messages:any) => {return messages });
  }
  addMessage(message:Message){
       this.function.next((messages:any) => {return messages.concat(message) });
  }
  isRead(readmessage:Message){
    this.function.next(
      (messages:any) => {return messages.map((message) => {if (message.id === readmessage.id) {message.isRead = true};return message})}
    )
  }
  deleteMessage(deletemessage:Message){debugger;
    this.function.next(
      (messages:any) => {return messages.map((message) => {if (message.id === deletemessage.id) {message.delete = this.authService.currentUser.email};return message})}
    )
  }

  filterMessages(messages: Message[], substr:string):Message[]{
    let lowerSubstr = substr.toLowerCase();
    function searchSubsr(message: Message){
       let letter = message.text.toLowerCase();
       if(~letter.indexOf(lowerSubstr)){
        return true;
       }
    }
    return messages.filter(searchSubsr);
  }

  search(e){
     this.function.next((foo:any) => {return this.filterMessages(foo, e) });
  }

  ngOnInit(){}
}