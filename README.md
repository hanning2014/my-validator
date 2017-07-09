# my-validator
Angular2&amp;4 Validator

适用于: 中国(Scope: china)

## First 
in your module
```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
        ReactiveFormsModule,
        HttpModule,
        MyValidatorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

## then

#### Template-driven Forms
```
<input id="idcard" type="text" class="form-control"
       name="idcard" [(ngModel)]="obj.idcard" #idcard="ngModel" my-idcard required>
<p *ngIf="idcard.errors && idcard.errors.idcard && !idcard.pristine">icard format error</p>
```

#### Reactive-driven Forms
in your typescript
```
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyValidator} from "./my-validator/my-validator.module";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    protected obj = { };
    protected form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            idcard2: ['', [Validators.required, MyValidator.myIdCard]]
        });
    }

}
```
in your html
```
<input id="idcard2" type="text" class="form-control" formControlName="idcard2">
<p *ngIf="form.get('idcard2').errors && form.get('idcard2').errors['idcard']
&& !form.get('idcard2').pristine">icard format error</p>
```
