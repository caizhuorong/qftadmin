import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/statistics/userchart':{
    	component:dynamicWrapper(app,['chart'],()=>import('../routes/Statistics/UserChart')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
		
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/merchant/list':{
    	component:dynamicWrapper(app,['merchant'],()=>import('../routes/Merchant/List')),
    },
    '/merchant/detail':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Merchant/ListDetail')),
    },
		'/merchant/add':{
    	component:dynamicWrapper(app,['merchant'],()=>import('../routes/Merchant/add')),
    },
    '/admission/list':{
    	component:dynamicWrapper(app,['admission'],()=>import('../routes/Admission/List')),
    },
    '/admission/detail':{
    	component:dynamicWrapper(app,['admission'],()=>import('../routes/Admission/ExamineInfo')),
    },
    '/admission/examine':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Admission/ExamineList')),
    },
    '/order/list':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Order/List')),
    },
    '/order/detail':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Order/ListDetail')),
    },
    '/coupon/list':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Coupon/List')),
    },
    '/coupon/detail':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Coupon/ListDetail')),
    },
    '/statistics/coup':{
    	component:dynamicWrapper(app,[],()=>import('../routes/Statistics/CouponList')),
    },
    '/person/list':{
    	component:dynamicWrapper(app,['person'],()=>import('../routes/person/list')),
    },
    '/person/detail':{
    	component:dynamicWrapper(app,['person'],()=>import('../routes/person/detail')),
    },
    '/person/order':{
    	component:dynamicWrapper(app,['person'],()=>import('../routes/person/order')),
    },
    '/person/examine_list':{
    	component:dynamicWrapper(app,['examine'],()=>import('../routes/person/examine_list')),
    },
    '/person/examine_record':{
    	component:dynamicWrapper(app,['examine'],()=>import('../routes/person/examine_record')),
    },
    '/person/examinelistdetail':{
    	component:dynamicWrapper(app,['examine'],()=>import('../routes/person/examine_list_detail')),
    },
    '/person/examinerecorddetail':{
    	component:dynamicWrapper(app,['examine'],()=>import('../routes/person/examine_record_detail')),
    },
    '/person/configure':{
    	component:dynamicWrapper(app,['active'],()=>import('../routes/person/configure')),
    },
    '/active/friend':{
    	component:dynamicWrapper(app,['friends'],()=>import('../routes/Active/Friends')),
    },
    '/active/newman':{
    	component:dynamicWrapper(app,['newman'],()=>import('../routes/Active/Newman')),
    },
    '/active/banner':{
    	component:dynamicWrapper(app,['active'],()=>import('../routes/Active/BannerList')),
    },
    '/active/signin':{
    	component:dynamicWrapper(app,['signin'],()=>import('../routes/Active/SignIn')),
    },
    '/active/bannerdetail':{
    	component:dynamicWrapper(app,['active'],()=>import('../routes/Active/BannerDetail')),
    },
    '/active/follow':{
    	component:dynamicWrapper(app,['active'],()=>import('../routes/Active/follow')),
    },
    '/active/wx':{
    	component:dynamicWrapper(app,['active'],()=>import('../routes/Active/wx')),
    },
    '/appset/indexset':{
    	component:dynamicWrapper(app,['appset'],()=>import('../routes/Appset/indexset')),
    },
    '/appset/nearbyset':{
    	component:dynamicWrapper(app,['appset'],()=>import('../routes/Appset/nearbyset')),
    },
    '/appset/copywritings':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywritings')),
    },
   '/appset/copywriting/homepage':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/homePage')),
    },
    '/appset/copywriting/signins':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/signIns')),
    },
    '/appset/copywriting/friendss':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/Friendss')),
    },
    '/appset/copywriting/nearbys':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/nearbys')),
    },
    '/appset/copywriting/wallet':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/wallet')),
    },
    '/appset/copywriting/bpcc':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/BPCC')),
    },
    '/appset/copywriting/aboutus':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/aboutUs')),
    },
    '/appset/copywriting/reward':{
    	component:dynamicWrapper(app,['copywriting'],()=>import('../routes/Appset/Copywriting/reward')),
    },
    '/statistics/appchart':{
    	component:dynamicWrapper(app,['chart'],()=>import('../routes/Statistics/AppChart')),
    },
    '/statistics/startchart':{
    	component:dynamicWrapper(app,['chart'],()=>import('../routes/Statistics/StartChart')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
