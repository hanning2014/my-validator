import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";
import {isPresent} from "../util";

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
        return this.validator(c);
    }

    private validator(control: AbstractControl): { [key: string]: boolean } {
        if (isPresent(Validators.required(control))) {
            return null;
        }

        const v = control.value;
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(v) === false) {
            return {phone: true};
        }

        return null;
    }

}
