/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-03-06 15:00:30
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-03-06 15:57:23
 * @FilePath: \ahooks\src\pages\subjectManage\mySubject\ConfigModal.jsx
 * @Description:
 */
import {useCallback, useState, useEffect, useMemo} from 'react';
import { Button} from 'antd';
import {ModalContent, Table, Pagination, Operator} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
export default config({
    modal: {
        title: (props) => {
            return '添加指标';
        },
        width: '80%',
        top: 30,
    },
})(function Edit(props) {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const {record, isEdit, onOk, onCancel} = props;
    const [visible, setVisible] = useState(false);
    // 表格多选
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleSelectedRowKeysChange = useCallback((selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    }, []);
    const params = useMemo(() => {
        return {
            pageNum,
            pageSize,
        };
    }, [ pageNum, pageSize]);
    // 获取列表
    const {data: {dataSource, total} = {}} = props.ajax.useGet('/indexTable/queryListByPage', params, [params], {
        setLoading,
        formatResult: (res) => {
            return {
                dataSource: res?.content || [],
                total: res?.totalElements || 0,
            };
        },
    });
    const columns = [
        {title: '指标名称', dataIndex: 'name'},
        {title: '指标状态', dataIndex: 'status'},
        {title: '指标来源部门', dataIndex: 'sourceDepart'},
        {title: '指标来源科室', dataIndex: 'sourceKeshi'},
        {title: '指标负责部门', dataIndex: 'fuzeDepart'},
        {title: '指标负责人', dataIndex: 'fuzeren'},
        {title: '负责人联系方式', dataIndex: 'phone'},
        {title: '指标含义', dataIndex: 'meaning'},
        {title: '统计周期', dataIndex: 'tongjizhouqi'},
        {title: '更新时间', dataIndex: 'updatedAt'},
    ];
    return (
        <ModalContent
            loading={loading}
            okText="保存"
            okHtmlType="submit"
            cancelText="取消"
            onOk={onCancel}
            onCancel={onCancel}
        >
            <Table
                pageNum={pageNum}
                pageSize={pageSize}
                dataSource={dataSource}
                columns={columns}
                rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: handleSelectedRowKeysChange,
                }}
                rowKey="id"
            />
            <Pagination
                total={total}
                pageNum={pageNum}
                pageSize={pageSize}
                onPageNumChange={setPageNum}
                onPageSizeChange={(pageSize) => setPageNum(1) || setPageSize(pageSize)}
            />
        </ModalContent>
    );
});
