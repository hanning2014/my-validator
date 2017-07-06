import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";
import {isPresent} from "../util";

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
        return this.validator(c);
    }

    private validator(control: AbstractControl): { [key: string]: boolean } {
        if (isPresent(Validators.required(control))) {
            return null;
        }

        const v = control.value;
        const reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        if (reg.test(v) === false) {
            return {tel: true};
        }

        return null;
    }

}
