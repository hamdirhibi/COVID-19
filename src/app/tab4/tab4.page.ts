import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Events } from '@ionic/angular';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4page implements OnInit {
  article;
  data: any;
  page = 1;
  lang: string ;

  constructor(
    private events: Events,
    private router: Router,
    private http: HttpClient,
    private newsService: NewsService , 
    private languageService : LanguageService,
    private translate: TranslateService , 
    private languageServie : LanguageService 
    ) {
      events.subscribe('togglenews', () => {
        console.log("events received ") ; 
        this.page=  1 ; 
        this.data = null  ; 
        this.load() ; 
      });

   
     }
     load(){
      this.lang = this.languageService.selected ;  

      if(this.lang !== 'ar'&&this.lang!=='fr') 
      this.lang = 'en';
      console.log(this.lang);


  let lg   ; 
  if (this.lang=='en') lg = 'us'; 
  if (this.lang=='ar') lg = 'ae'; 
  if (this.lang=='fr') {
    this.http
    .get("http://newsapi.org/v2/top-headlines?country=fr&&category=health&&pageSize=5&page="+this.page+"&&apiKey=4d97ac9b1619491ca1eccf0687e0305e")
    .subscribe(data => {
      console.log(data);
      this.data = data;
    });
  
  }
  else {
  this.newsService
  .getData(
    `top-headlines?country=${lg}&&category=health&&pageSize=5&&page=${
      this.page
    }`
  )
  .subscribe(data => {
    console.log(data);
    this.data = data;
  });
 

     }
     }
  ngOnInit() {
    this.load() ; 
  }


  loadMoreNews(event) {
    this.page++;
    console.log(event);
    let lg   ; 
    if (this.lang=='en') lg = 'us'; 
    if (this.lang=='ar') lg = 'ae'; 
  //  if (this.lang=='fr') lg = 'fr'; 
  if (this.lang=='fr') {
    this.http
    .get("http://newsapi.org/v2/top-headlines?country=fr&&category=health&&pageSize=5&page="+this.page+"&&apiKey=4d97ac9b1619491ca1eccf0687e0305e")
    .subscribe(data => {
      for (const article of data['articles']) {
        this.data.articles.push(article);
      }
      event.target.complete();
      console.log(this.data); 
    });
  
  }
  else {

    this.newsService
      .getData(
        `top-headlines?country=${lg}&&category=health&&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(data => {
        // console.log(data);
        // this.data = data;
        for (const article of data['articles']) {
          this.data.articles.push(article);
        }
        event.target.complete();
        console.log(this.data);
      });
  }
}

  onGoToNewsSinglePage(article) {
    console.log(article);
    this.newsService.currentArticle = article;
    localStorage.setItem('title',article.title); 
    localStorage.setItem('content',article.description); 
    localStorage.setItem('author',article.author); 
    localStorage.setItem('urlToImage',article.urlToImage); 

    this.router.navigate(['/news-single']);
  }










}
