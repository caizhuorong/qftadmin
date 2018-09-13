import { 
	pcSellerCheck,
	getcitys,
	getfl,
	pcSellerCheckDetails,
	pcSelectSellerAccountById,
	pcSellerCheckBySellerNo,
	pcSellerRecordCount,
	pcSellerRecord
} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'admission',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    fl:[],
    detail:{},
    bank:{},
    visible: false,
    confirmLoading: false,
    pcSellerRecordCounts:{},
    pcSellerRecord:{
    	list:[],
    	pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(pcSellerCheck, payload);
    	var datas = {};
  		datas.list = [];
  	 	datas.pagination={};
			response.rows.forEach(function(x,y){
				datas.list.push(x);
				datas.list[y].key = y;
			})
			datas.pagination={
				total:parseInt(response.total),
				current:payload.pageNumber ? payload.pageNumber:1,
				showSizeChanger:false,
				pageSize:10
			};
      yield put({
        type: 'save',
        payload: datas,
      });
    },

    *city({ payload,callback}, { call, put }) {
    	let data=[];
    	var pay = payload;
   		if( payload.targetOption != undefined ){
   			var payloads={};
    		payloads.pId = payload.pId;
    		payloads.modelMap = payload.modelMap;
    		pay = payloads;
   		}
			let response = yield call(getcitys, pay);
			
    	if( payload.targetOption == undefined ){
    		if( response.rows != undefined ){
    			response.rows.forEach(function(x,y){
		      	data.push({
		      		value:x.id,
		      		label:x.codeText,
		      		isLeaf: false,
		      	})
		      });
    		}
    	}else{
    		var payloads={};
    		payloads.pId = payload.pId;
    		payloads.modelMap = payload.modelMap;
//  		response = yield call(getcitys, payloads);
					let datas = payload.targetOption;
					datas.children = [];
					if( payload.no == true ){
						if( response.rows != undefined ){
							if( payload.ss != undefined ){
								let sss = payload.ss;
								response.rows.forEach(function(x,y){
					      	datas.children.push({
					      		value:x.id,
					      		label:x.codeText,
					      		isLeaf: true,
					      	})
					      });

					      let yy = [];
					      payload.ss.children.forEach(function(x,y){
									if(x.value == datas.value ){
										x =  datas;
										sss.children[y] = x;
									}
								})

								datas = sss
							}else{
								response.rows.forEach(function(x,y){
					      	datas.children.push({
					      		value:x.id,
					      		label:x.codeText,
					      		isLeaf: true,
					      	})
					      });
							}
							
						}
					}else{
						if( response.rows != undefined ){
					
							response.rows.forEach(function(x,y){
				      	datas.children.push({
				      		value:x.id,
				      		label:x.codeText,
				      		isLeaf: false,
				      	})
				      });
						}
					}
	      data=datas;
    	}
      yield put({
        type: 'citys',
        payload: data,
      });
      if(callback) callback(data);
    },
    
    *fl({ payload }, { call, put }) {
      const response = yield call(getfl, payload);
      const data = response.rows;
      response.rows.forEach(function(x,y){
      	data[y].key = y;
      });

      yield put({
        type: 'fls',
        payload: data,
      });
    },
    *detail({payload,callback},{call,put}){
    	const response = yield call (pcSellerCheckDetails,payload);
    	let data = response.rows[0];
    	yield put({
        type: 'details',
        payload: data,
      });
      if (callback) callback(response.rows[0]);
    },
    *bankcar ({ payload },{call,put}){
    	const response = yield call ( pcSelectSellerAccountById,payload );
    	let data = response.rows[0];
    	yield put ({
    		type:'bankcars',
    		payload:data
    	});
    },
    *pcSellerCheckBySellerNo({payload,callback},{call,put}){
    	const response = yield call ( pcSellerCheckBySellerNo,payload );
    	if( response.code == 200 ){
				message.success('审核成功');
			}else{
				message.error(response.msg);
			};
			if( callback ) callback();
    },
    *pcSellerRecordCount({payload},{call,put}){
    	const response = yield call ( pcSellerRecordCount,payload );
    	console.log(response);
    	yield put ({
    		type:'pcSellerRecordCounts',
    		payload:response.data
    	});
    },
    *pcSellerRecord({payload},{call,put}){
    	const response = yield call ( pcSellerRecord,payload );
    	var datas = {};
  		datas.list = [];
  	 	datas.pagination={};
			response.rows.forEach(function(x,y){
				datas.list.push(x);
				datas.list[y].key = y;
			})
			datas.pagination={
				total:parseInt(response.total),
				current:payload.pageNumber ? payload.pageNumber:1,
				showSizeChanger:false,
				pageSize:10
			};
			console.log(datas);
      yield put({
        type: 'pcSellerRecords',
        payload: datas,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    citys(state, action) {
    	let datas = state.optionss;
    	if ( action.payload.children!=undefined ){
  			datas.forEach(function(x,y){
    			if(x.value == action.payload.value){
    				x.children = action.payload.children
    			}
    		})
    	}else{
    		datas = action.payload;
    	}
      return {
      	...state,
        optionss:datas,
      };
    },
    
    fls( state,action ){
    	return {
    		...state,
    		fl:action.payload
    	}
    },
    details( state,action ){
    	return {
    		...state,
    		detail:action.payload
    	}
    },
    bankcars(state,action){

    	state.bank = action.payload
    	return {
    		...state
    	}
    },
    pcSellerRecordCounts(state,action){
    	return {
    		...state,
    		pcSellerRecordCounts:action.payload
    	}
    },
    pcSellerRecords(state,action){
    	return {
    		...state,
    		pcSellerRecord:action.payload
    	}
    }
  },
};
