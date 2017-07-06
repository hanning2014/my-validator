"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DIGITS_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MyIdcardDirective; }),
    multi: true
};
var vcity = {
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
var MyIdcardDirective = (function () {
    /**
     * 校验身份证格式
     */
    function MyIdcardDirective() {
    }
    MyIdcardDirective.prototype.validate = function (c) {
        return this.validator(c);
    };
    MyIdcardDirective.prototype.validator = function (control) {
        if (this.isPresent(forms_1.Validators.required(control))) {
            return null;
        }
        var v = control.value;
        var fail = { idcard: true };
        //校验长度，类型
        if (!this.isCardNo(v)) {
            this.printError('长度，类型');
            return fail;
        }
        //检查省份
        if (!this.checkProvince(v)) {
            this.printError('省份');
            return fail;
        }
        //校验生日
        if (!this.checkBirthday(v)) {
            this.printError('生日');
            return fail;
        }
        //检验位的检测
        if (!this.checkParity(v)) {
            this.printError('检验位');
            return fail;
        }
        return null;
    };
    //打印失败原因
    MyIdcardDirective.prototype.printError = function (e) {
        console.error("\u8EAB\u4EFD\u8BC1<" + e + ">\u6821\u9A8C\u5931\u8D25");
    };
    MyIdcardDirective.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    //检查号码是否符合规范，包括长度，类型
    MyIdcardDirective.prototype.isCardNo = function (v) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(v) === false) {
            return false;
        }
        return true;
    };
    MyIdcardDirective.prototype.checkProvince = function (v) {
        var province = v.substr(0, 2);
        if (vcity[province] === undefined) {
            return false;
        }
        return true;
    };
    //检查生日是否正确
    MyIdcardDirective.prototype.checkBirthday = function (v) {
        var len = v.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len === 15) {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = v.match(re_fifteen);
            var year = Number('19' + arr_data[2]);
            var month = Number(arr_data[3]);
            var day = Number(arr_data[4]);
            var birthday = new Date('19' + year + '/' + month + '/' + day);
            return this.verifyBirthday(year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len === 18) {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = v.match(re_eighteen);
            var year = Number(arr_data[2]);
            var month = Number(arr_data[3]);
            var day = Number(arr_data[4]);
            var birthday = new Date(year + '/' + month + '/' + day);
            return this.verifyBirthday(year, month, day, birthday);
        }
        return false;
    };
    //校验日期
    MyIdcardDirective.prototype.verifyBirthday = function (year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
            //判断年份的范围（3岁到100岁之间)
            var time = now_year - year;
            if (time >= 3 && time <= 100) {
                return true;
            }
            return false;
        }
        return false;
    };
    MyIdcardDirective.prototype.checkParity = function (v) {
        //15位转18位
        v = this.changeFivteenToEighteen(v);
        var len = v.length;
        if (len === 18) {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, valnum = void 0;
            for (var i = 0; i < 17; i++) {
                cardTemp += v.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if (valnum === v.substr(17, 1)) {
                return true;
            }
            return false;
        }
        return false;
    };
    //15位转18位身份证号
    MyIdcardDirective.prototype.changeFivteenToEighteen = function (v) {
        if (v.length === 15) {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0;
            v = v.substr(0, 6) + '19' + v.substr(6, v.length - 6);
            for (var i = 0; i < 17; i++) {
                cardTemp += v.substr(i, 1) * arrInt[i];
            }
            v += arrCh[cardTemp % 11];
            return v;
        }
        return v;
    };
    return MyIdcardDirective;
}());
MyIdcardDirective = __decorate([
    core_1.Directive({
        selector: '[my-idcard][formControlName],[my-idcard][formControl],[my-idcard][ngModel]',
        providers: [DIGITS_VALIDATOR]
    })
    /**
     * 校验身份证格式
     */
], MyIdcardDirective);
exports.MyIdcardDirective = MyIdcardDirective;
