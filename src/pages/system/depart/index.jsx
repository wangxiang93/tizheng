/*
 * @Author: dengliangbin 410411236@qq.com
 * @Date: 2023-02-20 16:40:10
 * @LastEditors: dengliangbin 410411236@qq.com
 * @LastEditTime: 2023-02-21 17:09:10
 * @FilePath: \tizheng_react\src\pages\system\depart\index.jsx
 * @Description: 部门管理
 */
import {useState, useMemo, useCallback, useEffect} from 'react';
import {Button, Form, Space} from 'antd';
import {PageContent, QueryBar, FormItem, Table, Pagination, Operator, ToolBar} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
import options from 'src/options';
import EditModal from './EditModal';

export default config({
    path: '/system/depart',
})(function User(props) {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [conditions, setConditions] = useState({});
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);
    const [form] = Form.useForm();

    const params = useMemo(() => {
        return {
            ...conditions,
            pageNum,
            pageSize,
        };
    }, [conditions, pageNum, pageSize]);

    // 使用现有查询条件，重新发起请求
    const refreshSearch = useCallback(() => {
        setConditions(form.getFieldsValue());
    }, [form]);

    // 获取列表
    const {data: {dataSource, total} = {}} = props.ajax.useGet('/depart/queryListByPage', params, [params], {
        setLoading,
        formatResult: (res) => {
            return {
                dataSource: res?.content || [],
                total: res?.totalElements || 0,
            };
        },
    });

    // 删除
    const {run: deleteRecord} = props.ajax.useDel('/depart/:id', null, {setLoading, successTip: '删除成功！'});

    const columns = [
        {title: '部门名称', dataIndex: 'bumengmingcheng'},
        {title: '部门编号', dataIndex: 'bumengbianhao'},
        {title: '备注', dataIndex: 'beizhu'},
        {title: '父级部门', dataIndex: 'parentName'},
        {
            title: '操作',
            key: 'operator',
            width: 200,
            render: (value, record) => {
                const {id, zhuantimingcheng} = record;
                const items = [
                    {
                        label: '查看',
                        onClick: () => setRecord({...record, isDetail: true}) || setVisible(true),
                    },
                    {
                        label: '修改',
                        onClick: () => setRecord(record) || setVisible(true),
                    },
                    {
                        label: '配置',
                        onClick: () => setRecord(record) || setVisible(true),
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定删除「${zhuantimingcheng}」吗？`,
                            onConfirm: () => handleDelete(id),
                        },
                    },
                ];

                return <Operator items={items} />;
            },
        },
    ];

    const handleDelete = useCallback(
        async (id) => {
            await deleteRecord(id);
            // 触发列表更新
            refreshSearch();
        },
        [deleteRecord, refreshSearch],
    );

    const queryItem = {
        style: {width: 300},
    };
    const queryItemDaye = {
        style: {width: 300},
    };
    // 表格多选
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleSelectedRowKeysChange = useCallback((selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    }, []);

    return (
        <PageContent loading={loading}>
            <QueryBar>
                <Form
                    name="user"
                    layout="inline"
                    form={form}
                    initialValues={{position: '01'}}
                    onFinish={(values) => setPageNum(1) || setConditions(values)}
                >
                    <FormItem {...queryItem} label="部门名称" name="bumengmingcheng" />
                    <FormItem {...queryItem} label="部门编号" name="bumengbianhao" />

                    <FormItem>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button onClick={() => form.resetFields()}>重置</Button>
                        </Space>
                    </FormItem>
                </Form>
            </QueryBar>
            <ToolBar>
                <Button type="primary" onClick={() => setRecord(null) || setVisible(true)}>
                    新增部门
                </Button>
                <Button danger onClick={() => setRecord(null) || setVisible(true)}>
                    批量删除
                </Button>
            </ToolBar>
            <Table
                pageNum={pageNum}
                pageSize={pageSize}
                fitHeight
                dataSource={dataSource}
                columns={columns}
                rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: handleSelectedRowKeysChange,
                }}
                rowKey="id"
            />
            {/* <Pagination
                total={total}
                pageNum={pageNum}
                pageSize={pageSize}
                onPageNumChange={setPageNum}
                onPageSizeChange={(pageSize) => setPageNum(1) || setPageSize(pageSize)}
            /> */}
            <EditModal
                visible={visible}
                record={record}
                isEdit={!!record}
                onOk={() => {
                    setVisible(false);
                    refreshSearch();
                }}
                onCancel={() => setVisible(false)}
            />
        </PageContent>
    );
});
