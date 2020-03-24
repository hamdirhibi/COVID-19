import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  author;
  content; 
  title ; 
  urlToImage; 
  constructor(
    
    //private newsService: NewsService
    
    ) {}

  ngOnInit() {

    this.author = localStorage.getItem('author');
    this.content = localStorage.getItem('content');
    this.title = localStorage.getItem('title');
    this.urlToImage = localStorage.getItem('urlToImage');
    
    console.log(this.author+" "+this.content+" "+this.title+" "+this.urlToImage);

  }


}
