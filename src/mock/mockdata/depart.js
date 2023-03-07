/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-02-20 17:45:02
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-02-20 19:32:28
 * @FilePath: \tizheng_react\src\mock\mockdata\subjectManage.js
 * @Description: 部门mock数据
 */
import Mock from 'mockjs';

const random = Mock.Random;
const subjectManage = [
    {
        id: '1',
        zhuantimingcheng: '营商环境',
        zhuantifuzebumen: '无锡市城运中心',
        fuzeren: '城运中心',
        xiangguanbumen: '无锡市发展和改革委员会',
        zhuantizhibiaoshu: 68,
    },
];

export function getSubjectManageByPageSize(pageSize) {
    const subjectManage = [];
    for (let i = 0; i < pageSize; i++) {
        subjectManage.push(
            Mock.mock({
                id: random.guid(),
                zhuantimingcheng: random.Text(),
                'zhuantifuzebumen|1': ['无锡市城运中心', '无锡市大数据局', '发改委', '交通局'],
                fuzeren: random.cname(),
                'xiangguanbumen|1': ['无锡市城运中心', '无锡市大数据局', '发改委', '交通局'],
                zhuantizhibiaoshu: Random.natural(0, 100),
            }),
        );
    }
    return subjectManage;
}

export {subjectManage};
