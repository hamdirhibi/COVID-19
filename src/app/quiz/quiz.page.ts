import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  constructor() { }
  index = 0;

  questions = ['1', '2', '3', '4', '5'];
  responseYes = ['1', '2', '3', '4', '5'
  ];
  responseNo = ['1', '2', '3', '4', '5'
  ];

  messages = ['1', '2', '3', '4', '5']

  statusYes = [false, false, false, false, false];
  statusNo = [false, false, false, false, false];

  ngOnInit() {
    this.restart();
  }

  restart() {
    this.statusYes = [false, false, false, false, false];
    this.statusNo = [false, false, false, false, false];
    this.index = 0;

  }
  choose(value) {
    if (value === 'Yes') {
      this.statusYes[this.index] = true;
      this.statusNo[this.index] = false;
    } else {
      this.statusYes[this.index] = false;
      this.statusNo[this.index] = true;

    }

  }

  next() {
    this.index++;

  }


}
