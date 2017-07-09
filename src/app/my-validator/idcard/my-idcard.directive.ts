import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {myIdCard} from "./my-idcard.validation";


const DIGITS_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MyIdcardDirective),
    multi: true
};

@Directive({
    selector: '[my-idcard][formControlName],[my-idcard][formControl],[my-idcard][ngModel]',
    providers: [DIGITS_VALIDATOR]
})

/**
 * 校验身份证格式
 */
export class MyIdcardDirective implements Validator {
    validate(c: AbstractControl): { [key: string]: any } {
        return myIdCard(c);
    }
}
