import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  playAudio(){
    let audio = new Audio();
    audio.src = ".../../assets/son.mp3";
    audio.load();
    audio.play();
  }

}
