import { 
	pcUserDataCount,
	pcUserDataByTimeRanges,
	selectCount,
	selectByTimeRanges,
	selectDetails
} from '../services/api';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'chart',
  state: {
    data:[
    	{x:1,y:'2'}
    ],
		user:0,
		datas:{
			list:[],
			pagination:{}
		},
  },
 
  effects: {
    *pcUserDataCount({payload,callback}, { call, put }) {
      const response = yield call(pcUserDataCount,payload);
      if( response == undefined ){
      	yield put(routerRedux.push('/user/login'));
      }else{
      	 yield put({
	        type: 'pcUserDataCounts',
	        payload: response.data,
	      });
      }
     
//      if (callback) callback();
    },
    *pcUserDataByTimeRanges({payload}, { call, put }) {
      const response = yield call(pcUserDataByTimeRanges,payload);
      console.log(response);
      if( response != undefined ){
      	let data = [];
	      let datanum = 0;
	      response.rows.forEach(function(x,y){
	      	data.push({
						x:x.stime+':00:00',
						y:parseInt(x.total)
	      	})
	      	datanum = datanum + parseInt(x.total)
	      })
	      yield put({
	        type: 'pcUserDataByTimeRangess',
	        payload:{data:data,datanum:datanum},
	      });
      }
    
    },
    *selectCount({payload,callback}, { call, put }) {
      const response = yield call(selectCount,payload);
      yield put({
        type: 'selectCounts',
        payload: response.data,
      });
//      if (callback) callback();
    },
    *selectByTimeRanges({payload}, { call, put }) {
      const response = yield call(selectByTimeRanges,payload);
      let data = [];
      let datanum = 0;
      response.rows.forEach(function(x,y){
      	data.push({
					x:x.stime+':00:00',
					y:parseInt(x.total)
      	})
      	datanum = datanum + parseInt(x.total)
      })
      yield put({
        type: 'selectByTimeRangess',
        payload:{data:data,datanum:datanum},
      });
    },
     *selectDetails({payload},{call,put}){
    	const response = yield call (selectDetails,payload);
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
        type: 'selectDetailss',
        payload: data,
      });
    },
  },
  reducers: {
    pcUserDataCounts(state, action) {
      return {
        ...state,
        user:action.payload
      };
    },
   	pcUserDataByTimeRangess(state,action){
   		return {
   			...state,
   			data:action.payload
   		}
   	},
   	selectCounts(state, action) {
      return {
        ...state,
        user:action.payload
      };
    },
   	selectByTimeRangess(state,action){
   		return {
   			...state,
   			data:action.payload
   		}
   	},
   	selectDetailss(state,action){
   		return {
   			...state,
   			datas:action.payload
   		}
   	}
  },
};
