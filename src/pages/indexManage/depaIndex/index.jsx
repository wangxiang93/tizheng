import {useState, useMemo, useCallback} from 'react';
import {Button, Form, Space} from 'antd';
import {PageContent, QueryBar, FormItem, Table, Pagination, Operator, ToolBar} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';
import EditModal from './EditModal';
import {Router} from 'react-router-dom';
export default config({
    path: '/indexManage/depaIndex',
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
    const {data: {dataSource, total} = {}} = props.ajax.useGet('/indexTable/queryListByPage', params, [params], {
        setLoading,
        formatResult: (res) => {
            return {
                dataSource: res?.content || [],
                total: res?.totalElements || 0,
            };
        },
    });

    // 删除
    const {run: deleteRecord} = props.ajax.useDel('/indexTable/:id', null, {setLoading, successTip: '删除成功！'});

    function toLink(params) {
        // console.log(params, 'params', Router);
        console.log(props, 'props');
        props.history.push({pathname: '/indexManage/myIndex/viewDetails', state: {abc: 45}});
    }
    const columns = [
        {title: '指标名称', dataIndex: 'name'},
        {title: '指标状态', dataIndex: 'status'},
        // { title: '关联专题', dataIndex: 'mobile' },
        {title: '指标来源部门', dataIndex: 'sourceDepart'},
        {title: '指标来源科室', dataIndex: 'sourceKeshi'},
        {title: '指标负责部门', dataIndex: 'fuzeDepart'},
        {title: '指标负责人', dataIndex: 'fuzeren'},
        {title: '负责人联系方式', dataIndex: 'phone'},
        {title: '指标含义', dataIndex: 'meaning'},
        {title: '统计周期', dataIndex: 'tongjizhouqi'},
        {title: '更新时间', dataIndex: 'updatedAt'},
        {
            title: '操作',
            key: 'operator',
            width: 150,
            render: (value, record) => {
                const {id, name} = record;
                const items = [
                    {
                        label: '查看',
                        onClick: () => toLink(record),
                        // onClick: () => setRecord({ ...record, isDetail: true }) || setVisible(true),
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
        style: {width: 200},
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
                    name="indexTable"
                    layout="inline"
                    form={form}
                    initialValues={{position: '01'}}
                    onFinish={(values) => setPageNum(1) || setConditions(values)}
                >
                    <FormItem {...queryItem} label="指标名称" name="name" />
                    <FormItem {...queryItem} label="负责部门" name="fuzeDepart" />
                    <FormItem {...queryItem} label="指标状态" name="status" />

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
                    新增指标
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
