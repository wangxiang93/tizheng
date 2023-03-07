import moment from 'moment';

const now = moment().format('YYYY-MM-DD HH:mm:ss');

export default `
    create table if not exists menus
    (
        id        INTEGER PRIMARY KEY,
        parentId  INTEGER                             null,
        title     varchar(50)                         null,     -- comment '菜单标题或者权限码标题',
        icon      varchar(50)                         null,     -- comment '菜单图标',
        basePath  varchar(200)                        null,     -- comment '基础路径',
        path      varchar(200)                        null,     -- comment '菜单路径',
        target    varchar(50)                         null,     -- comment '目标：menu 应用菜单 qiankun 乾坤子项目 iframe 内嵌iframe _self 当前窗口打开第三方 _blank 新开窗口打开第三方',
        sort INTEGER   default 0                 null,     -- comment '排序，越大越靠前',
        type      INTEGER   default 1                 not null, -- comment '类型： 1 菜单 2 权限码',
        enabled    tinyint(1)                          not null, -- comment '是否可用',
        code      varchar(50)                         null,     -- comment '权限码',
        name      varchar(50)                         null,     -- comment '乾坤子应用注册名',
        entry     varchar(200)                        null,     -- comment '乾坤子应用入口地址',
        createdAt timestamp default CURRENT_TIMESTAMP not null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP null,     -- comment '更新时间',
        constraint menus_id_uindex
            unique (id)
    );
    create table if not exists user_collect_menus
    (
        id        INTEGER PRIMARY KEY,
        userId    INTEGER                             not null,
        menuId    INTEGER                             not null,
        createdAt timestamp default CURRENT_TIMESTAMP not null,
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint user_collect_menus_id_uindex
        unique (id)
        );

    create table if not exists role_menus
    (
        id        INTEGER PRIMARY KEY,
        roleId    INTEGER                             not null,
        menuId    INTEGER                             not null,
        createdAt timestamp default CURRENT_TIMESTAMP not null,
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint role_menus_id_uindex
            unique (id)
    );

    create table if not exists roles
    (
        id        INTEGER PRIMARY KEY,
        type      INTEGER,
        systemId      INTEGER,
        enabled    tinyint(1)                          not null, -- comment '是否可用',
        name      varchar(50)                         not null, -- comment '角色名称',
        remark    varchar(200)                        null,     -- comment '角色备注',
        createdAt timestamp default CURRENT_TIMESTAMP not null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP null,     -- comment '更新时间',
        constraint roles_id_uindex
            unique (id)
    );

    create table if not exists user_roles
    (
        id        INTEGER PRIMARY KEY,
        userId    INTEGER                             not null,
        roleId    INTEGER                             not null,
        createdAt timestamp default CURRENT_TIMESTAMP not null,
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint user_roles_id_uindex
            unique (id)
    );

    create table if not exists users
    (
        id        INTEGER PRIMARY KEY,
        account   varchar(50)                         not null, -- comment '账号',
        name      varchar(50)                         not null, -- comment '用户名',
        password  varchar(20)                         null,     -- comment '密码',
        mobile    varchar(20)                         null,     -- comment '电话',
        email     varchar(50)                         null,     -- comment '邮箱',
        userDepartId     varchar(50)                         null,     -- comment '用户部门',
        userDepartName     varchar(50)                         null,     -- comment '用户部门',
        enabled    tinyint(1)                          not null, -- comment '是否可用',
        createdAt timestamp default CURRENT_TIMESTAMP not null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint users_account_uindex
            unique (account),
        constraint users_id_uindex
            unique (id)
    );

    create table if not exists subjectManage
    (
        id        INTEGER PRIMARY KEY,
        zhuantimingcheng   varchar(50)                         not null, -- comment '账号',
        zhuantifuzebumen      varchar(50)                         not null, -- comment '用户名',
        fuzeren  varchar(20)                         null,     -- comment '密码',
        xiangguanbumen    varchar(20)                         null,     -- comment '电话',
        fuzerenlianxifangshi    varchar(20)                         null,     -- comment '电话',
        zhengcelianjie    varchar(200)                         null,     -- comment '电话',
        zhuantimiaoshu    varchar(200)                         null,     -- comment '电话',
        zhuantizhibiaoshu     varchar(50)                         null,     -- comment '邮箱',
        createdAt timestamp default CURRENT_TIMESTAMP not null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint subjectManage_id_uindex
            unique (id)
    );
    create table if not exists depart
    (
        id        INTEGER PRIMARY KEY,
        bumengmingcheng   varchar(50)                         not null, -- comment '账号',
        bumengbianhao      varchar(50)                         not null, -- comment '用户名',
        beizhu  varchar(100)                         null,     -- comment '密码',
        parentid    varchar(20)                         null,     -- comment '电话',
        parentName    varchar(110)                         null,     -- comment '电话',
        createdAt timestamp default CURRENT_TIMESTAMP not null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP not null,
        constraint depart_id_uindex
            unique (id)
    );
    create table if not exists indexTable
    (
        id        INTEGER PRIMARY KEY,
        status   varchar(50)                          null, -- comment '状态',
        name   varchar(50)                         not null, -- comment '账号',
        sourceDepart      varchar(50)                          null, -- comment '用户名',
        sourceKeshi  varchar(100)                         null,     -- comment '密码',
        fuzeDepart    varchar(20)                         null,     -- comment '电话',
        fuzeren    varchar(110)                         null,     -- comment '电话',
        phone    varchar(110)                         null,     -- comment '电话',
        meaning    varchar(110)                         null,     -- comment '含义',
        tongjifangshi    varchar(110)                         null,     -- comment '统计方式',
        tongjizhouqi   varchar(110)                         null,     -- comment '统计周期',
        month   varchar(110)                         null,     -- comment '第几月',
        week   varchar(110)                         null,     -- comment '第几周',
        day   varchar(110)                         null,     -- comment '第几日',
        isShore   varchar(110)                         null,     -- comment '是否共享',
        shujuduijiejiekou   varchar(110)                         null,     -- comment '数据对接接口',
        zhibiaozhidanwei   varchar(110)                         null,     -- comment '指标指单位',
        region   varchar(110)                         null,     -- comment '区域',
        zidingyiweidufenzu   varchar(110)                         null,     -- comment '自定义维度分组',
        zhibiaojisuanluoji   varchar(110)                         null,     -- comment '指标计算逻辑',
        zhibiaopeizhixiang   varchar(110)                         null,     -- comment '指标配置项',
        yujingyuzhi   varchar(110)                         null,     -- comment '预警阈值',
        createdAt timestamp default CURRENT_TIMESTAMP  null, -- comment '创建时间',
        updatedAt timestamp default CURRENT_TIMESTAMP  null,
        constraint depart_id_uindex
            unique (id)
    );
`;
// 初始化指标表
export const initindexTableSql = `
    INSERT INTO indexTable (id,status,name,sourceDepart,sourceKeshi,fuzeDepart,fuzeren,phone,meaning,tongjifangshi,tongjizhouqi,month,week,day,isShore,shujuduijiejiekou,zhibiaozhidanwei,region,zidingyiweidufenzu,zhibiaojisuanluoji,zhibiaopeizhixiang,yujingyuzhi,  createdAt, updatedAt)
    VALUES (1, '待配置', '指标名称', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (2, '待配置', '指标名称2', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (3, '待配置', '指标名称3', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (4, '待配置', '指标名称4', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (5, '待配置', '指标名称5', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (6, '待配置', '指标名称6', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (7, '待配置', '指标名称7', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}'),
    (8, '待配置', '指标名称8', '城运中心', '情报科', '无锡市发展和改革委员会','邓良斌','15211116666','描述','周期', '年度',12,1,20,'是','/api','个','新吴区','自定义维度分组','1*1','同比',60, '${now}', '${now}');
`;

// 初始化专题表
export const initSubjectManageSql = `
    INSERT INTO subjectManage (id, zhuantimingcheng, zhuantifuzebumen, fuzeren, xiangguanbumen, zhengcelianjie,zhuantimiaoshu,fuzerenlianxifangshi,zhuantizhibiaoshu, createdAt, updatedAt)
    VALUES (1,  '营商环境', '无锡市城运中心', '城运中心', '无锡市发展和改革委员会','wwww.baidu.com','描述','15211165932', 68, '${now}', '${now}'),
    (2,  '综合经济指标专题', '无锡市城运中心', '城运中心', '无锡市发展和改革委员会','wwww.baidu.com','描述','15211165932', 11, '${now}', '${now}'),
    (3,  '城市发展专题', '无锡市城运中心', '城运中心', '无锡市发展和改革委员会','wwww.baidu.com','描述','15211165932', 2, '${now}', '${now}'),
    (4,  '城市民生专题', '无锡市城运中心', '城运中心', '无锡市发展和改革委员会','wwww.baidu.com','描述','15211165932', 3, '${now}', '${now}'),
    (5,  '城市资源消耗专题', '无锡市城运中心', '城运中心', '无锡市发展和改革委员会','wwww.baidu.com','描述','15211165932', 45, '${now}', '${now}');
`;
// 初始化部门表
export const initDepartSql = `
    INSERT INTO depart (id, bumengmingcheng, bumengbianhao, beizhu, parentid,parentName, createdAt, updatedAt)
    VALUES (1,  '市政府', 'SZF', '备注', 0,'根目录',  '${now}', '${now}'),
    (2,  '大数据中心', 'DSJZX', '备注', 1,'市政府',  '${now}', '${now}'),
    (3,  '公安局', 'GAJ', '备注', 1,'市政府',  '${now}', '${now}'),
    (4,  '交通局', 'JTJ', '备注', 1, '市政府', '${now}', '${now}'),
    (5,  '商务局', 'SWJ', '备注', 1,'市政府',  '${now}', '${now}'),
    (6,  '市委', 'SW', '备注', 0,'根目录',  '${now}', '${now}'),
    (61,  '秘书处', '秘书处', '备注', 6,'市委',  '${now}', '${now}'),
    (7,  '市政协', 'SZX', '备注', 0,'根目录',  '${now}', '${now}'),
    (8,  '市人大', 'SRD', '备注', 0,'根目录',  '${now}', '${now}');
`;
export const initUsersSql = `
    INSERT INTO users (id,userDepartId,userDepartName, account, name, password, mobile, email, enabled, createdAt, updatedAt)
    VALUES (1,2,'大数据中心', 'admin', '管理员', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (2,2,'大数据中心', 'admin3', '张三', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (3,2,'大数据中心', 'admin4', '李四', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (4,2,'大数据中心', 'admin5', '王五', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (5,2,'大数据中心', 'admin6', '黄六', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (6,2,'大数据中心', 'admin7', '苏七', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (7,2,'大数据中心', 'admin8', '周八', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}'),
    (8,2,'大数据中心', 'admin9', '超举', '123456', '18888888888', 'email@qq.com', 1, '${now}', '${now}');
`;
export const initRolesSql = `
    INSERT INTO roles (id, type, enabled,  name, remark, createdAt, updatedAt)
    VALUES (1, 1, true, '超级管理员', '超级管理员拥有系统所有权限', '${now}', '${now}');
`;

export const initRoleMenusSql = `
    INSERT INTO role_menus (id, roleId, menuId, createdAt, updatedAt)
    VALUES (1, 1, 1, '${now}', '${now}');
    INSERT INTO role_menus (id, roleId, menuId, createdAt, updatedAt)
    VALUES (2, 1, 2, '${now}', '${now}');
    INSERT INTO role_menus (id, roleId, menuId, createdAt, updatedAt)
    VALUES (3, 1, 3, '${now}', '${now}');
    INSERT INTO role_menus (id, roleId, menuId, createdAt, updatedAt)
    VALUES (4, 1, 4, '${now}', '${now}');
    INSERT INTO role_menus (id, roleId, menuId, createdAt, updatedAt)
    VALUES (5, 1, 5, '${now}', '${now}');
`;
export const initUserRolesSql = `
    INSERT INTO user_roles (id, userId, roleId, createdAt, updatedAt)
    VALUES (1, 1, 1, '${now}', '${now}');
`;

export const initMenuSql = `
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (1, true, null, '系统管理', null, null, null, 'menu', 0, 1, null, null, null, '${now}', '${now}');
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (2, true,1, '用户管理', null, null, '/users', 'menu', 0, 1, null, null, null, '${now}', '${now}');
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (3, true,1, '角色管理', null, null, '/roles', 'menu', 0, 1, null, null, null, '${now}', '${now}');
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (4, true,1, '菜单管理', null, null, '/menus', 'menu', 0, 1, null, null, null, '${now}', '${now}');
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (5, true,2, '添加用户', null, null, null, null, 0, 2, 'ADD_USER', null, null, '${now}', '${now}');
    INSERT INTO menus (id, enabled, parentId, title, icon, basePath, path, target, sort, type, code, name, entry, createdAt, updatedAt)
    VALUES (6, true,2, '删除用户', null, null, null, null, 0, 2, 'UPDATE_USER', null, null, '${now}', '${now}');
`;

export const initUserCollectMenusSql = `
    INSERT INTO user_collect_menus (userId, menuId, createdAt, updatedAt)
    VALUES (1, 2, '${now}', '${now}');
`;

export const initDataSql = {
    menus: initMenuSql,
    roles: initRolesSql,
    users: initUsersSql,
    role_menus: initRoleMenusSql,
    user_roles: initUserRolesSql,
    user_collect_menus: initUserCollectMenusSql,
    // 专题表
    subjectManage: initSubjectManageSql,
    // 部门表
    depart: initDepartSql,
    // 指标表
    indexTable: initindexTableSql,
};
