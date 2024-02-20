import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISurvey } from '../services/ISurvey';
import { DataService } from '../services/data.service';
import { HttpService } from '../services/http.service';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit, OnDestroy {
  pin: string = "";
  survey?: ISurvey;
  private subscription?: Subscription; 

  constructor(private dataService: DataService, private httpService: HttpService, private socketService: SocketService) {}

  ngOnInit() {
    this.pin = this.dataService.pin;
    this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
      if (message[0] === 'survey') {
        this.survey = JSON.parse(message[1]);
      }
    });
  }
   
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
