import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: any;
 
  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
 //   return this.http.get('http://newsapi.org/v2/top-headlines?country=fr&&pageSize=5&page=1&&apiKey=4d97ac9b1619491ca1eccf0687e0305e');
  }


}
