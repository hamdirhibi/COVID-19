import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-testcovid',
  templateUrl: './testcovid.page.html',
  styleUrls: ['./testcovid.page.scss'],
})
export class TestcovidPage implements OnInit {
  
  message =false;
  
  constructor() {
    
   }
  index = 0;
  score=0;
  
  alert= ""; 
  questions = [
    '1', 
    '2' , 
    '3' ,
    '4' ,
    '5' ,
    '6'
 ] ; 
   scores = [2 , 2 , 2 , 1 , 1 , 1];  
   statusYes =[false,false,false,false,false,false];
   statusNo = [false,false,false,false,false,false];
  
  ngOnInit() {
    this.restart();
  }

  restart(){
    this.statusYes =[false,false,false,false,false,false];
    this.statusNo = [false,false,false,false,false,false];
    this.score= 0;
    this.index=0;
  
  }

  choose(value){
     if(value === 'Yes')
        {   
          this.statusYes[this.index] = true ; 
          this.statusNo[this.index] = false; 
        } else{
          this.statusYes[this.index] = false ; 
          this.statusNo[this.index] = true; 
          
        }

  } 

  next(){
    if(!this.statusYes[this.index] && !this.statusNo[this.index]){
      this.message=true;
      return ;
    }
  this.index++;
  this.message=false;
   if(this.index === 6) 
  this.calculScore();
    
  }

  calculScore(){
    for(let i=0 ; i < 6;i++ )
    {
      this.score =  this.statusYes[i] ? this.score + this.scores[i]  : this.score  ;
    }


  }

  return(){
    this.index--;
  }

}
