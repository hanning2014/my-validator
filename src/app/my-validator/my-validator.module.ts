import {NgModule} from '@angular/core';
import {MyIdcardDirective, myIdCard} from "./idcard";
import {MyPhoneDirective, myPhone} from "./phone";
import {MyTelDirective, myTel} from "./tel";

export const MyValidator: any = {
    myIdCard,
    myPhone,
    myTel
};

const MY_VALIDATOR_DIRECTIVES = [
    MyIdcardDirective,
    MyPhoneDirective,
    MyTelDirective
];

@NgModule({
    declarations: [MY_VALIDATOR_DIRECTIVES],
    exports: [MY_VALIDATOR_DIRECTIVES]
})
export class MyValidatorModule {
}
