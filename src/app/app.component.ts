import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mcart-frontend';
  dateVal = new Date();
  duration:string = "3 Hours";
  constructor(){}
}
