import { stringify } from 'qs';
import request from '../utils/request';
//const apiurl="http://39.106.49.27";
const apiurl="http://106.14.4.212:88";
//export const apidd = 'http://39.106.49.27/app_common/upload/imgUpload';
export const apidd = 'http://106.14.4.212:88/app_common/upload/imgUpload';
//export const apidd = '/api/app_common/upload/imgUpload';
export async function getmaerchantlist(params) {//商家列表
  return request(apiurl+`/pc_seller_manager/pcSellerManager?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function getcitys(params) {//获取城市
  return request(apiurl+`/app_common/getArea?${stringify(params)}`, {
    method: 'GET',
  });
}
export async function getfl(params) {//获取店铺分类
  return request(apiurl+'/app_common/getCategory', {
    method: 'GET',
  });
}
export async function getdpdetail(params) {//获取商户详情
  return request(apiurl+`/pc_seller_manager/pcSellerManageDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function fakeAccountLogin(params) { //登录
  return request(apiurl+`/login`, {
    method: 'POST',
    body: params,
  });
}
export async function pcSellerManageBySellerNo(params) {//商户封停营业切换
  return request(apiurl+`/pc_seller_manager/pcSellerManageBySellerNo?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSelectSellerAccountById(params) {//获取商户银行信息
  return request(apiurl+`/pc_userBank/pcSelectSellerAccountById?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcUserShare(params) {//获取好友邀请
  return request(apiurl+`/pc_userManage/pcUserShare?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSelectUserManageList(params) {//用户列表
  return request(apiurl+`/pc_userManage/selectList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function sellerInsert(params) {//添加商户
  return request(apiurl+`/pc_seller_manager/sellerInsert`, {
    method: 'POST',
     body: params,
  });
}
export async function pcSelectUserDate(params) {//好友邀请图表
  return request(apiurl+`/pc_userManage/pcSelectUserData?${stringify(params)}`, {
    method: 'POST',
//   body: params,
  });
}
export async function advertisingList(params){//广告位列表
	return request (apiurl+`/pcQftActivities/advertisingList?${stringify(params)}`,{
		method:'POST',
	})
}
export async function advertisingRecords(params){//广告位执行记录
	return request (apiurl+`/pcQftActivities/advertisingRecords?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editAdvertising(params){//编辑广告位
	let ss = {
		action:params.action,
		remark:params.remark
	}
	let dd = params.qftIndexImg
	return request (apiurl+`/pcQftActivities/editAdvertising?${stringify(ss)}`,{
		method:'POST',
		body:dd
	})
}
export async function selectDetailsById(params){//详情-用户详细信息
	return request (apiurl+`/pc_userManage/selectDetailsById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectHistoryById(params){//详情-登录历史
	return request (apiurl+`/pc_userManage/selectHistoryById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectWalletRecordDetails(params){//详情-BPCC信息
	return request (apiurl+`/pc_userManage/selectWalletRecordDetails?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectUserOrdersById(params){//详情-订单信息
	return request (apiurl+`/pc_userManage/selectUserOrdersById?${stringify(params)}`,{
		method:'POST',
	})
}
export async function relieveSuspendedByID(params){//详情-解除封停
	return request (apiurl+`/pc_userManage/relieveSuspendedByID?${stringify(params)}`,{
		method:'POST',
	})
}
export async function suspendedByID(params){//详情-封停账号
	return request (apiurl+`/pc_userManage/suspendedByID?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcOrdersDetails(params){//详情-订单详细信息
	return request (apiurl+`/pc_userManage/pcOrdersDetails?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readcheckList(params){//实名认证-审核记录
	return request (apiurl+`/pcQftUserProve/read/checkList?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readdetail(params){//实名认证-审核列表/审核记录-信息详情/查看详情
	return request (apiurl+`/pcQftUserProve/read/detail?${stringify(params)}`,{
		method:'POST',
	})
}
export async function readlist(params){//实名认证-审核列表/审核记录
	return request (apiurl+`/pcQftUserProve/read/list?${stringify(params)}`,{
		method:'POST',
	})
}
export async function updateagreeQftUserProve(params){//信息详情-通过
	return request (apiurl+`/pcQftUserProve/update/agreeQftUserProve?${stringify(params)}`,{
		method:'POST',
	})
}
export async function updatepassQftUserProve(params){//信息详情-拒绝
	return request (apiurl+`/pcQftUserProve/update/passQftUserProve?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcUserDataCount(params){//注册用户总注册量
	return request (apiurl+`/pc_userData/pcUserDataCount?${stringify(params)}`,{
		method:'POST',
	})
}
export async function pcUserDataByTimeRanges(params){//注册用户自定义时间查询
	return request (apiurl+`/pc_userData/pcUserDataByTimeRanges?${stringify(params)}`,{
		method:'POST',
	})
}
export async function showActivities(params){//信息详情-拒绝
	return request (apiurl+`/pcQftActivities/showActivities?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editActivities(params){//首页-任务栏标签编辑
	return request (apiurl+`/pcQftActivities/editActivities?`,{
		method:'POST',
		body:params
	})
}
export async function showIndustryCategory(params){//行业标签配置显示
	return request (apiurl+`/pcQftActivities/showIndustryCategory?${stringify(params)}`,{
		method:'POST',
	})
}
export async function addIndustryCategory(params){//行业标签添加
	return request (apiurl+`/pcQftActivities/addIndustryCategory`,{
		method:'POST',
		body:params
	})
}
export async function editIndustryCategory(params){//行业标签添加
	return request (apiurl+`/pcQftActivities/editIndustryCategory`,{
		method:'POST',
		body:params
	})
}
export async function selectCount(params){//BPCC自定义时间查询
	return request (apiurl+`/pcQftUserWlletRecord/selectCount?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectByTimeRanges(params){//BPCC发放总数
	return request (apiurl+`/pcQftUserWlletRecord/selectByTimeRanges?${stringify(params)}`,{
		method:'POST',
	})
}
export async function selectDetails(params){//BPCC发放总数
	return request (apiurl+`/pcQftUserWlletRecord/selectDetails?${stringify(params)}`,{
		method:'POST',
	})
}

export async function register(params){//新人注册
	return request (apiurl+`/pcQftActivities/register?${stringify(params)}`,{
		method:'POST',
	})
}
export async function registerData(params){//新人注册数据
	return request (apiurl+`/pcQftActivities/registerData?${stringify(params)}`,{
		method:'POST',
	})
}
export async function editTask(params){//活动配置
	return request (apiurl+`/pcQftTask/pc/editTask`,{
		method:'POST',
		body:params
	})
}
export async function readTask(params){//具体活动信息
	return request (apiurl+`/pcQftTask/pc/readTask?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function registerNumberAndTotal(params){//活动内容-人数与BPCC发放
	return request (apiurl+`/pcQftActivities/registerNumberAndTotal?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInDay(params){//每日签到
	return request (apiurl+`/pcQftActivities/signInDay?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInDayNumberAndTotal(params){//活动内容-每日签到-人数与BPCC发放
	return request (apiurl+`/pcQftActivities/signInDayNumberAndTotal?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function signInData(params){//每日签到数据
	return request (apiurl+`/pcQftActivities/signInData?${stringify(params)}`,{
		method:'POST',
	})
} 
export async function invitationFriend(params) {//获取好友邀请
  return request(apiurl+`/pcQftActivities/invitationFriend?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function invitationFriendData(params) {//好友邀请图表
  return request(apiurl+`/pcQftActivities/invitationFriendData?${stringify(params)}`, {
    method: 'POST',
//   body: params,
  });
}
export async function invitationFriendResult(params) {//获取好友邀请
  return request(apiurl+`/pcQftActivities/invitationFriendResult?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showlistTitleIndex(params) {//首页-列表标题/签到任务/附近列表标题/个人--我的钱包
  return request(apiurl+`/pcAppTextConttrol/showlistTitleIndex?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showTextControl(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/showTextControl?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editAppContent(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/editAppContent`, {
    method: 'POST',
    body: {
    	sysDic:params
    },
  });
}
export async function publicNumber(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/personBpcc/publicNumber?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function showInviteFriend(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/showInviteFriend?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function aboutOur(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/aboutOur?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function obtionRule(params) {//首页-文案配置
  return request(apiurl+`/pcAppTextConttrol/obtionRule?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function attentionPublicNumber(params) {//首页-文案配置
  return request(apiurl+`/pcQftActivities/attentionPublicNumber?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function attentionPublicNumberList(params) {//首页-文案配置
  return request(apiurl+`/pcQftActivities/attentionPublicNumberList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function officialWeChat(params) {//首页-文案配置
  return request(apiurl+`/pcQftActivities/officialWeChat?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function officialWeChatList(params) {//首页-文案配置
  return request(apiurl+`/pcQftActivities/officialWeChatList?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function insertAdvertising(params) {//首页-文案配置
	let ss = {
		action:params.action,
		remark:params.remark
	}
	let dd = params.qftIndexImg
  return request(apiurl+`/pcQftActivities/insertAdvertising?${stringify(ss)}`, {
    method: 'POST',
    body:dd
  });
}
export async function sellerStoreDetails(params) {//详情--门店信息
  return request(apiurl+`/pc_seller_manager/sellerStoreDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editBasicBySellerNo(params) {//详情--门店信息
  return request(apiurl+`/pc_seller_manager/editBasicBySellerNo`, {
    method: 'POST',
    body:params
  });
}
export async function editInformation(params) {//详情--门店信息
  return request(apiurl+`/pc_seller_manager/editInformation?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function editPhoto(params) {//详情--门店信息
  return request(apiurl+`/pc_seller_manager/editPhoto`, {
    method: 'POST',
    body:params
  });
}
export async function pcSellerCheck(params) {//管理审核列表
  return request(apiurl+`/pc_seller/pcSellerCheck?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerCheckDetails(params) {//管理审核列表
  return request(apiurl+`/pc_seller/pcSellerCheckDetails?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerCheckBySellerNo(params) {//管理审核列表
  return request(apiurl+`/pc_seller/pcSellerCheckBySellerNo?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerRecordCount(params) {//管理审核列表
  return request(apiurl+`/pc_seller/pcSellerRecordCount?${stringify(params)}`, {
    method: 'POST',
  });
}
export async function pcSellerRecord(params) {//管理审核列表
  return request(apiurl+`/pc_seller/pcSellerRecord?${stringify(params)}`, {
    method: 'POST',
  });
}

