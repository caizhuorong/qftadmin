import { 
	readcheckList,
	readdetail,
	readlist,
	updateagreeQftUserProve,
	updatepassQftUserProve,
} from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'examine',
  state: {
    data: {
      list: [],
      pagination:{},
    },
    detail:{},
    datas:{
    	list:[],
    	pagination:{}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(readlist, payload);
    	let data = {
    		list:response.rows
    	};
    	data.pagination={
				total:parseInt(response.total),
				current:payload.pageNumber ? payload.pageNumber:1,
				showSizeChanger:false,
				pageSize:10
			};
    	yield put({
        type: 'save',
        payload: data,
      });
    },
    *readdetail({payload},{call,put}){
    	const response = yield call (readdetail,payload);
    	let data = response.rows[0];
    	yield put({
        type: 'details',
        payload: data,
      });
    },
    *updateagreeQftUserProve({payload},{call,put}){
    	const response = yield call (updateagreeQftUserProve,payload);
    	if( response.code == 200 ){
				message.success('审核成功');
				yield put(routerRedux.push('./examine_list'));
			}else{
				message.error(response.msg);
			};
    },
    *updatepassQftUserProve({payload,callback},{call,put}){
    	const response = yield call (updatepassQftUserProve,payload);
    	if (callback) callback()
    	if( response.code == 200 ){
				message.success('拒绝成功');
				yield put(routerRedux.push('./examine_list'));
			}else{
				message.error(response.msg);
			};
    },
    *readcheckList({payload},{call,put}){
    	const response = yield call(readcheckList, payload);
    	let data = {
    		list:response.rows
    	};
    	data.pagination={
				total:parseInt(response.total),
				current:payload.pageNumber ? payload.pageNumber:1,
				showSizeChanger:false,
				pageSize:10
			};
    	yield put({
        type: 'readcheckLists',
        payload: data,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        data: action.payload,
      };
    },
    details(state,action){
    	return {
    		...state,
    		detail:action.payload
    	}
    },
    readcheckLists(state,action){
    	return {
    		...state,
    		datas:action.payload
    	}
    }
  },
};
