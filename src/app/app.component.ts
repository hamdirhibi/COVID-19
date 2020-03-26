import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  navigate : any;
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "News",
        url   : "/tabs/tabs/tab4",
        icon  : "planet"
      },
      {
        title : "Profil",
        url   : "/tabs/tabs/tab3",
        icon  : "person"
      },
      {
        title : "Conversations",
        url   : "/tabs/tabs/tab1",
        icon  : "chatboxes"
      },
      {
        title : "Health",
        url   : "/tabs/tabs/tab5",
        icon  : "heart"
      },
      // {
      //   title : "Contacts",
      //   url   : "/tabs/tabs/tab2",
      //   icon  : "contacts"
      // },
      {
        title : "Games",
        url   : "/tabs/tabs/tab6",
        icon  : "logo-playstation"
      },
      {
        title : "E-Learning",
        url   : "/tabs/tabs/tab7",
        icon  : "book"
      },
      {
        title: "Test Yourself", 
        url: "/tabs/tabs/testcovid",
        icon: "help-buoy"
      },
      {
        title: 'Are You Safe?',
        url: "/tabs/tabs/quiz",
        icon: "help"
      }
    ]
  }

}
