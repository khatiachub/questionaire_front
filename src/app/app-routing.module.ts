import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { RecievedQuestionsComponent } from './pages/recieved-questions/recieved-questions.component';

const routes: Routes = [
  {path:'',component:AuthenticationComponent},
  {path:'answers',component:AnswersComponent},
  {path:'admin-panel',component:AdminPanelComponent},
  {path:'recieved-questions',component:RecievedQuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
