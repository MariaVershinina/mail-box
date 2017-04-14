import { MessagesService } from './../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/pluck";
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  public word;
  public searchlist;
   
  constructor(private route: ActivatedRoute,
              private messagesService:MessagesService) {  
      this.route.params.pluck('word').subscribe(word => this.word = word );
      this.messagesService.messages.subscribe((messages) => this.searchlist = messages)
  }
 
  ngOnInit() {
  }

}
