import { useCallback, useMemo, useState } from 'react';
import { Form, Row, Col, Card, Button } from 'antd';
import { ModalContent, FormItem, Content, validateRules, useDebounceValidator } from '@ra-lib/admin';
import config from 'src/commons/config-hoc';

export default config({
    modal: {
        title: (props) => {
            if (props?.record?.isDetail) return '查看告警';

            return props.isEdit ? '编辑告警' : '新增告警';
        },
        width: '70%',
        top: 50,
    },
})(function Edit(props) {
    const { record, isEdit, onOk, onCancel } = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const isDetail = record?.isDetail;

    const params = useMemo(() => {
        return { id: record?.id };
    }, [record]);

    // 编辑时，查询详情数据
    props.ajax.useGet('/user/getUserById', params, [params], {
        mountFire: isEdit,
        setLoading,
        formatResult: (res) => {
            if (!res) return;
            form.setFieldsValue(res);
        },
    });
    const { run: save } = props.ajax.usePost('/user/addUser', null, { setLoading, successTip: '创建成功！' });
    const { run: update } = props.ajax.usePost('/user/updateUserById', null, { setLoading, successTip: '修改成功！' });
    const { run: fetchUserByAccount } = props.ajax.useGet('/user/getOneUser');

    const handleSubmit = useCallback(
        async (values) => {
            const roleIds = values.roleIds?.filter((id) => !`${id}`.startsWith('systemId'));
            const params = {
                ...values,
                roleIds,
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

    const checkAccount = useDebounceValidator(async (rule, value) => {
        if (!value) return;

        const user = await fetchUserByAccount({ account: value });
        if (!user) return;

        const id = form.getFieldValue('id');
        if (isEdit && user.id !== id && user.account === value) throw Error('账号不能重复！');
        if (!isEdit && user.account === value) throw Error('账号不能重复！');
    });

    const disabled = isDetail;
    const layout = {
        labelCol: { flex: '140px' },
        disabled,
    };
    const colLayout = {
        xs: { span: 24 },
        sm: { span: 12 },
    };
    return (
        <Form form={form} name="roleEdit" onFinish={handleSubmit} initialValues={{ enabled: true }}>
            <ModalContent
                loading={loading}
                okText="保存"
                okHtmlType="submit"
                cancelText="取消"
                onCancel={() => onCancel()}
                footer={disabled ? <Button onClick={onCancel}>关闭</Button> : undefined}
            >
                {isEdit ? <FormItem hidden name="id" /> : null}
                <Row gutter={24}>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="客户编码"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="客户名称"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="统一社会信用代码"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="手机号"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="证据有效期"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="行业"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>

                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="联系人"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="邮箱"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="关联业务员"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            label="客户类型"
                            name="account"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                    <Col span={22}>
                        <FormItem
                            {...layout}
                            label="地址"
                            name="account"
                            type="textarea"
                            required
                            noSpace
                            rules={[{ validator: checkAccount }]}
                        />
                    </Col>
                </Row>
            </ModalContent>
        </Form>
    );
});
