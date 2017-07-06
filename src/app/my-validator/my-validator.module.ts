import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyIdcardDirective} from "./idcard/my-idcard.directive";
import {MyPhoneDirective} from "./phone/my-phone.directive";
import {MyTelDirective} from "./tel/my-tel.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MyIdcardDirective,
        MyPhoneDirective,
        MyTelDirective
    ],
    exports: [
        MyIdcardDirective,
        MyPhoneDirective,
        MyTelDirective
    ]
})
export class MyValidatorModule {
}
