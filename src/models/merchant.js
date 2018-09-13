import { 
	getmaerchantlist,
	getcitys,
	getfl,
	getdpdetail,
	pcSellerManageBySellerNo,
	pcSelectSellerAccountById,
	sellerInsert,
	sellerStoreDetails,
	editBasicBySellerNo,
	editInformation,
	editPhoto
} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'merchant',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    optionss:[],//城市选择选项
    optionsss:[],
    fl:[],
    detail:{},
    bank:{},
   visible: false,
    confirmLoading: false,
    sellerStoreDetails:{}
    
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getmaerchantlist, payload);
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
		*citye({ payload}, { call, put }) {
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

							response.rows.forEach(function(x,y){
				      	datas.children.push({
				      		value:x.id,
				      		label:x.codeText,
				      		isLeaf: true,
				      	})
				      });
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
        type: 'cityse',
        payload: data,
      });
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
    	const response = yield call (getdpdetail,payload);
    	let data = response.rows[0];
    	yield put({
        type: 'details',
        payload: data,
      });
      if (callback) callback(response.rows[0]);
    },
    *switchs({payload},{call,put}){
    	const response = yield call ( pcSellerManageBySellerNo,payload);
    	let data = {
    		sellerState: payload.sellerState=='1' ? '1':'3' 
    	}
    	if( response.code == 200 ){
    		yield put ({
					type:'switchss',
					payload:data
				})
    	}else{
    		yield put ({
					type:'switchss',
					payload:{
						sellerState:payload.sellerState,
					}
				})
    	}
    },
    *bankcar ({ payload },{call,put}){
    	const response = yield call ( pcSelectSellerAccountById,payload );
    	let data = response.rows[0];
    	yield put ({
    		type:'bankcars',
    		payload:data
    	})
    	
    },
    *add({ payload },{ call,put }){
    	const response = yield call ( sellerInsert,payload );
			let data = response.code;
			if( data == 200 ){
				message.success(response.msg);
			}else{
				message.error(response.msg);
			};
			yield put ({
    		type:'bankcars',
    		payload:data
    	})
    },
    *sellerStoreDetails({payload,callback},{call,put}){
   		const response = yield call ( sellerStoreDetails,payload );
   		console.log(response);
   		yield put ({
    		type:'sellerStoreDetailss',
    		payload:response.rows[0]
    	})
   		if (callback)callback(response.rows[0])
    },
    *editBasicBySellerNo({ payload,callback },{ call,put }){
    	const response = yield call ( editBasicBySellerNo,payload );
			let data = response.code;
			if( data == 200 ){
				message.success('保存成功');
			}else{
				message.error(response.msg);
			};
			if (callback) callback();
    },
    *editInformation({payload,callback},{call,put}){
    	const response = yield call (editInformation,payload);
    	let data = response.code;
    	if( data == 200 ){
    		message.success('保存成功');
    	}else{
    		message.error(response.msg);
    	};
    	if ( callback ) callback(data);
    },
    *editPhoto({payload,callback},{call,put}){
    	const response = yield call (editPhoto,payload);
    	let data = response.code;
    	if( data == 200 ){
    		message.success('保存成功');
    	}else{
    		message.error(response.msg);
    	};
    	if ( callback ) callback(data);
    },
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
    cityse(state, action) {
    	let datas = state.optionsss;
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
        optionsss:datas,
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
    switchss(state,action){
    	state.detail.seller_state = action.payload.sellerState;
    	return {
    		...state
    	}
    },
    bankcars(state,action){

    	state.bank = action.payload
    	return {
    		...state
    	}
    },
    adds( state,action ){
    	return {
    		...state,
    	}
    },
    sellerStoreDetailss( state,action ){
    	return{
    		...state,
    		sellerStoreDetails:action.payload
    	}
    }
  },
};
