import { 
	readTask,
	signInDay,
	signInDayNumberAndTotal,
	editTask,
	signInData
} from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'signin',
  state: {
    data: {
      list: [],
      pagination:[],
    },
    chart_data:[{
    	x: 1,
    	y: 1,
    }],
    top_toal:{},
    top:{},
    zg:0
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(signInDay, payload);
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
    *chart({payload},{call,put}){
    	const pay = {
    		startTime:payload.startTime,
    		endTime:payload.endTime,
    		value:payload.value,
    		taskId:payload.taskId
    	}
    	const response = yield call (signInData,pay);
    	let datas = response.rows;
    	let data={};
    	let data_cr = [];
    	let zg = 0;
    	if( payload.type == 0 ){
    		datas.forEach(function(x,y){
	    		data_cr.push({
	    			x:x.stime+":00:00",
	    			y:parseInt(x.uIdCount)
	    		})
	    		zg = zg+ parseInt(x.uIdCount)
	    	})
    		data={
    			data_cr:data_cr,
    			zg:zg
    		}
    	}else if(payload.type == 1){
    		datas.forEach(function(x,y){
	    		data_cr.push({
	    			x:x.stime+":00:00",
	    			y:parseInt(x.total)
	    		})
	    		zg = zg+ parseInt(x.total)
	    	})
    		data={
    			data_cr:data_cr,
    			zg:zg
    		}
    	}else if( payload.type == 2 ){
    		datas.forEach(function(x,y){
	    		data_cr.push({
	    			x:x.stime+":00:00",
	    			y:parseInt(x.total)
	    		})
	    		zg = zg+ parseInt(x.total)
	    	})
    		data={
    			data_cr:data_cr,
    			zg:zg
    		}
    	}else if( payload.type == 3 ){
    		datas.forEach(function(x,y){
	    		data_cr.push({
	    			x:x.stime+":00:00",
	    			y:parseInt(x.total)
	    		})
	    		zg = zg+ parseInt(x.total)
	    	})
    		data={
    			data_cr:data_cr,
    			zg:zg
    		}
    	}
    	yield put ({
    		type:'charts',
    		payload:data,
    	})
    },
    *top({ payload },{ call,put }){
    	const response = yield call ( readTask,payload );
			let data = response.data;
    	yield put ({
    		type:'tops',
    		payload:data
    	})
    },
    *top_toal({ payload },{ call,put }){
    	const response = yield call (signInDayNumberAndTotal,payload);
			let data = response.rows[0];

    	yield put ({
    		type:'top_toals',
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
						token:payload.token,
						cyclesReward:payload.cyclesReward
	    		}
	    	})
			}else{
				message.error(response.msg);
			};
			 if (callback) callback();
    }
  },

  reducers: {
    lists(state, action) {
      return {
        ...state,
        data: action.payload,
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
    charts(state,action){
    	return{
    		...state,
    		chart_data:action.payload.data_cr,
    		zg:action.payload.zg
    	}
    }
  },
};


