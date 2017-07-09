/**
 * Created by yin on 17-7-9.
 */
import {AbstractControl, Validators, ValidatorFn} from '@angular/forms';
import {isPresent} from '../util';

export const myTel: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
    if (isPresent(Validators.required(control))) {
        return null;
    }

    const v = control.value;
    const reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (reg.test(v) === false) {
        return {tel: true};
    }

    return null;
};
