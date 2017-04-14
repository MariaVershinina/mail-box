import { MailboxService } from './../services/mailbox.service';
import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable"
import {ActivatedRoute} from "@angular/router";
import { MailBox} from './../models';

import "rxjs/add/operator/pluck";

@Component({
  selector: 'app-mailboxes',
  templateUrl: './mailboxes.component.html',
  styleUrls: ['./mailboxes.component.css']
})
export class MailboxesComponent implements OnInit {
  public mailboxes:MailBox[];
  public invisible:boolean= false;

  constructor(private mailboxService: MailboxService) {
    mailboxService.orderedMailboxes.subscribe((mailboxes)=>this.mailboxes=mailboxes);
  }
  public showUnread(){
    this.invisible = true;
  }
  public showAll(){
    this.invisible = false;
  }
  ngOnInit() {
  }

}
