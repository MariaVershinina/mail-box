import { AuthService } from './../../services/auth.service';
import { MailBox } from '../../models';
import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  @Input() mailbox: MailBox;
  @Input() invisible: boolean;
  public isUnRead:boolean;
  public currentUnRead:number;
  
  constructor(private router:Router, private authService:AuthService) {}

   onSelect(mailbox: MailBox ) {
       this.router.navigate(['/mailbox'], {queryParams: {'mailbox': mailbox.id}});
   }
  ngOnInit() {
  }
  ngDoCheck(){ this.isUnRead =  this.mailbox.messageslist.filter((message)=>message.sendTo.email == localStorage.getItem("mailuser")).some((message)=> { {return message.isRead === false}});
               this.currentUnRead =  this.mailbox.messageslist.filter((message)=>message.sendTo.email == localStorage.getItem("mailuser")).filter((message)=> { {return message.isRead === false}}).length;
  }

}
