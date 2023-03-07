import {useCallback, useMemo, useState, useEffect} from 'react';
import {Form, Row, Col, Card, Button} from 'antd';
import {ModalContent, FormItem, Content, validateRules, useDebounceValidator} from '@ra-lib/admin';
import config from 'src/commons/config-hoc';

export default config({
    modal: {
        title: (props) => {
            if (props?.record?.isDetail) return '查看指标';
            return props.isEdit ? '编辑指标' : '新增指标';
        },
        width: '75%',
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
    const [isShiShi, setIsShiShi] = useState(false);
    let R = {...record, region: record?.region.split(',') || record?.region};

    // 编辑时，回显详情数据
    form.setFieldsValue(R);
    // 获取部门下拉
    let {run: getDepartList} = props.ajax.useGet('/depart/queryListByPage');
    const [departOptions, setDepartOptions] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getDepartList();
            setDepartOptions(() => res.content || []);
            handlerTimeOptions();
            if (R.tongjifangshi) {
                tongjifangshiChange({target: {value: R.tongjifangshi}});
            }
        })();
    }, [getDepartList]);
    const {run: save} = props.ajax.usePost('/indexTable/save', null, {setLoading, successTip: '创建成功！'});
    const {run: update} = props.ajax.usePost('/indexTable/update', null, {setLoading, successTip: '修改成功！'});

    const handleSubmit = useCallback(
        async (values) => {
            const params = {
                ...values,
            };
            if (isEdit) {
                console.log(params, 'params');
                await update(params);
            } else {
                let q = {...params, status: '待配置', region: params.region.join()};
                console.log(q, 'q');
                await save(q);
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

    function tongjifangshiChange({target}) {
        if (target.value === '实时') {
            setIsShiShi(false);
        } else {
            setIsShiShi(true);
        }
    }
    const [dayOptions, setDayOptions] = useState([]);
    const [monthOptions, setMonthOptions] = useState([]);
    function handlerTimeOptions(params) {
        let arr = [];
        let arr2 = [];
        for (let i = 1; i < 29; i++) {
            if (i < 13) {
                arr2.push({label: '第' + i + '月', value: '第' + i + '月'});
            }
            arr.push({label: '第' + i + '日', value: '第' + i + '日'});
        }
        setDayOptions(arr);
        setMonthOptions(arr2);
    }
    return (
        <Form form={form} name="roleEdit" onFinish={handleSubmit}>
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
                    <Col span={11}>
                        <FormItem {...layout} label="指标名称" name="name" required noSpace />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            type="select-tree"
                            label="指标来源部门"
                            name="sourceDepart"
                            required
                            noSpace
                            fieldKey="id"
                            fieldNames={{label: 'bumengmingcheng', value: 'bumengmingcheng', children: 'children'}}
                            treeData={departOptions}
                        />
                    </Col>{' '}
                    <Col span={11}>
                        <FormItem {...layout} label="指标来源科室" name="sourceKeshi" required noSpace />
                    </Col>{' '}
                    <Col span={11}>
                        <FormItem
                            {...layout}
                            type="select-tree"
                            label="指标负责部门"
                            name="fuzeDepart"
                            required
                            noSpace
                            fieldKey="id"
                            fieldNames={{label: 'bumengmingcheng', value: 'bumengmingcheng', children: 'children'}}
                            treeData={departOptions}
                        />
                    </Col>{' '}
                    <Col span={11}>
                        <FormItem {...layout} label="指标负责人" required name="fuzeren" noSpace />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem {...layout} label="负责人联系方式" required name="phone" noSpace />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem
                            type="radio-group"
                            {...layout}
                            label="统计方式"
                            required
                            name="tongjifangshi"
                            onChange={tongjifangshiChange}
                            options={[
                                {label: '实时', value: '实时'},
                                {label: '周期', value: '周期'},
                            ]}
                        />{' '}
                    </Col>
                    {isShiShi ? (
                        <>
                            <Col span={11}>
                                <FormItem
                                    type="radio-group"
                                    {...layout}
                                    label="统计周期"
                                    required
                                    name="tongjizhouqi"
                                    options={[
                                        {label: '年度', value: '年度'},
                                        {label: '半年度', value: '半年度'},
                                        {label: '季度', value: '季度'},
                                        {label: '月度', value: '月度'},
                                        {label: '周', value: '周'},
                                        {label: '日', value: '日'},
                                    ]}
                                />
                            </Col>
                            <Col span={11}>
                                <FormItem
                                    type="select"
                                    {...layout}
                                    label="每年度第几个月"
                                    required
                                    name="month"
                                    options={monthOptions}
                                />
                            </Col>
                            <Col span={11}>
                                <FormItem
                                    type="select"
                                    {...layout}
                                    label="第几日"
                                    required
                                    name="day"
                                    options={dayOptions}
                                />{' '}
                            </Col>
                        </>
                    ) : null}
                    <Col span={11}>
                        <FormItem
                            type="radio-group"
                            {...layout}
                            label="是否分享"
                            required
                            name="isShore"
                            options={[
                                {label: '是', value: '是'},
                                {label: '否', value: '否'},
                            ]}
                        />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem {...layout} label="数据对接接口" name="shujuduijiejiekou" noSpace />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            type="select"
                            {...layout}
                            label="指标值单位"
                            required
                            name="zhibiaozhidanwei"
                            options={[
                                {label: '个', value: '个'},
                                {label: '十', value: '十'},
                                {label: '百', value: '百'},
                                {label: '千', value: '千'},
                                {label: '万', value: '万'},
                            ]}
                        />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem
                            type="select"
                            {...layout}
                            mode="multiple"
                            label="地区维度"
                            required
                            name="region"
                            options={[
                                {label: '无锡市', value: '无锡市'},
                                {label: '锡山区', value: '锡山区'},
                                {label: '惠山区', value: '惠山区'},
                                {label: '滨湖区', value: '滨湖区'},
                                {label: '梁溪区', value: '梁溪区'},
                                {label: '新吴区', value: '新吴区'},
                            ]}
                        />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem {...layout} label="自定义维度" name="zidingyiweidufenzu" required noSpace />
                    </Col>
                    <Col span={11}>
                        <FormItem
                            type="checkbox-group"
                            {...layout}
                            label="指标配置项"
                            name="zhibiaopeizhixiang"
                            options={[
                                {label: '同比', value: '同比'},
                                {label: '环比', value: '环比'},
                                {label: '同比增长', value: '同比增长'},
                                {label: '环比增长', value: '环比增长'},
                            ]}
                        />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem {...layout} label="预警阈值" name="yujingyuzhi" required noSpace />
                    </Col>
                    <Col span={11}>
                        <FormItem type="textarea" {...layout} label="指标含义" name="meaning" />{' '}
                    </Col>
                    <Col span={11}>
                        <FormItem type="textarea" {...layout} label="指标计算逻辑" name="zhibiaojisuanluoji" />{' '}
                    </Col>
                </Row>
            </ModalContent>
        </Form>
    );
});
