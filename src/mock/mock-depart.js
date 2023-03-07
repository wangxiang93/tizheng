import moment from 'moment';
import executeSql, {initDB} from 'src/mock/web-sql';
import {arraytotree} from 'src/commons/utils.js';
export default {
    // 获取列表
    'get /depart/queryListByPage': async (config) => {
        const {pageSize = 10, pageNum = 1, bumengmingcheng = '', bumengbianhao = ''} = config.params;

        const where = `
            where bumengmingcheng like '%${bumengmingcheng}%'
                and bumengbianhao like '%${bumengbianhao}%'
        `;

        const list = await executeSql(
            `
            select *
            from depart ${where}
            order by updatedAt desc
            limit ? offset ?`,
            [10000, (pageNum - 1) * 10000],
            // [pageSize, (pageNum - 1) * pageSize],
        );

        const countResult = await executeSql(`
            select count(*)
            from depart ${where}
        `);

        const total = countResult[0]['count(*)'] || 0;
        let treeData = await arraytotree(list);
        return [
            200,
            {
                totalElements: total,
                content: treeData,
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
    'post /depart/save': async (config) => {
        const {bumengmingcheng, bumengbianhao, beizhu, parentid, parentName} = JSON.parse(config.data);
        const args = [bumengmingcheng, bumengbianhao, beizhu, parentid, parentName];
        const result = await executeSql(
            'INSERT INTO depart (bumengmingcheng, bumengbianhao, beizhu, parentid, parentName) VALUES (?, ?, ?, ?, ?)',
            args,
            true,
        );
        return [200, 'success'];
    },
    // 修改
    'post /depart/update': async (config) => {
        const {id, bumengmingcheng, bumengbianhao, beizhu, parentid, parentName} = JSON.parse(config.data);
        const args = [
            bumengmingcheng,
            bumengbianhao,
            beizhu,
            parentid,
            parentName,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            id,
        ];

        await executeSql(
            'UPDATE depart SET bumengmingcheng=?, bumengbianhao=?, beizhu=?, parentid=?,parentName=?, updatedAt=? WHERE id=?',
            args,
        );

        return [200, true];
    },
    // 删除
    'delete re:/depart/.+': async (config) => {
        console.log(config, 'config');
        const id = config.url.split('/')[2];
        await executeSql('DELETE FROM depart WHERE id=?', [id]);
        return [200, true];
    },
};
