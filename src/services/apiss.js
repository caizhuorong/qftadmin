import { stringify } from 'qs';
import request from '../utils/request';
const apiurl="http://192.168.2.111";

//export const apidd = 'http://39.106.49.27/app_common/upload/imgUpload';
//export const apidd = 'http://106.14.4.212:88/app_common/upload/imgUpload';
export const apidd = '/api/app_common/upload/imgUpload';
export async function getmaerchantlist(params) {//商家列表
  return request(`/api/pc_seller_manager/pcSellerManager?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function getcitys(params) {//获取城市
  return request(`/api/app_common/getArea?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function getfl(params) {//获取店铺分类
  return request('/api/app_common/getCategory', {
    method: 'GET',
  });
}
export async function getdpdetail(params) {//获取商户详情
  return request(`/api/pc_seller_manager/pcSellerManageDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function fakeAccountLogin(params) { //登录
  return request(`/api/login`, {
    method: 'POST',
    body: params,
  });
}
export async function pcSellerManageBySellerNo(params) {//商户封停营业切换
  return request(`/api/pc_seller_manager/pcSellerManageBySellerNo?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSelectSellerAccountById(params) {//获取商户银行信息
  return request(`/api/pc_userBank/pcSelectSellerAccountById?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSelectUserManageList(params) {//用户列表
  return request(`/api/pc_userManage/selectList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function sellerInsert(params) {//添加商户
  return request(`/api/pc_seller_manager/sellerInsert`, {
    method: 'POST',
     body: params,
  });
}
export async function advertisingList(params){//广告位列表
	return request (`/api/pcQftActivities/advertisingList?${stringify(params)}`,{
		method:'POST',
	})
}
export async function advertisingRecords(params){//广告位执行记录
	return request (`/api/pcQftActivities/advertisingRecords?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editAdvertising(params){//编辑广告位
	let ss = {
		action:params.action,
		remark:params.remark
	}
	let dd = params.qftIndexImg
	return request (`/api/pcQftActivities/editAdvertising?${stringify(ss)}`,{
		method:'POST',
		body:dd
	})
}
export async function selectDetailsById(params){//详情-用户详细信息
	return request (`/api/pc_userManage/selectDetailsById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectHistoryById(params){//详情-登录历史
	return request (`/api/pc_userManage/selectHistoryById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectWalletRecordDetails(params){//详情-BPCC信息
	return request (`/api/pc_userManage/selectWalletRecordDetails?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectUserOrdersById(params){//详情-订单信息
	return request (`/api/pc_userManage/selectUserOrdersById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function relieveSuspendedByID(params){//详情-解除封停
	return request (`/api/pc_userManage/relieveSuspendedByID?${stringify(params)}`,{
		method:'POST',
	})
}
export async function suspendedByID(params){//详情-封停账号
	return request (`/api/pc_userManage/suspendedByID?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcOrdersDetails(params){//详情-订单详细信息
	return request (`/api/pc_userManage/pcOrdersDetails?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readcheckList(params){//实名认证-审核记录
	return request (`/api/pcQftUserProve/read/checkList?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readdetail(params){//实名认证-审核列表/审核记录-信息详情/查看详情
	return request (`/api/pcQftUserProve/read/detail?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readlist(params){//实名认证-审核列表/审核记录
	return request (`/api/pcQftUserProve/read/list?${stringify(params)}`,{
		method:'POST',
	})
}
export async function updateagreeQftUserProve(params){//信息详情-通过
	return request (`/api/pcQftUserProve/update/agreeQftUserProve?${stringify(params)}`,{
		method:'POST',
	})
}
export async function updatepassQftUserProve(params){//信息详情-拒绝
	return request (`/api/pcQftUserProve/update/passQftUserProve?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcUserDataCount(params){//注册用户总注册量
	return request (`/api/pc_userData/pcUserDataCount?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcUserDataByTimeRanges(params){//注册用户自定义时间查询
	return request (`/api/pc_userData/pcUserDataByTimeRanges?${stringify(params)}`,{
		method:'POST',
	})
}
export async function showActivities(params){//信息详情-拒绝
	return request (`/api/pcQftActivities/showActivities?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editActivities(params){//首页-任务栏标签编辑
	return request (`/api/pcQftActivities/editActivities?`,{
		method:'POST',
		body:params
	})
}
export async function showIndustryCategory(params){//行业标签配置显示
	return request (`/api/pcQftActivities/showIndustryCategory?${stringify(params)}`,{
		method:'POST',
	})
}
export async function addIndustryCategory(params){//行业标签添加
	return request (`/api/pcQftActivities/addIndustryCategory`,{
		method:'POST',
		body:params
	})
}
export async function editIndustryCategory(params){//行业标签添加
	return request (`/api/pcQftActivities/editIndustryCategory`,{
		method:'POST',
		body:params
	})
}
export async function selectCount(params){//BPCC自定义时间查询
	return request (`/api/pcQftUserWlletRecord/selectCount?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectByTimeRanges(params){//BPCC发放总数
	return request (`/api/pcQftUserWlletRecord/selectByTimeRanges?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectDetails(params){//BPCC发放总数
	return request (`/api/pcQftUserWlletRecord/selectDetails?${stringify(params)}`,{
		method:'POST',
	})
}
export async function register(params){//新人注册
	return request (`/api/pcQftActivities/register?${stringify(params)}`,{
		method:'POST',
	})
}
export async function registerData(params){//新人注册数据
	return request (`/api/pcQftActivities/registerData?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editTask(params){//活动配置
	if(params.id == 2){
		let data = {
			id:params.id,
			activate:params.activate,
			token:params.token
		}
		return request (`/api/pcQftTask/pc/editTask?cyclesReward=${params.cyclesReward}`,{
			method:'POST',
			body:data
		})
	}else{
		return request (`/api/pcQftTask/pc/editTask`,{
			method:'POST',
			body:params
		})
	}
	
}
export async function readTask(params){//具体活动信息
	return request (`/api/pcQftTask/pc/readTask?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function registerNumberAndTotal(params){//活动内容-人数与BPCC发放
	return request (`/api/pcQftActivities/registerNumberAndTotal?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInDay(params){//每日签到
	return request (`/api/pcQftActivities/signInDay?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInDayNumberAndTotal(params){//活动内容-每日签到-人数与BPCC发放
	return request (`/api/pcQftActivities/signInDayNumberAndTotal?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInData(params){//每日签到数据
	return request (`/api/pcQftActivities/signInData?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function invitationFriend(params) {//获取好友邀请
  return request(`/api/pcQftActivities/invitationFriend?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function invitationFriendData(params) {//好友邀请图表
  return request(`/api/pcQftActivities/invitationFriendData?${stringify(params)}`, {
    method: 'POST',
//   body: params,
  });
}
export async function invitationFriendResult(params) {//获取好友邀请
  return request(`/api/pcQftActivities/invitationFriendResult?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showlistTitleIndex(params) {//首页-列表标题/签到任务/附近列表标题/个人--我的钱包
  return request(`/api/pcAppTextConttrol/showlistTitleIndex?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showTextControl(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/showTextControl?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editAppContent(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/editAppContent`, {
    method: 'POST',
    body: {
    	sysDic:params
    },
  });
}
export async function publicNumber(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/personBpcc/publicNumber?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showInviteFriend(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/showInviteFriend?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function aboutOur(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/aboutOur?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function obtionRule(params) {//首页-文案配置
  return request(`/api/pcAppTextConttrol/obtionRule?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function attentionPublicNumber(params) {//首页-文案配置
  return request(`/api/pcQftActivities/attentionPublicNumber?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function attentionPublicNumberList(params) {//首页-文案配置
  return request(`/api/pcQftActivities/attentionPublicNumberList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function officialWeChat(params) {//首页-文案配置
  return request(`/api/pcQftActivities/officialWeChat?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function officialWeChatList(params) {//首页-文案配置
  return request(`/api/pcQftActivities/officialWeChatList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function insertAdvertising(params) {//首页-文案配置
	let ss = {
		action:params.action,
		remark:params.remark
	}
	let dd = params.qftIndexImg
  return request(`/api/pcQftActivities/insertAdvertising?${stringify(ss)}`, {
    method: 'POST',
    body:dd
  });
}
export async function sellerStoreDetails(params) {//详情--门店信息
  return request(`/api/pc_seller_manager/sellerStoreDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editBasicBySellerNo(params) {//详情--门店信息
  return request(`/api/pc_seller_manager/editBasicBySellerNo`, {
    method: 'POST',
    body:params
  });
}
export async function editInformation(params) {//详情--门店信息
  return request(`/api/pc_seller_manager/editInformation?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editPhoto(params) {//详情--门店信息
  return request(`/api/pc_seller_manager/editPhoto`, {
    method: 'POST',
    body:params
  });
}
export async function pcSellerCheck(params) {//管理审核列表
  return request(`/api/pc_seller/pcSellerCheck?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerCheckDetails(params) {//管理审核列表
  return request(`/api/pc_seller/pcSellerCheckDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerCheckBySellerNo(params) {//管理审核列表
  return request(`/api/pc_seller/pcSellerCheckBySellerNo?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerRecordCount(params) {//管理审核列表
  return request(`/api/pc_seller/pcSellerRecordCount?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerRecord(params) {//管理审核列表
  return request(`/api/pc_seller/pcSellerRecord?${stringify(params)}`, {
    method: 'POST',
  });
}

