import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: payload.account,
      });
      if (response.code === '200') {
      	localStorage.setItem('antd-pro-authority',payload.account)
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {

          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {

            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {

              redirect = redirect.substr(2);
            }
          } else {

            window.location.href = redirect;
            return;
          }
          yield put(routerRedux.replace(redirect || '/'));
        }else{
        	yield put(routerRedux.push({
	          pathname: '/statistics/userchart',
	        }));

        }
      }
    },
    *logout(_, { put }) {
    	localStorage.setItem('antd-pro-authority','')
      yield put({
        type: 'changeLoginStatus',
        payload: 'guest'
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
			if( payload.code == 200 ){
				 setAuthority(payload);
			}
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
