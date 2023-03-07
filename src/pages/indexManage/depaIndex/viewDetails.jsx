/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-03-06 10:06:58
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-03-06 17:03:20
 * @FilePath: \陪标demo\ahooks\src\pages\indexManage\myIndex\viewDetails.jsx
 * @Description:
 */
import {useState, useMemo, useCallback} from 'react';
import {Button, Form, Space} from 'antd';
import {PageContent, QueryBar, FormItem, Table, Pagination, Operator, ToolBar} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
import options from 'src/options';
import EditModal from './EditModal';
import s from './style.less';
export default config({
    path: '/indexManage/EditModal',
})(function User(props) {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [conditions, setConditions] = useState({});
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);
    const [form] = Form.useForm();

    return (
        <PageContent className={s.myIndexViewDetails} loading={loading}>
            <div className={s.title}>
                <i></i>
                <span>基本信息</span>
            </div>
            <div className={s.content}>
                <div className={s.item}>
                    <div className={s.label}></div>
                    <div className={s.text}></div>
                </div>
            </div>
        </PageContent>
    );
});