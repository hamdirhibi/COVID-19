import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

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

  constructor(
    private router: Router,
    //private http: HttpClient,
    private newsService: NewsService

    ) { }

  ngOnInit() {

    this.newsService
    .getData(
      `top-headlines?country=us&category=business&pageSize=5&page=${
        this.page
      }`
    )
    .subscribe(data => {
      console.log(data);
      this.data = data;
    });
   
  }


  loadMoreNews(event) {
    this.page++;
    console.log(event);
    this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
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

  onGoToNewsSinglePage(article) {
    console.log(article);
    this.newsService.currentArticle = article;
    localStorage.setItem('title',article.title); 
    localStorage.setItem('content',article.content); 
    localStorage.setItem('author',article.author); 
    localStorage.setItem('urlToImage',article.urlToImage); 

    this.router.navigate(['/news-single']);
  }










}
