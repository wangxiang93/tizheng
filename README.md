```js
const FormItem = forwardRef<any, ItemProps>((props, ref) => {
    let {
        // 类型
        maxLength,
        minLength,
        type = 'input',
        children,
        noSpace,
        dateFormat,
        pattern,

        // Form.Item属性
        colon,
        dependencies,
        extra,
        getValueFromEvent,
        getValueProps,
        hasFeedback,
        help,
        hidden,
        htmlFor,
        initialValue,
        label,
        labelAlign,
        labelCol,
        messageVariables,
        name,
        normalize,
        noStyle,
        preserve,
        required,
        shouldUpdate,
        tooltip,
        trigger,
        validateFirst,
        validateStatus,
        validateTrigger,
        valuePropName,
        wrapperCol,
        fieldKey,
        // 其他为Element 属性
        style,
        ...others
    } = props;
```
---
title: FormItem - 表单项

## 表单项

基于antd Form.Item二次封装，通过type指定表单元素

## 示例

<code src="./demo/basic.jsx"></code>

## API

其他属性参见 [Form.Item](https://ant.design/components/form-cn/#Form.Item)

除了额外属性以及`Form.Item`属性外，其他属性将透传给表单元素

额外属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 表单元素类型，详见[type类型](#type类型) | `string` | `input` |
| noSpace | 不允许输入空格 | `boolean` | - |
| pattern | 正则校验 | `[RegExp, string?]` | - |
| maxLength | 可输入最大字符数 | `number` | - |
| minLength | 可输入最小字符数 | `number` | - |
| dateFormat | 日期字符串与moment对象自动互转 recognized RFC2822 or ISO format | `string` | - |

### type类型

| 类型 | 对应Ant Design组件 |
| --- | --- |
| cascader | Cascader |
| checkbox | Checkbox |
| checkbox-group | Checkbox.Group |
| date | DatePicker |
| date-range | DatePicker.RangePicker |
| date-time | DatePicker |
| email | Input |
| hidden | undefined |
| image-code | ImageCode |
| input | Input |
| message-code | MessageCode |
| mobile | Input |
| number | InputNumber |
| password | Input.Password |
| radio | Radio |
| radio-button | Radio.Group |
| radio-group | Radio.Group |
| select | Select |
| select-tree | TreeSelect |
| switch | Switch |
| textarea | Input.TextArea |
| time | TimePicker |
| time-range | TimePicker |
| transfer | Transfer |

# React Admin

基于[React17.x](https://reactjs.org)、[Ant Design4.x](https://ant.design/)的管理系统架构。

- [在线预览](https://sxfad.github.io/react-admin/build)
- [查看文档](https://sxfad.github.io/react-admin/#/)
- [组件库ra-lib文档](https://sxfad.github.io/ra-lib/)

## 安装依赖

- node v12.14.0
- yarn 1.22.10

```bash
yarn
```

注：如果由于网络等原因安装不成功，可以尝试 `tyarn` 或 `cnpm` 或 `npm` 或 `yarn --registry https://registry.npm.taobao.org`

设置环境变量，windows平台可以使用 [cross-env](https://github.com/kentcdodds/cross-env#)

## 开发启动

如果您是第一次使用，想快速预览效果，可以是用mock方式启动：`REACT_APP_MOCK=true yarn start`

```
# 正常启动开发模式
yarn start 

# 自定义端口
PORT=3001 yarn start

# HTTPS 方式启动
HTTPS=true yarn start

# 开启本地mock
REACT_APP_MOCK=true yarn start
```

## 开发代理 & 测试代理

修改`src/setupProxyConfig.json`，页面右上角头部有下拉，可以快速切换代理。

```json
[
    {
        "name": "张三",
        "disabled": false,
        "baseUrl": "/zhangsan",
        "target": "http://127.0.0.1:8080"
    },
    {
        "name": "测试环境",
        "baseUrl": "/api",
        "target": "http://127.0.0.1:8080"
    }
]
```

## 生产构建

```
# 正常构建
yarn build

# 构建到指定目录
BUILD_PATH=./dist yarn build

# 指定配置环境
REACT_APP_CONFIG_ENV=test yarn build

# 打包大小分析
yarn build:analyzer

# 打包时间分析
yarn build:time
```

## 样式

- 支持less及css
- src下less进行css module处理，css不进行css module处理
- css module 应用样式写法
    ```jsx
    import styles from './style.module.less';
    
    <div className={styles.root}>
        <h1 className={styles.title}></h1>
    </div>
    ```
- 项目中添加了[classnames](https://github.com/JedWatson/classnames)扩展，可以直接按照[classnames](https://github.com/JedWatson/classnames)方式在className中编写样式；
    ```jsx
        import styles from './style.module.less';
    
        const isActive = true;
  
        <div className={[styles.root, isActive && styles.active]}>
            <h1 className={styles.title}></h1>
        </div>
    ```
- 主题变量修改 theme.less [antd 样式变量](https://ant.design/docs/react/customize-theme-cn)

## 代码规范

代码规范使用 [prettier](https://prettier.io/) [参考知乎这片文章](https://zhuanlan.zhihu.com/p/81764012)

团队多人开发，无论使用webstorm还是vscode，都使用prettier（配置文件：.prettierrc.js）进行代码格式化。

IDE格式化快捷键可以配置成prettier

git commit 时会根据prettier进行代码格式化，确保提交到仓库的代码都符合规范

