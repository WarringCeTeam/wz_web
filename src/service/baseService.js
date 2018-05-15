/**
 * 描述：基类
 */
import axios from '@/js/libs/http';

export const fetch = axios;

export const apiFormat = (str, res) => {
    let reg = /\{(\w+?)\}/gi;
    return str.replace(reg, ($0, $1) => {
        return res[$1];
    });
};
