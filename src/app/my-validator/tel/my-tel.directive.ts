import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";
import {myTel} from "./my-tel.validation";

const DIGITS_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MyTelDirective),
    multi: true
};

@Directive({
    selector: '[my-tel][formControlName],[my-tel][formControl],[my-tel][ngModel]',
    providers: [DIGITS_VALIDATOR]
})

/**
 * 校验固话格式
 */
export class MyTelDirective implements Validator {
    validate(c: AbstractControl): { [key: string]: any } {
        return myTel(c);
    }

}
