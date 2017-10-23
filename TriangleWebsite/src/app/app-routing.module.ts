import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./+main/main.component";
import { SignInComponent } from "./+sign-in/sign-in.component";
import { CalendarComponent } from "./+calendar/calendar.component";
import { LaundryComponent } from "./+laundry/laundry.component";
import { LatePlateComponent } from "./+late-plate/late-plate.component";
import { RackTagComponent } from "./+rack-tag/rack-tag.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
    { path: '', pathMatch: 'full', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SignInComponent },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    { path: 'laundry', component: LaundryComponent, canActivate: [AuthGuard]},
    { path: 'lateplate', component: LatePlateComponent, canActivate: [AuthGuard] },
    // { path: 'racktag', component: RackTagComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
