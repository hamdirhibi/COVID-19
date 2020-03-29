import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {



  notificationAlreadyReceived = false;
  originalCoords;


  DISTANCE_TO_MOVE = 0.00069;


  constructor(
    private network: Network,
    public localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    public geolocation: Geolocation,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageservice : LanguageService
  ) {
    platform.ready().then(() => {
      this.geolocation.getCurrentPosition()
        .then(position => {
          this.originalCoords= position.coords;
          console.log("original=" + this.originalCoords);
        })
        .catch((error) => {
          console.log('error', error);
        })
        this.backgroundMode.on("activate").subscribe(() => {
          console.log("activated");
          this.backgroundMode.disableWebViewOptimizations();
          this.backgroundMode.moveToBackground();
         // this.showNotification();
          setInterval(this.trackPosition, 2000);
        });
        
        this.backgroundMode.enable();
      });
   



    this.sideMenu();
    this.initializeApp();
    this.testit() ; 
  }

  testit(){



    // watch network for a disconnection
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('Network was disconnected ');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  alert('Network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      alert('We got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();
  }


  // watch network for a disconnection
 disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  alert('Network was disconnected');
});



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageservice.setInitialApplanguage() ; 

    });
  }


  showNotification () {
    this.localNotifications.schedule({
      text: 'Please wash your hand',
      silent: false
    });

    this.notificationAlreadyReceived = true;
  }


  trackPosition = () => {
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        console.log('tracking...');
        this.handleMovement(position.coords);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  onSuccess(){

  }
  handleMovement = coords => {
     console.log('here');
    const distanceMoved = this.getDistanceFromLatLonInKm(
      this.originalCoords.latitude,
      this.originalCoords.longitude,
      coords.latitude,
      coords.longitude
    );
    console.log("distmoved = " + distanceMoved); 
    console.log('distance to move=' + this.DISTANCE_TO_MOVE);
    if (
      distanceMoved > this.DISTANCE_TO_MOVE 
      && this.notificationAlreadyReceived === false
    ) {
      console.log('distance');
       this.showNotification();
    }
  };


  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
   }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  navigate : any;
  sideMenu()
  {
    this.navigate =
      [ {
        title : "Profil",
        url   : "/tabs/tabs/tab3",
        icon  : "person"
        },
        {
          title : "News",
          url   : "/tabs/tabs/tab4",
          icon  : "planet"
        },
        {
          title : "Conversations",
          url   : "/tabs/tabs/tab1",
          icon  : "chatboxes"
        },
        {
          title : "Best Practices",
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
        title : "Suggestions",
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
