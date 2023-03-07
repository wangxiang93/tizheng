/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-03-06 10:32:30
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-03-06 10:35:12
 * @FilePath: \ahooks\src\pages\indexWarehouse\modelWarehouse\viewDetails.jsx
 * @Description: 
 */
import { useState, useMemo, useCallback } from 'react';
import { Button, Form, Space } from 'antd';
import { PageContent, QueryBar, FormItem, Table, Pagination, Operator, ToolBar } from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
import options from 'src/options';
import EditModal from './EditModal';

export default config({
    path: '/indexWarehouse/viewDetails',
})(function User(props) {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [conditions, setConditions] = useState({});
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);
    const [form] = Form.useForm();

    

    return (
        <PageContent loading={loading}>
            <h1>详情页</h1>
        </PageContent>
    );
});
