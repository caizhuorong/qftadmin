import { 
	advertisingList,
	advertisingRecords,
	editAdvertising,
	attentionPublicNumber,
	attentionPublicNumberList,
	readTask,
	editTask,
	officialWeChat,
	officialWeChatList,
	insertAdvertising
} from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'active',
  state: {
    data: {
      list: [],
      pagination:{},
    },
    chart_data:[{
    	x: 1,
    	y1: 1,
    }],
    banner:{
    	list:[],
    	pagination:{},
    },
    top:{},
    execution:[],
    follow:{
    	list:[],
    	pagination:{},
    },
    top_toal:{},
    tops:{},
    wxs:{
    	list:[],
    	pagination:{},
    },
    top_toals:{},
  },

  effects: {
		*list({ payload }, { call, put }) {
      const response = yield call(attentionPublicNumberList, payload);
      let lists = [];
      response.rows.forEach(function(x,y){
      	lists.push({
      		...x,
      		key:y
      	})
      })
    	let datas = {
    		list:lists,
    		pagination:{
    			total:parseInt(response.total),
					current:payload.pageNumber ? payload.pageNumber:1,
					showSizeChanger:false,
					pageSize:10
    		}
    	};
    	yield put({
        type: 'lists',
        payload: datas,
      });
    },
    *xlist({ payload }, { call, put }) {
      const response = yield call(officialWeChatList, payload);
      let lists = [];
      response.rows.forEach(function(x,y){
      	lists.push({
      		...x,
      		key:y
      	})
      })
    	let datas = {
    		list:lists,
    		pagination:{
    			total:parseInt(response.total),
					current:payload.pageNumber ? payload.pageNumber:1,
					showSizeChanger:false,
					pageSize:10
    		}
    	};
    	yield put({
        type: 'xlists',
        payload: datas,
      });
    },
    *top({ payload },{ call,put }){
    	const response = yield call ( readTask,payload );
			let data = response.data;
    	yield put ({
    		type:'tops',
    		payload:data
    	})
    },
    *xtop_toal({ payload },{ call,put }){
    	const response = yield call (officialWeChat,payload);
			let data = response.rows[0];

    	yield put ({
    		type:'xtop_toals',
    		payload:data
    	})
    },
    *xtop({ payload },{ call,put }){
    	const response = yield call ( readTask,payload );
			let data = response.data;
    	yield put ({
    		type:'xtops',
    		payload:data
    	})
    },
    *top_toal({ payload },{ call,put }){
    	const response = yield call (attentionPublicNumber,payload);
			let data = response.rows[0];

    	yield put ({
    		type:'xtop_toals',
    		payload:data
    	})
    },
    *editTask({payload,callback},{call,put}){
    	const response = yield call (editTask,payload);
    	if( response.code == 200 ){
				message.success(response.msg);
				yield put ({
	    		type:'tops',
	    		payload:{
						activate:payload.activate,
						token:payload.token
	    		}
	    	})
			}else{
				message.error(response.msg);
			};
			 if (callback) callback();
    },
    *banner({ payload },{ call,put }){
    	const response = yield call ( advertisingList,payload );
    	let data = {
				list:[],
				pagination:[]
			}
    	let lists = [];
    	response.rows.forEach(function(x,y){
      	lists.push({
      		...x,
      		key:y
      	})
     })
    	data.list = lists;
    	data.pagination = {
    		total:parseInt(response.total),
				current:payload.pageNumber ? payload.pageNumber:1,
				showSizeChanger:false,
				pageSize:10
    	}

    	yield put ({
    		type:'banners',
    		payload:data
    	})
    },
    *execution({payload},{call,put}){
    	const response = yield call (advertisingRecords,payload);
    	let datas = response.rows;
    	yield put ({
    		type:'executions',
    		payload:datas
    	})
    },
    *bj({payload},{call,put}){
    	const response = yield call (editAdvertising,payload);
    	if( response.code == 200 ){
				message.success(response.msg);
			}else{
				message.error(response.msg);
			};
    },
    *addbanner({payload},{call,put}){
    	const response = yield call (insertAdvertising,payload);
    	if( response.code == 200 ){
				message.success(response.msg);
			}else{
				message.error(response.msg);
			};
    },
    
  },

  reducers: {
    banners(state,action){
    	return {
    		...state,
    		banner:action.payload
    	}
    },
    executions(state,action){
    	return {
    		...state,
    		execution:action.payload
    	}
    },
    lists(state, action) {

      return {
        ...state,
        follow: action.payload,
      };
    },
    xlists(state, action) {

      return {
        ...state,
        wxs: action.payload,
      };
    },
    tops( state,action ){

    	return {
    		...state,
    		top:action.payload
    	}
    },
    top_toals(state,action){
    	return {
    		...state,
    		top_toal:action.payload
    	}
    },
    xtops( state,action ){
    	return {
    		...state,
    		top:action.payload
    	}
    },
    xtop_toals(state,action){
    	return {
    		...state,
    		top_toals:action.payload
    	}
    },
    charts(state,action){
    	return{
    		...state,
    		chart_data:action.payload.data_cr,
    		zg:action.payload.zg
    	}
    }
  },
};


