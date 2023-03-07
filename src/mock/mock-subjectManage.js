import moment from 'moment';
import executeSql, {initDB} from 'src/mock/web-sql';

export default {
    // 获取列表
    'get /subjectManage/queryListByPage': async (config) => {
        const {pageSize = 10, pageNum = 1, fuzeren = '', zhuantimingcheng = '', zhuantifuzebumen = ''} = config.params;

        const where = `
            where zhuantimingcheng like '%${zhuantimingcheng}%'
                and zhuantifuzebumen like '%${zhuantifuzebumen}%'
                and fuzeren like '%${fuzeren}%'
        `;

        const list = await executeSql(
            `
            select *
            from subjectManage ${where}
            order by updatedAt desc
            limit ? offset ?`,
            [pageSize, (pageNum - 1) * pageSize],
        );

        const countResult = await executeSql(`
            select count(*)
            from subjectManage ${where}
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
    'post /subjectManage/save': async (config) => {
        const {
            zhuantimingcheng,
            zhuantifuzebumen,
            fuzeren,
            xiangguanbumen,
            zhengcelianjie,
            zhuantimiaoshu,
            fuzerenlianxifangshi,
        } = JSON.parse(config.data);
        const args = [
            zhuantimingcheng,
            zhuantifuzebumen,
            fuzeren,
            xiangguanbumen,
            zhengcelianjie,
            zhuantimiaoshu,
            fuzerenlianxifangshi,
        ];
        const result = await executeSql(
            'INSERT INTO subjectManage (zhuantimingcheng, zhuantifuzebumen, fuzeren, xiangguanbumen,zhengcelianjie,zhuantimiaoshu,fuzerenlianxifangshi) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args,
            true,
        );
        return [200, 'success'];
    },
    // 修改
    'post /subjectManage/update': async (config) => {
        const {
            zhengcelianjie,
            zhuantimiaoshu,
            fuzerenlianxifangshi,
            id,
            zhuantimingcheng,
            zhuantifuzebumen,
            fuzeren,
            xiangguanbumen,
        } = JSON.parse(config.data);
        const args = [
            zhengcelianjie,
            zhuantimiaoshu,
            fuzerenlianxifangshi,
            zhuantimingcheng,
            zhuantifuzebumen,
            fuzeren,
            xiangguanbumen,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            id,
        ];

        await executeSql(
            'UPDATE subjectManage SET zhengcelianjie=?,zhuantimiaoshu=?,fuzerenlianxifangshi=?,zhuantimingcheng=?, zhuantifuzebumen=?, fuzeren=?, xiangguanbumen=?, updatedAt=? WHERE id=?',
            args,
        );

        return [200, true];
    },
    // 删除
    'delete re:/subjectManage/.+': async (config) => {
        console.log(config, 'config');
        const id = config.url.split('/')[2];
        await executeSql('DELETE FROM subjectManage WHERE id=?', [id]);
        return [200, true];
    },
};
