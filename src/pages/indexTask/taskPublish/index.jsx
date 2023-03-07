import { useState, useMemo, useCallback } from 'react';
import { Button, Form, Space } from 'antd';
import { PageContent, QueryBar, FormItem, Table, Pagination, Operator, ToolBar } from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
import EditModal from './EditModal';

export default config({
    path: '/indexTask/taskPublish',
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
    const { data: { dataSource, total } = {} } = props.ajax.useGet('/user/queryUsersByPage', params, [params], {
        setLoading,
        formatResult: (res) => {
            return {
                dataSource: res?.content || [],
                total: res?.totalElements || 0,
            };
        },
    });

    // 删除
    const { run: deleteRecord } = props.ajax.useDel('/user/:id', null, { setLoading, successTip: '删除成功！' });

    const columns = [
        { title: '任务名称', dataIndex: 'account', width: 100 },
        { title: '任务类型', dataIndex: 'account', width: 100 },
        { title: '任务状态', dataIndex: 'name', width: 100 },
        { title: '关联指标', dataIndex: 'email', width: 100 },
        { title: '负责部门', dataIndex: 'email', width: 100 },
        { title: '负责人', dataIndex: 'email', width: 100 },
        { title: '创建时间', dataIndex: 'email', width: 100 },
        { title: '截止时间', dataIndex: 'email', width: 100 },
        {
            title: '操作',
            key: 'operator',
            width: 150,
            render: (value, record) => {
                const { id, name } = record;
                const items = [
                    {
                        label: '查看',
                        onClick: () => setRecord({ ...record, isDetail: true }) || setVisible(true),
                    },
                    {
                        label: '编辑',
                        onClick: () => setRecord(record) || setVisible(true),
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定删除「${name}」吗？`,
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
        style: { width: 200 },
    };
    const queryItemDaye = {
        style: { width: 300 },
    };

    return (
        <PageContent loading={loading}>
            <QueryBar>
                <Form
                    name="user"
                    layout="inline"
                    form={form}
                    initialValues={{ position: '01' }}
                    onFinish={(values) => setPageNum(1) || setConditions(values)}
                >
                    <FormItem {...queryItem} label="编号" name="account" />
                   

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
                    新建任务
                </Button>
            </ToolBar>
            <Table
                serialNumber
                pageNum={pageNum}
                pageSize={pageSize}
                fitHeight
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
            />
            <Pagination
                total={total}
                pageNum={pageNum}
                pageSize={pageSize}
                onPageNumChange={setPageNum}
                onPageSizeChange={(pageSize) => setPageNum(1) || setPageSize(pageSize)}
            />
            <EditModal
                visible={visible}
                record={record}
                isEdit={!!record}
                onOk={() => setVisible(false) || refreshSearch()}
                onCancel={() => setVisible(false)}
            />
        </PageContent>
    );
});
