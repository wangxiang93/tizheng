/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-02-22 11:12:22
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-02-23 14:01:06
 * @FilePath: \tizheng_react\src\mock\mock-indexTable.js
 * @Description:
 */
import moment from 'moment';
import executeSql, {initDB} from 'src/mock/web-sql';
import {arraytotree} from 'src/commons/utils.js';
export default {
    // 获取列表
    'get /indexTable/queryListByPage': async (config) => {
        const {pageSize = 10, pageNum = 1, status = '', name = '', fuzeDepart = ''} = config.params;

        const where = `
            where name like '%${name}%'
                and fuzeDepart like '%${fuzeDepart}%'
                and status like '%${status}%'
        `;

        const list = await executeSql(
            `
            select *
            from indexTable ${where}
            order by updatedAt desc
            limit ? offset ?`,
            [pageSize, (pageNum - 1) * pageSize],
        );
        console.log(list, 'list');
        const countResult = await executeSql(`
            select count(*)
            from indexTable ${where}
        `);

        const total = countResult[0]['count(*)'] || 0;

        return [
            200,
            {
                totalElements: total,
                content: list,
            },
        ];
    },
    // // 获取详情
    // 'get user/getUserById': async (config) => {
    //     const { id } = config.params;

    //     const result = await executeSql('select * from users where id = ?', [id]);

    //     if (!result[0]) return [200, null];

    //     const userRoles = await executeSql('select * from user_roles where userId = ?', [id]);
    //     result[0].roleIds = userRoles.map((item) => item.roleId);

    //     return [200, result[0]];
    // },
    // 保存用户
    'post /indexTable/save': async (config) => {
        const {
            status,
            name,
            sourceDepart,
            sourceKeshi,
            fuzeDepart,
            fuzeren,
            phone,
            meaning,
            tongjifangshi,
            tongjizhouqi,
            month,
            week,
            day,
            isShore,
            shujuduijiejiekou,
            zhibiaozhidanwei,
            region,
            zidingyiweidufenzu,
            zhibiaojisuanluoji,
            zhibiaopeizhixiang,
            yujingyuzhi,
        } = JSON.parse(config.data);
        const args = [
            status||null,
            name||null,
            sourceDepart||null,
            sourceKeshi||null,
            fuzeDepart||null,
            fuzeren||null,
            phone||null,
            meaning||null,
            tongjifangshi||null,
            tongjizhouqi||null,
            month||null,
            week||null,
            day||null,
            isShore||null,
            shujuduijiejiekou||null,
            zhibiaozhidanwei||null,
            region||null,
            zidingyiweidufenzu||null,
            zhibiaojisuanluoji||null,
            zhibiaopeizhixiang||null,
            yujingyuzhi||null,
        ];
        const result = await executeSql(
            'INSERT INTO indexTable (status,name,sourceDepart,sourceKeshi,fuzeDepart,fuzeren,phone,meaning,tongjifangshi,tongjizhouqi,month,week,day,isShore,shujuduijiejiekou,zhibiaozhidanwei,region,zidingyiweidufenzu,zhibiaojisuanluoji,zhibiaopeizhixiang,yujingyuzhi) VALUES (?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?)',
            args,
            true,
        );
        return [200, 'success'];
    },
    // 修改
    'post /indexTable/update': async (config) => {
        const {
            id,
            name,
            sourceDepart,
            sourceKeshi,
            fuzeDepart,
            fuzeren,
            phone,
            meaning,
            tongjifangshi,
            tongjizhouqi,
            month,
            week,
            day,
            isShore,
            shujuduijiejiekou,
            zhibiaozhidanwei,
            region,
            zidingyiweidufenzu,
            zhibiaojisuanluoji,
            zhibiaopeizhixiang,
            yujingyuzhi,
        } = JSON.parse(config.data);
        const args = [
            name||null,
            sourceDepart||null,
            sourceKeshi||null,
            fuzeDepart||null,
            fuzeren||null,
            phone||null,
            meaning||null,
            tongjifangshi||null,
            tongjizhouqi||null,
            month||null,
            week||null,
            day||null,
            isShore||null,
            shujuduijiejiekou||null,
            zhibiaozhidanwei||null,
            region||null,
            zidingyiweidufenzu||null,
            zhibiaojisuanluoji||null,
            zhibiaopeizhixiang||null,
            yujingyuzhi||null,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            id,
        ];

        await executeSql(
            'UPDATE indexTable SET name=?,sourceDepart=?,sourceKeshi=?,fuzeDepart=?,fuzeren=?,phone=?,meaning=?,tongjifangshi=?,tongjizhouqi=?,month=?,week=?,day=?,isShore=?,shujuduijiejiekou=?,zhibiaozhidanwei=?,region=?,zidingyiweidufenzu=?,zhibiaojisuanluoji=?,zhibiaopeizhixiang=?,yujingyuzhi=? , updatedAt=? WHERE id=?',
            args,
        );

        return [200, true];
    },
    // 删除
    'delete re:/indexTable/.+': async (config) => {
        console.log(config, 'config');
        const id = config.url.split('/')[2];
        await executeSql('DELETE FROM indexTable WHERE id=?', [id]);
        return [200, true];
    },
};
