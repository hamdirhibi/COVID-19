import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  ngOnInit() {
    this.videoPlayer.play('https://www.youtube.com/watch?time_continue=39&v=bPITHEiFWLc&feature=emb_logo').then(() => {

      console.log('video completed');
      
      }).catch(err => {
      
      console.log(err);
      
      });
  }

  constructor(
    private youtube: YoutubeVideoPlayer,
    private videoPlayer: VideoPlayer
    ) {}

    playVideoHosted() {
      this.videoPlayer.play('https://www.youtube.com/watch?time_continue=39&v=bPITHEiFWLc&feature=emb_logo').then(() => {
        console.log('video completed');
      }).catch(err => {
        console.log(err);
      });
    }

    openMyVideo(id){
      this.playVideoHosted() ; 
    }

}
