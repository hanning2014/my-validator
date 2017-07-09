/**
 * Created by yin on 17-7-9.
 */
import {AbstractControl, Validators, ValidatorFn} from '@angular/forms';
import {isPresent} from '../util';

export const myPhone: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
    if (isPresent(Validators.required(control))) {
        return null;
    }

    const v = control.value;
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(v) === false) {
        return {phone: true};
    }

    return null;
};
