import ajax from 'src/commons/ajax';
import {getLoginUser, isLoginPage, formatMenus, getContainerId} from '@ra-lib/admin';
import {isNoAuthPage} from 'src/commons';
import {IS_SUB} from 'src/config';

export default {
    /**
     * 获取菜单
     * @returns {Promise<*[]|*>}
     */
    async getMenuData() {
        // 非登录页面，不加载菜单
        if (isNoAuthPage()) return [];

        // 作为子应用，不加载
        if (IS_SUB) return [];

        // 获取服务端数据，并做缓存，防止多次调用接口
        // return (this.getMenuData.__CACHE =
        //     this.getMenuData.__CACHE ||
        //     ajax
        //         .get('/authority/queryUserMenus', { userId: getLoginUser()?.id })
        //         .then((res) => res.map((item) => ({ ...item, order: item.order ?? item.ord ?? item.sort })))
        //         .catch(() => []));

        // 前端硬编码菜单
        return [
            {id: 5, title: '指标体系管理', order: 999, type: 1},
            // /*-*/ {id: 52, parentId: 5, title: '部门专题', path: '/subjectManage/depaSubject', order: 800, type: 1},
            /*-*/ {id: 53, parentId: 5, title: '指标专题', path: '/subjectManage/allSubject', order: 800, type: 1},
            /*-*/{id: 7,parentId: 5, title: '指标任务管理', order: 800, type: 1},
            /*-*//*-*/ {id: 71, parentId: 7, title: '任务发布', path: '/indexTask/taskPublish', order: 800, type: 1},
            /*-*/// /*-*/ {id: 72, parentId: 7, title: '任务审批', path: '/indexTask/taskApprove', order: 800, type: 1},
            /*-*//*-*/ {id: 73, parentId: 7, title: '我的任务', path: '/indexTask/myTask', order: 800, type: 1},
            // /*-*/{id: 6, parentId: 5, title: '指标管理', order: 998, type: 1},
            /*-*//*-*/ {id: 62, parentId: 5, title: '全部指标', path: '/indexManage/depaIndex', order: 800, type: 1},
            /*-*//*-*/ {id: 63, parentId: 5, title: '查看指标详情', path: '/indexManage/myIndex/viewDetails', order: 800, type: 2},
            {id: 8, title: '指标仓库', order: 997, type: 1},
            // /*-*/ {id: 81, parentId: 8, title: '指标共享', path: '/indexWarehouse/publicWarehouse', order: 800, type: 1},
            // /*-*/ {id: 82, parentId: 8, title: '指标模型库', path: '/indexWarehouse/modelWarehouse', order: 800, type: 1},
            /*-*/ {id: 51, parentId: 8, title: '我的专题', path: '/subjectManage/mySubject', order: 800, type: 1},
            /*-*/ {id: 61, parentId: 8, title: '我的指标', path: '/indexManage/myIndex', order: 800, type: 1},
            // {id: 9, title: '告警管理', order: 996, type: 1},
            // /*-*/ {id: 91, parentId: 9, title: '最新告警', path: '/warningManage/newWarning', order: 800, type: 1},
            // /*-*/ {id: 92, parentId: 9, title: '历史告警', path: '/warningManage/historyMange', order: 800, type: 1},
            // /*-*/ {id: 93, parentId: 9, title: '告警忽略清单', path: '/warningManage/ignoreList', order: 800, type: 1},
            {id: 1, title: '系统管理', order: 1, type: 1},
            /*-*/ {id: 11, parentId: 1, title: '用户管理', path: '/system/users', order: 900, type: 1},
            /*-*/ {id: 12, parentId: 1, title: '角色管理', path: '/system/roles', order: 900, type: 1},
            /*-*/ {id: 13, parentId: 1, title: '菜单管理', path: '/system/menus', order: 900, type: 1},
            /*-*/ {id: 14, parentId: 1, title: '部门管理', path: '/system/depart', order: 900, type: 1},
            {id: 2, title: '首页', path: '/', order: 10000000000, type: 1},
        ];
    },
    /**
     * 获取系统菜单
     * @returns {Promise<T[]>}
     */
    async getMenus() {
        // mock时，做个延迟处理，否则菜单请求无法走mock
        if (process.env.REACT_APP_MOCK) await new Promise((resolve) => setTimeout(resolve));

        const serverMenus = await this.getMenuData();
        const menus = serverMenus
            .filter((item) => !item.type || item.type === 1)
            .map((item) => {
                return {
                    ...item,
                    id: `${item.id}`,
                    parentId: `${item.parentId}`,
                };
            });
        return formatMenus(menus);
    },
    /**
     * 获取用户收藏菜单
     * @returns {Promise<*>}
     */
    async getCollectedMenus() {
        // 登录页面，不加载
        if (isLoginPage()) return [];

        // 作为子应用，不加载
        if (IS_SUB) return [];

        const loginUser = getLoginUser();
        const data = await ajax.get('/authority/queryUserCollectedMenus', {userId: loginUser?.id});
        // const data = [];

        const menus = data.filter((item) => item.type === 1).map((item) => ({...item, isCollectedMenu: true}));

        return formatMenus(menus);
    },
    /**
     * 保存用户收藏菜单
     * @param menuId
     * @param collected
     * @returns {Promise<void>}
     */
    async saveCollectedMenu({menuId, collected}) {
        await ajax.post('/authority/addUserCollectMenu', {userId: getLoginUser()?.id, menuId, collected});
    },
    /**
     * 获取用户权限码
     * @returns {Promise<*[string]>}
     */
    async getPermissions() {
        const serverMenus = await this.getMenuData();
        return serverMenus.filter((item) => item.type === 2).map((item) => item.code);
    },
    /**
     * 获取子应用配置
     * @returns {Promise<*[{title, name, entry}]>}
     */
    async getSubApps() {
        // 从菜单数据中获取需要注册的乾坤子项目
        const menuTreeData = (await this.getMenus()) || [];

        // 传递给子应用的数据
        const loginUser = getLoginUser();
        const props = {
            mainApp: {
                loginUser: loginUser,
                token: loginUser?.token,
            },
        };
        let result = [];
        const loop = (nodes) =>
            nodes.forEach((node) => {
                const {_target, children} = node;
                if (_target === 'qiankun') {
                    const {title, name, entry} = node;
                    const container = `#${getContainerId(name)}`;
                    const activeRule = `/${name}`;

                    result.push({
                        title,
                        name,
                        entry,
                        container,
                        activeRule,
                        props,
                    });
                }
                if (children?.length) loop(children);
            });
        loop(menuTreeData);

        return result;
    },
};
