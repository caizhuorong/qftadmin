import { 
	showActivities,
	editActivities,
	showIndustryCategory,
	addIndustryCategory,
	editIndustryCategory
} from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'appset',
  state: {
    data: {
      list: [],
      pagination:{
      	total:4,
				current:1,
				showSizeChanger:false,
				pageSize:10
      },
    },
		datas:{
			list:[],
			pagination:{},
		},
		homepage:'',
  },

  effects: {
    *showActivities({ payload ,callback}, { call, put }) {
      const response = yield call(showActivities, payload);
    	let data = {
    		list:response.rows,
	    	pagination:{
					total:100,
					current:1,
					showSizeChanger:false,
					pageSize:100
				}
    	};
    	yield put({
        type: 'showActivitiess',
        payload: data,
     });
     if (callback) callback(data);
    },
    *editActivities({payload,callback},{call,put}){
    	const response = yield call (editActivities,payload);
    	if( response.code == 200 ){
				message.success('编辑成功');
			}else{
				message.error(response.msg);
			};
			if (callback) callback(response.code);
    },
    *showIndustryCategory({payload},{call,put}){
    	const response = yield call (showIndustryCategory,payload);
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
        type: 'showIndustryCategorys',
        payload: data,
      });
    },
    *addIndustryCategory({payload,callback},{call,put}){
    	const response = yield call (addIndustryCategory,payload);
    	if( response.code == 200 ){
				message.success('添加成功');
			}else{
				message.error(response.msg);
			};
			if (callback) callback(response.code);
    },
    
    *editIndustryCategory({payload,callback},{call,put}){
    	const response = yield call (editIndustryCategory,payload);
    	if( response.code == 200 ){
				message.success('编辑成功');
			}else{
				message.error(response.msg);
			};
			if (callback) callback(response.code);
    },
    
  },

  reducers: {
    showActivitiess(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    showIndustryCategorys( state,{payload} ){
    	return {
    		...state,
    		datas:payload
    	}
    }
  },
};


