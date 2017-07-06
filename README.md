# my-validator
Angular2&amp;4 Validator

## First 
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MyValidatorModule} from './my-validator/my-validator.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyValidatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

## then

### Idcard
<input id="idcard" type="text" class="form-control"
       name="idcard" [(ngModel)]="obj.idcard" #idcard="ngModel" my-idcard required>
<p *ngIf="idcard.errors && idcard.errors.idcard && !idcard.pristine">icard format error</p>
