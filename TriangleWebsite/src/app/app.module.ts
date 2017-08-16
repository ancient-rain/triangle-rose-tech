import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainComponent } from './+main/main.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { LaundryComponent } from './+laundry/laundry.component';
import { SignInComponent } from './+sign-in/sign-in.component';
import { RackTagComponent } from './+rack-tag/rack-tag.component';
import { LatePlateComponent } from './+late-plate/late-plate.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { CalendarEventComponent } from './services/calendar-event/calendar-event.component';
import { LatePlateIconComponent } from './services/late-plate-icon/late-plate-icon.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { RackComponent } from './services/rack/rack.component';
import { RackRoomInfoComponent } from './rack-room-info/rack-room-info.component';
import { UploadProfilePicComponent } from './upload-profile-pic/upload-profile-pic.component';

export const MaterialModules = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CalendarComponent,
    LaundryComponent,
    SignInComponent,
    RackTagComponent,
    LatePlateComponent,
    CalendarEventComponent,
    LatePlateIconComponent,
    CreateEventComponent,
    ReversePipe,
    RackComponent,
    RackRoomInfoComponent,
    UploadProfilePicComponent,
  ],
    entryComponents: [
    CreateEventComponent,
    RackRoomInfoComponent,
    UploadProfilePicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModules,
    FlexLayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
