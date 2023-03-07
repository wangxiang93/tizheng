/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-02-20 15:17:54
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-02-22 11:25:17
 * @FilePath: \tizheng_react\src\mock\index.js
 * @Description: 
 */
import MockAdapter from 'axios-mock-adapter';
import ajax from 'src/commons/ajax';
import {simplify} from './util';

const mock = new MockAdapter(ajax.instance);

simplify(mock, [
    require('./mock-users').default,
    require('./mock-roles').default,
    require('./mock-menus').default,
    // 自己加的
    require('./mock-subjectManage').default,
    require('./mock-depart').default,
    require('./mock-indexTable').default,
]);
