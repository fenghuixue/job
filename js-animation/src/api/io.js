/**
 * @file axios请求
 */

import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseUrl: '/',
    transformRequest: [function (data) {
        return qs.stringify(data);
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 指定ajax请求
        'X-Requested-With': 'XMLHttpRequest'
    }
})