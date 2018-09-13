import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
	Row,
	Col,
	Card,
	Divider
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import { Link,hashHistory } from 'dva/router';
import styles from './order.less';
const {Description}= DescriptionList;

@connect(({ person, loading }) => ({
  person,
  loading: loading.models.person,
}))
export default class TableList extends PureComponent {
  state = {
   
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'person/pcOrdersDetails',
      payload:{
      	orderId:this.props.location.state.id,
      }
    });
  }
  
  render() {
    const {
      person: {order},
      loading,
    } = this.props;
    let states = '';
    let types = '';
    if( order != undefined ){
    	
    	switch (order.order_status){
  			case '0':
   				states = '待支付';
   				break;
   			case '1':
   				states = '待使用';
   				break;
   			case '2':
   				states = '已使用';
   				break;
   			case '3':
 					states = '退款中';
   				break;
 				case '4':
 					states = '已退款';
   				break;	
   			default:
   				states = '过期';
   				break;
    	}

    
    	
    }
    if( order != undefined ){
    	switch (order.payment_type){//
    		case '0':
    			types = 'BPCC'
    			break;
    		case '1':
    			types = '微信';
    			break;
    		case '2':
    			types = '支付宝'
    			break;	
    		default:
    			types = '';
    			break;
    	}

    }
    return (
      <PageHeaderLayout title="订单详情">
      	<Card bordered={false}>
      		<Row gutter={24}>
      			<Col span={24}>
							<DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
	    		 			<Description style={{width:'100%'}} term="用户信息">{order != undefined ?order.uPhone:''}</Description>
	    		 			<Description style={{width:'100%'}} term="用户ID">{order != undefined ?order.uId:''}</Description>
	    		 			<Description style={{width:'100%'}} term="用户名称">{order != undefined ?order.nick_name:''}</Description>
	    		 		</DescriptionList>      			
      			</Col>
      			 <Divider />
      			<Col span={24}>
      				<DescriptionList size="large" title="商户信息" style={{ marginBottom: 32 }}>
	    		 			<Description style={{width:'100%'}} term="经营者">{order != undefined ?order.identity_card_name:''}</Description>
	    		 			<Description style={{width:'100%'}} term="账户信息">{order != undefined ?order.phone:''}</Description>
	    		 			<Description style={{width:'100%'}} term="商户ID">{order != undefined ?order.Sid:''}</Description>
	    		 			<Description style={{width:'100%'}} term="店铺名称">{order != undefined ?order.title:''}</Description>
	    		 			<Description style={{width:'100%'}} term="店铺电话">{order != undefined ?order.telephone:''}</Description>
	    		 			<Description style={{width:'100%'}} term="店铺地址">{order != undefined ?order.proviceName:''}{order != undefined ?order.cityName:''}{order != undefined ?order.areaName:''}{order != undefined ?order.address:''}</Description>
	    		 		</DescriptionList> 
      			</Col>
      			 <Divider />
      			<Col span={24}>
      				<DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
	    		 			<Description style={{width:'100%'}} term="购买商品">{order != undefined ?order.goodsTitle:''}</Description>
	    		 			<Description style={{width:'100%'}} term="商品单价">{order != undefined ?order.price:''}</Description>
	    		 			<Description style={{width:'100%'}} term="购买数量">{order != undefined ?order.count:''}</Description>
	    		 			<Description style={{width:'100%'}} term="商品总计">{order != undefined ?order.amount_payable:''}</Description>
	    		 			<Description style={{width:'100%'}} term="用户付款">{order != undefined ?order.amount_payment:''}</Description>
	    		 			<Description style={{width:'100%'}} term="订单状态">{states}</Description>
	    		 			<Description style={{width:'100%'}} term="创建时间">{order != undefined ?order.create_time:''}</Description>
	    		 			<Description style={{width:'100%'}} term="支付方式">{types}</Description>
	    		 			<Description style={{width:'100%'}} term="订单编号">{order != undefined ?order.order_no:''}</Description>
	    		 		</DescriptionList> 
      			</Col>
      		</Row>
      	</Card>
      </PageHeaderLayout>
    );
  }
}