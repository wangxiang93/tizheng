import {useCallback, useMemo, useState, useEffect} from 'react';
import {Form, Row, Col, Card, Button} from 'antd';
import {ModalContent, FormItem, Content, validateRules, useDebounceValidator} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';

export default config({
    modal: {
        title: (props) => {
            if (props?.record?.isDetail) return '查看专题';
            return props.isEdit ? '编辑专题' : '新增专题';
        },
        width: '40%',
        top: 100,
    },
})(function Edit(props) {
    const {record, isEdit, onOk, onCancel} = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const isDetail = record?.isDetail;

    const params = useMemo(() => {
        return {id: record?.id};
    }, [record]);

    // 编辑时，回显详情数据
    form.setFieldsValue(record);
    // 获取部门下拉

    let {run: getDepartList} = props.ajax.useGet('/depart/queryListByPage');
    const [departOptions, setDepartOptions] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getDepartList();
            setDepartOptions(() => res.content || []);
        })();
    }, [getDepartList]);
    const {run: save} = props.ajax.usePost('/subjectManage/save', null, {setLoading, successTip: '创建成功！'});
    const {run: update} = props.ajax.usePost('/subjectManage/update', null, {setLoading, successTip: '修改成功！'});

    const handleSubmit = useCallback(
        async (values) => {
            const params = {
                ...values,
            };
            if (isEdit) {
                await update(params);
            } else {
                await save(params);
            }

            onOk();
        },
        [isEdit, update, save, onOk],
    );

    const disabled = isDetail;
    const layout = {
        labelCol: {flex: '140px'},
        disabled,
    };
    const colLayout = {
        xs: {span: 12},
        sm: {span: 12},
    };
    return (
        <Form form={form} name="roleEdit" onFinish={handleSubmit} initialValues={{}}>
            <ModalContent
                width={300}
                loading={loading}
                okText="保存"
                okHtmlType="submit"
                cancelText="取消"
                onCancel={() => onCancel()}
                footer={disabled ? <Button onClick={onCancel}>关闭</Button> : undefined}
            >
                {isEdit ? <FormItem hidden name="id" /> : null}
                <Row gutter={24}>
                    <Col span={24}>
                        <FormItem
                            {...layout}
                            label="专题名称"
                            name="zhuantimingcheng"
                            required
                            noSpace
                            // rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem
                            {...layout}
                            type="select-tree"
                            label="专题负责部门"
                            name="zhuantifuzebumen"
                            required
                            noSpace
                            fieldKey="id"
                            fieldNames={{label: 'bumengmingcheng', value: 'bumengmingcheng', children: 'children'}}
                            treeData={departOptions}
                        />
                    </Col>{' '}
                    <Col span={24}>
                        <FormItem {...layout} label="负责人" required name="fuzeren" noSpace />{' '}
                    </Col>
                    <Col span={24}>
                        <FormItem {...layout} label="负责人联系方式" required name="fuzerenlianxifangshi" noSpace />{' '}
                    </Col>
                    <Col span={24}>
                        <FormItem
                            {...layout}
                            type="select-tree"
                            label="相关部门"
                            required
                            name="xiangguanbumen"
                            noSpace
                            fieldKey="id"
                            fieldNames={{label: 'bumengmingcheng', value: 'bumengmingcheng', children: 'children'}}
                            treeData={departOptions}
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem type='textarea' {...layout} label="政策链接" required name="zhengcelianjie" noSpace />{' '}
                    </Col>
                    <Col span={24}>
                        <FormItem type='textarea' {...layout} label="政策描述" required name="zhuantimiaoshu" noSpace />{' '}
                    </Col>
                    
                </Row>
            </ModalContent>
        </Form>
    );
});
