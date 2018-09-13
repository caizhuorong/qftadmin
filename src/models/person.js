import { 
	pcSelectUserManageList,
	selectDetailsById,
	selectHistoryById,
	selectWalletRecordDetails,
	selectUserOrdersById,
	relieveSuspendedByID,
	suspendedByID,
	pcOrdersDetails,
} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'person',
  state: {
    data: {
      list: [],
      pagination:{},
    },
    datas_detail:{
    	
    },
    state:'1',
    tab1:{
    	list:[],
    	pagination:{}
    },
    tab2:{
    	list:[],
    	pagination:{}
    },
    order:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(pcSelectUserManageList, payload);
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
    *selectDetailsById ({ payload },{ call,put }){
    	const response = yield call(selectDetailsById, payload);
    	let datas = response.rows[0];
    	yield put ({
    		type:'selectDetailsByIds',
    		payload:datas
    	})
    },
    *selectHistoryById ({ payload },{ call,put }){
    	const response = yield call(selectHistoryById, payload);
    	let datas = {
    		list:response.rows,
    		pagination:{
    			total:parseInt(response.total),
					current:payload.pageNumber ? payload.pageNumber:1,
					showSizeChanger:false,
					pageSize:10
    		}
    	};
    	yield put ({
    		type:'selectHistoryByIds',
    		payload:datas
    	})
    },
     *selectWalletRecordDetails ({ payload },{ call,put }){
    	const response = yield call(selectWalletRecordDetails, payload);
    	let tab1 = {
    		list:response.rows,
    		pagination:{
    			total:parseInt(response.total),
					current:payload.pageNumber ? payload.pageNumber:1,
					showSizeChanger:false,
					pageSize:10
    		}
    	};
    	yield put ({
    		type:'selectWalletRecordDetailss',
    		payload:tab1
    	})
    },
    *selectUserOrdersById({payload},{call,put}){
    	const response = yield call(selectUserOrdersById, payload);
    	let tab2 = {
    		list:response.rows,
    		pagination:{
    			total:parseInt(response.total),
					current:payload.pageNumber ? payload.pageNumber:1,
					showSizeChanger:false,
					pageSize:10
    		}
    	};
    	yield put ({
    		type:'selectUserOrdersByIds',
    		payload:tab2
    	})
    },
    *relieveSuspendedByID({payload},{call,put}){
    	const response = yield call ( relieveSuspendedByID,payload );
    	if( response.code == 200 ){
				message.success('修改成功');
				yield put ({
	    		type:'success',
	    		payload:1
	    	})
			}else{
				message.error(response.msg);
				yield put ({
	    		type:'error',
	    		payload:1
	    	})
			};
    },
    *suspendedByID({payload},{call,put}){
    	const response = yield call (suspendedByID,payload);
    	if( response.code == 200 ){
				message.success('修改成功');
				yield put ({
	    		type:'error',
	    		payload:1
	    	})
			}else{
				message.error(response.msg);
				yield put ({
	    		type:'success',
	    		payload:1
	    	})
			};
    },
 		*pcOrdersDetails({payload},{call,put}){
 			const response = yield call (pcOrdersDetails,payload);
    	let data = response.rows[0];
    	yield put ({
    		type:'pcOrdersDetailss',
    		payload:data
    	})
 		}
  },

  reducers: {
    save(state, action) {
      return {
        data: action.payload,
      };
    },
    selectDetailsByIds(state,action){
    	return {
    		...state,
    		datas_detail:action.payload,
    		state:action.payload.user_state,
    	}
    },
    selectHistoryByIds(state,action){
    	return {
    		...state,
    		data:action.payload
    	}
    },
    selectWalletRecordDetailss(state,action){
    	return {
    		...state,
    		tab1:action.payload
    	}
    },
    selectUserOrdersByIds(state,action){
    	return {
    		...state,
    		tab2:action.payload
    	}
    },
    success(state,action){
    	return{
    		...state,
    		state:action.payload
    	}
    },
    error(state,action){

    	return {
    		...state,
    		state:action.payload
    	}
    },
    pcOrdersDetailss(state,action){
    	return {
    		...state,
    		order:action.payload
    	}
    }
  },
};
