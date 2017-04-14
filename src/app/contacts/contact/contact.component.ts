import { User } from '../../models';
import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
@Input()  user:User;
@Output() onCheck: EventEmitter<any> = new EventEmitter();
@Output() onChangeUser: EventEmitter <any> = new EventEmitter();
public currentUser:string;

constructor() {this.currentUser = localStorage.getItem("mailuser");}

  public check(event){
    this.onCheck.emit(this.user.email);
  };

  public changeUser(event){
   this.onChangeUser.emit(this.user);
  }
  
  ngOnInit() {
  }

}
