/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-03-06 10:06:58
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-03-06 17:48:32
 * @FilePath: \陪标demo\ahooks\src\pages\indexManage\myIndex\viewDetails.jsx
 * @Description:
 */
import {useState, useMemo, useCallback} from 'react';
import {Button, Form, Space} from 'antd';
import {PageContent} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';

import s from './style.less';
export default config({
    path: '/indexManage/myIndex/viewDetails',
})(function User(props) {
    const [loading, setLoading] = useState(false);
    const [infoArr, setInfoArr] = useState([
        {
            title: '基本信息',
            items: [
                {
                    lable: '指标名称',
                    text: '通知缴税时间',
                },
                {
                    lable: '指标来源部门',
                    text: '无锡市发改委',
                },
                {
                    lable: '指标来源科室',
                    text: '无锡市发改委',
                },
                {
                    lable: '指标负责部门',
                    text: '无锡市发改委',
                },
                {
                    lable: '指标负责人',
                    text: '张三',
                },
                {
                    lable: '负责人联系方式',
                    text: '15211165932',
                },
                {
                    lable: '指标含义',
                    text: '-',
                },
                {
                    lable: '统计周期',
                    text: '日',
                },
                {
                    lable: '更新时间',
                    text: '2023-3-6',
                },
                {
                    lable: '是否共享',
                    text: '是',
                },
                {
                    lable: '指标状态',
                    text: '待开发',
                },
                {
                    lable: '上级指标名称',
                    text: '-',
                },
            ],
        },
        {
            title: '配置信息',
            items: [
                {
                    lable: '数据来源系统',
                    text: '街道大脑',
                },
                {
                    lable: '指标样例值',
                    text: '65',
                },
                {
                    lable: '指标自定义标签',
                    text: '-',
                },
                {
                    lable: '数据对接方式',
                    text: '-',
                },
                {
                    lable: '数据对接接口',
                    text: '-',
                },
                {
                    lable: '指标值单位',
                    text: '日',
                },
                {
                    lable: '地区维度',
                    text: '无锡市',
                },
                {
                    lable: '自定义维度分组',
                    text: '-',
                },
                {
                    lable: '指标计算逻辑',
                    text: '-',
                },
                {
                    lable: '计算项配置',
                    text: '同比、环比、同比增长、环比增长',
                },
                {
                    lable: '预警阈值',
                    text: '200',
                },
                {
                    lable: '数据对外服务API',
                    text: '-',
                },
                {
                    lable: '备注',
                    text: '-',
                },
            ],
        },
        {
            title: '可视化配置',
            items: [
                {
                    lable: '趋势图',
                    text: '-',
                },
                {
                    lable: '排名图',
                    text: '-',
                },
                {
                    lable: '时间范围',
                    text: '-',
                },
                {
                    lable: 'TOP N',
                    text: '-',
                },
                {
                    lable: '样式预览',
                    text: '-',
                },
            ],
        },
    ]);

    return (
        <PageContent className={s.myIndexViewDetails} loading={loading}>
            {infoArr.map((f, j) => {
                return (
                    <div className={s.modules}>
                        <div className={s.title}>
                            <i></i>
                            <span>{f.title}</span>
                        </div>
                        <div className={s.content}>
                            {f.items.map((e, i) => {
                                return (
                                    <div className={s.item} style={{width: e.width ? e.width : '23%'}}>
                                        <div className={s.label}>{e.lable}：</div>
                                        <div className={s.text}>{e.text}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </PageContent>
    );
});
