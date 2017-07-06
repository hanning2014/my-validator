import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyIdcardDirective} from "./idcard/my-idcard.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MyIdcardDirective
  ],
  exports: [
    MyIdcardDirective
  ]
})
export class MyValidatorModule {
}
