import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import { MailBox } from '../models';
import { Message } from './../models';
import { MailboxService } from './../services/mailbox.service';
import { AuthService } from './../services/auth.service';
import {MessagesService} from  './../services/messages.service';
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public messages;
  private querySubscription: Subscription;
  private messagesSubscription;
  private currentmailbox;
  public invisible:boolean= false;
  public deleteArray = [];
  
  constructor(private messagesService: MessagesService,
              private route: ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              private location: Location) {

          this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => { 
                if ( queryParam['mailbox']){
                        this.currentmailbox = queryParam['mailbox'];}
                        else {this.router.navigate([''])}
                    
            } 
          );

          this.messagesSubscription = messagesService.orderedMessages 
            .map((messages)=>{  return messages.filter((message)=>{ 
                return message.sendTo.email  === this.currentmailbox || 
                message.author.email  === this.currentmailbox });
            })
            .subscribe((messages)=>{ if ( messages.length>0){this.messages = messages;}
                              else {this.router.navigate([''])}});

    }

    public showUnread(){
      this.invisible = true;
    }

    public showAll(){
      this.invisible = false;
    }                                 
                  
   // Используется для чекбоксов
    createArray(message){
      if(~(this.deleteArray.indexOf(message))){
        this.deleteArray = _.without(this.deleteArray, message);
      } else {
      this.deleteArray.push(message);
      }   
    }   

    private deleteMessage(): void {
      this.deleteArray.map( (message) =>{ return  this.messagesService.deleteMessage(message) });
    }

    back(): void {
    this.location.back();
    }   
               
    ngOnInit() {}
  
    ngOnDestroy(){
      this.querySubscription.unsubscribe();
      this.messagesSubscription.unsubscribe();
    }
}
