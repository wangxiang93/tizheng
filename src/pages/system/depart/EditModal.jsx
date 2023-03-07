import {useCallback, useMemo, useState} from 'react';
import {Form, Row, Col, Card, Button} from 'antd';
import {ModalContent, FormItem, Content, validateRules, useDebounceValidator} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';

export default config({
    modal: {
        title: (props) => {
            if (props?.record?.isDetail) return '查看部门';

            return props.isEdit ? '编辑部门' : '新增部门';
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
    // props.ajax.useGet('/user/getUserById', params, [params], {
    //     mountFire: isEdit,
    //     setLoading,
    //     formatResult: (res) => {
    //         if (!res) return;
    //         form.setFieldsValue(res);
    //     },
    // });
    const {run: save} = props.ajax.usePost('/depart/save', null, {setLoading, successTip: '创建成功！'});
    const {run: update} = props.ajax.usePost('/depart/update', null, {setLoading, successTip: '修改成功！'});
    const {run: fetchUserByAccount} = props.ajax.useGet('/user/getOneUser');

    const handleSubmit = useCallback(
        async (values) => {
            const params = {
                ...values,
            };
            console.log(values, 'values');
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
                            label="部门名称"
                            name="bumengmingcheng"
                            required
                            noSpace
                            // rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem {...layout} label="部门编号" name="bumengbianhao" required noSpace />
                    </Col>
                    <Col span={24}>
                        <FormItem {...layout} label="父级部门" name="parentid" noSpace />
                    </Col>
                    <Col span={24}>
                        <FormItem {...layout} label="备注" name="beizhu" noSpace />
                    </Col>
                </Row>
            </ModalContent>
        </Form>
    );
});
