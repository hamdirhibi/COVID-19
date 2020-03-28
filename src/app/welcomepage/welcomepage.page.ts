import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'gl-ionic-background-video';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.page.html',
  styleUrls: ['./welcomepage.page.scss'],
})
export class WelcomepagePage implements OnInit {

  constructor(private router : Router) { }

  async ngOnInit() {
    //await this.sleep(3000);
      //  this.router.navigate(['/tabs/tabs/tab1']); 

    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    gohome(){
      
      this.router.navigate(['/tabs/tabs/tab1']); 
    }
}
