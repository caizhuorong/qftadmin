import { isUrl } from '../utils/utils';

const menuData = [
	{
    name: '商户管理',
    icon: 'team',
    path: 'merchant',
    children: [
      {
        name: '商家列表',
        path: 'list',
      },
    ],
	},
	{
    name: '用户管理',
    icon: 'team',
    path: 'person',
    children: [
      {
        name: '用户列表',
        path: 'list',
      },
      {
        name: '审核列表',
        path: 'examine_list',
      },
      {
        name: '审核记录',
        path: 'examine_Record',
      },
      {
        name: '实名认证配置',
        path: 'configure',
      }
    ],
  },
	{
    name: '入驻管理',
    icon: 'safety',
    path: 'admission',
    children: [
      {
        name: '审核列表',
        path: 'list',
      },
      {
        name: '入驻记录',
        path: 'examine',
      }
    ],
},
{
    name:'订单管理',
    icon:'profile',
    path:'order',
    hideInMenu: true,
    children: [
      {
        name: '订单列表',
        path: 'list',
      }
    ],
},

  {
    name: '数据概况',
    icon: 'line-chart',
    path: 'statistics',
    children: [
      {
        name: 'BPCC发放数据',
        path: 'coup',
      },
      {
        name: 'APP下载量',
        path: 'appchart',
      },
      {
        name: '注册用户',
        path: 'userchart',
      },
      {
        name: '启动次数',
        path: 'startchart',
      },
       
    ],
  },
  {
    name: '活动内容',
    icon: 'line-chart',
    path: 'active',
    children: [
      {
        name: '好友邀请',
        path: 'friend',
      },
      {
        name: '新人注册',
        path: 'newman',
      },
      {
        name: '每日签到',
        path: 'signin',
      },
      {
        name: '广告位',
        path: 'banner',
      },
      {
        name: '关注公众号',
        path: 'follow',
      },
      {
        name: '官方微信',
        path: 'wx',
      }
    ],
  },
  {
    name: 'APP配置',
    icon: 'setting',
    path: 'appset',
    children: [
      {
        name: '首页配置',
        path: 'indexset',
      },
      {
        name: '行业标签配置',
        path: 'nearbyset',
      },
      {
        name: '文案配置',
        path: 'copywritings',
       
      }
    ],
	}
];




function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
