import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NewsPage } from './news/news.page';

const routes: Routes = [
  { path: '', redirectTo: 'welcomepage', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  // { path: 'enter-code', loadChildren: './enter-code/enter-code.module#EnterCodePageModule' },
  { path: 'conversation', loadChildren: './conversation/conversation.module#ConversationPageModule' },
  { path: 'news-single', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab7', loadChildren: './tab7/tab7.module#Tab7PageModule' },
  { path: 'testcovid', loadChildren: './testcovid/testcovid.module#TestcovidPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'welcomepage', loadChildren: './welcomepage/welcomepage.module#WelcomepagePageModule' },
  { path: 'tab8', loadChildren: './tab8/tab8.module#Tab8PageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
