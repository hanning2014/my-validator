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
            idcard2: ['', [Validators.required, MyValidator.myIdCard]],
            phone2: ['', [Validators.required, MyValidator.myPhone]],
            tel2: ['', [Validators.required, MyValidator.myTel]]
        });
    }

}
