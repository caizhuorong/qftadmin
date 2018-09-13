import { 
	showlistTitleIndex,
	showTextControl,
	editAppContent,
	publicNumber,
	showInviteFriend,
	aboutOur,
	obtionRule
} from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'copywriting',
  state: {
    data:{
    	list:[],
    	pagination:{}
    },
    pagehome:'',
    signins:'',
    nearbys:'',
    wallet:{},
    aboutus:{},
    friends:{},
    bpcc1:'',
    reward:'',
  },

  effects: {
    *list({ payload }, { call, put }) {
			const response = yield call(showTextControl, payload);
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
    *pagehome({payload},{call,put}){
    	const response = yield call(showlistTitleIndex, payload);
    	yield put({
        type: 'pagehomes',
        payload: response.data,
      });
    },
    *signin({payload},{call,put}){
    	const response = yield call(showlistTitleIndex, payload);
    	yield put({
        type: 'signins',
        payload: response.data,
      });
    },
    *nearby({payload},{call,put}){
    	const response = yield call(showlistTitleIndex, payload);
    	yield put({
        type: 'nearbyss',
        payload: response.data,
      });
    },
    *wallet({payload,callback},{call,put}){
    	const response = yield call(showlistTitleIndex, payload);
    	yield put({
        type: 'wallets',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *aboutus({payload,callback},{call,put}){
    	const response = yield call(aboutOur, payload);
    	yield put({
        type: 'aboutuss',
        payload: response.rows,
      });
      if (callback) callback(response.rows);
    },
    *friends({payload,callback},{call,put}){
    	const response = yield call(showInviteFriend, payload);
    	yield put({
        type: 'friendss',
        payload: response.rows,
      });

      if (callback) callback(response.rows);
    },
    *bpcc1({payload,callback},{call,put}){
    	const response = yield call(publicNumber, payload);
    	yield put({
        type: 'bpcc1s',
        payload: response.rows,
      });
      if (callback) callback(response.rows);
    },
    *reward({payload,callback},{call,put}){
    	const response = yield call(obtionRule, payload);
    	yield put({
        type: 'rewards',
        payload: response.rows,
      });
      if (callback) callback(response.rows);
    },
    *save({payload},{call,put}){
    	const response = yield call(editAppContent, payload);
    	if( response.code == 200 ){
				message.success(response.msg);
			}else{
				message.error(response.msg);
			};
    }
  },

  reducers: {
    lists(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    pagehomes(state, action) {
      return {
        ...state,
        pagehome: action.payload,
      };
    },
    signins(state, action) {
      return {
        ...state,
        signins: action.payload,
      };
    },
    nearbyss(state, action) {
      return {
        ...state,
        nearbys: action.payload,
      };
    },
   wallets(state, action) {
   	console.log(state,action);
      return {
        ...state,
        wallet: action.payload,
      };
    },
    aboutuss(state, action) {
      return {
        ...state,
        aboutus: action.payload,
      };
    },
    friendss(state, action) {
      return {
        ...state,
        friends: action.payload,
      };
    },
    bpcc1s(state, action) {
      return {
        ...state,
        bpcc1: action.payload,
      };
    },
    rewards(state,action){
    	return {
    		...state,
    		reward:action.payload
    	}
    }
  },
};


