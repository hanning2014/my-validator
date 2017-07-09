import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {myPhone} from "./my-phone.validation";

const DIGITS_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MyPhoneDirective),
    multi: true
};

@Directive({
    selector: '[my-phone][formControlName],[my-phone][formControl],[my-phone][ngModel]',
    providers: [DIGITS_VALIDATOR]
})

/**
 * 校验手机号格式
 */
export class MyPhoneDirective implements Validator {
    validate(c: AbstractControl): { [key: string]: any } {
        return myPhone(c);
    }
}
