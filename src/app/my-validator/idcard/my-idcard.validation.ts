/**
 * Created by yin on 17-7-9.
 */
import {AbstractControl, Validators, ValidatorFn} from '@angular/forms';
import {isPresent} from '../util';

const vcity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
};

export const myIdCard: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
    if (isPresent(Validators.required(control))) {
        return null;
    }

    const v: string = control.value;
    const fail = {idcard: true};
    //校验长度，类型
    if (!isCardNo(v)) {
        printError('长度，类型');
        return fail;
    }
    //检查省份
    if (!checkProvince(v)) {
        printError('省份');
        return fail;
    }
    //校验生日
    if (!checkBirthday(v)) {
        printError('生日');
        return fail;
    }
    //检验位的检测
    if (!checkParity(v)) {
        printError('检验位');
        return fail;
    }
    return null;
};

//打印失败原因
function printError(e: string) {
    console.error(`身份证<${e}>校验失败`);
}

//检查号码是否符合规范，包括长度，类型
function isCardNo(v) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(v) === false) {
        return false;
    }
    return true;
}

function checkProvince(v) {
    const province = v.substr(0, 2);
    if (vcity[province] === undefined) {
        return false;
    }
    return true;
}

//检查生日是否正确
function checkBirthday(v) {
    const len = v.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === 15) {
        const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        const arr_data = v.match(re_fifteen);
        const year = Number('19' + arr_data[2]);
        const month = Number(arr_data[3]);
        const day = Number(arr_data[4]);
        const birthday = new Date('19' + year + '/' + month + '/' + day);
        return verifyBirthday(year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
        const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        const arr_data = v.match(re_eighteen);
        const year = Number(arr_data[2]);
        const month = Number(arr_data[3]);
        const day = Number(arr_data[4]);
        const birthday = new Date(year + '/' + month + '/' + day);
        return verifyBirthday(year, month, day, birthday);
    }
    return false;
}

//校验日期
function verifyBirthday(year: number, month: number, day: number, birthday) {
    const now = new Date();
    const now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
        //判断年份的范围（3岁到100岁之间)
        const time = now_year - year;
        if (time >= 3 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
}

function checkParity(v) {
    //15位转18位
    v = changeFivteenToEighteen(v);
    const len = v.length;
    if (len === 18) {
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0, valnum;
        for (let i = 0; i < 17; i++) {
            cardTemp += v.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum === v.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
}

//15位转18位身份证号
function changeFivteenToEighteen(v) {
    if (v.length === 15) {
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0;
        v = v.substr(0, 6) + '19' + v.substr(6, v.length - 6);
        for (let i = 0; i < 17; i++) {
            cardTemp += v.substr(i, 1) * arrInt[i];
        }
        v += arrCh[cardTemp % 11];
        return v;
    }
    return v;
}
