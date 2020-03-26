import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.page.html',
  styleUrls: ['./welcomepage.page.scss'],
})
export class WelcomepagePage implements OnInit {

  constructor(private router : Router) { }

  async ngOnInit() {
    await this.sleep(3000);
          this.router.navigate(['/signup']); 

    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}
