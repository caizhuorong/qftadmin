
import { routerRedux } from 'dva/router';
export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {

    	if( localStorage.getItem('antd-pro-authority') == null || localStorage.getItem('antd-pro-authority') == '' ){
    		yield put(routerRedux.push('/user/login'));
    	}else{
		  const response = {
	      	name:localStorage.getItem('antd-pro-authority')
	     }
	      yield put({
	        type: 'saveCurrentUser',
	        payload: response,
	      });
    	}
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
