import React, { Component } from 'react';
import { connect } from 'dva';
import { 
	Card, 
	Divider,
	Modal,
	Row,
	Col,
	Input ,
	Button ,
	DatePicker, 
	Switch,
	Icon,
	Tag 
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import moment from 'moment';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import styles from './ExamineInfo.less';
import business_on from '../../assets/business_on.png';
import order_on from '../../assets/order_on.png';
import park_on from '../../assets/park_on.png';
import train_on from '../../assets/train_on.png';
import wifi_on from '../../assets/wifi_on.png';
import {apidd} from '../../services/api.js';
const { Description } = DescriptionList;
const { TextArea } = Input;
@connect(({ admission, loading }) => ({
  admission,
  loading: loading.effects.admission,
}))
export default class BasicProfile extends Component {
	constructor(props) {
    super(props);
    this.state={
    	lat:0,
    	lon:0,
    	mapshow:1,
    	cityname:'',
    	text:'',
    	visible: false
    }
	}
  componentWillMount() {
  	const _this = this;
    const { dispatch } = _this.props;
    dispatch({
      type: 'admission/detail',
			payload:{
				sellerId:_this.props.location.state.id,
				modelMap:''
			},
			callback(data){
				_this.setState({
					lat:data.lat,
					lon:data.lon,
					cityname:data.proviceName+data.cityName+data.areaName
				})
			}
    });
    dispatch({
      type: 'admission/bankcar',
			payload:{
				userId:_this.props.location.state.id,
			}
    });

  }
	openmap = () => {
		this.setState({
			mapshow:0,
		})
	}
 	showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
		const _this = this;
		const { dispatch } = this.props;
		dispatch({
			type:'admission/pcSellerCheckBySellerNo',
			payload:{
				sellerId:_this.props.location.state.id,
				sellerState:2,
				remark:_this.state.text,
				modelMap:'a'
			},
			callback(){
				setTimeout(function(){
				  _this.props.history.push({
						pathname:'./list',
					})
				})
			}
		})
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
	close_map(){
		this.setState({
			mapshow:1
		})
	}
	renderChild =(d) => {
		let children = [];
		if( d != undefined ){
			let data = JSON.parse(d);
			data.forEach(function(x,y){
				children.push(<li key={y} ><img src={x} /></li>);
			})
			return children;
		}
	}
	other_proof=(d)=>{
		let children = [];
		if( d != undefined ){
			let data = JSON.parse(d);
			data.forEach(function(x,y){
				children.push(<li key={y} ><img src={x} /></li>);
			})
			return children;
		}
	}
	switchchange = (e) =>{
		const { dispatch } = this.props;
		let data = e ? '1':'3'
    dispatch({
      type: 'admission/switchs',
			payload:{
				sellerNo:this.props.location.state.id,
				sellerState:data,
				modelMap:''
			}
    });
	}
	bankch = (e) => {
		let data = '';
		if( e == '1' ){
			data = '经营者账户';
		}else if( e == '2' ){
			data='公司账户';
		}else{
			data='法人账户';
		}
		return data;
	}
	onChanges = (values,valuess) => {
		let city_data = '';
		valuess.forEach(function(x,y){
			city_data = city_data +x.label;
		});
		this.setState({
			city_datas:city_data
		})
	}
	agree = () => {
		const _this = this;
		const { dispatch } = _this.props;
		dispatch({
			type:'admission/pcSellerCheckBySellerNo',
			payload:{
				sellerId:_this.props.location.state.id,
				sellerState:1,
				remark:_this.state.text,
				modelMap:'a'
			},
			callback(){
				setTimeout(function(){
				  _this.props.history.push({
						pathname:'./list',
					})
				})
			}
		})
	}
	textchange = (value) => {
		console.log(value.target.value);
		this.setState({
			text:value.target.value
		})
	}
	tabs = (e) => {
		let tab = '';
		if(e == '0'){
			return <Tag color="orange">审核中</Tag>;
		}else if ( e == '1' ) {
			return <Tag color="green">审核通过</Tag>;
		}else if ( e == '2' ) {
			return <Tag color="red">审核未通过</Tag>;
		}else{
			return <Tag color="red">封停</Tag>;
		}
	}
  render() {
  	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
      },
    };
    const { admission:{detail,bank,}, loading ,loadings,} = this.props;
    console.log(detail);
    return (
      <PageHeaderLayout title="店铺审核">
    		<Card bordered={false}>
    		 	<Row gutter={24}>
    		 		<DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
	    		 		<Col span={2}>
	    		 			<Description term="店铺状态"></Description>
	    		 		</Col>
							<Col span={22}>
	    		 			{this.tabs(detail.seller_state)}
							</Col>
							<Divider style={{ marginBottom: 32 }} />
	    		 			<Description term="提交时间">{detail != undefined ? detail.update_time:''}</Description>
	    		 			<Description term="申请人">{detail != undefined ? detail.true_name:''}</Description>
	    		 			<Description term="手机号">{detail != undefined ? detail.phone:''}</Description>
	    		 			<Description term="入驻渠道">{detail != undefined ?(detail.joinChannel == 1 ? '自主入驻':'用户推荐'):''}</Description>
	    		 			<Description term="用户ID">{detail != undefined ? detail.invitation_person:''}</Description>
	    		 			<Description term="用户名称">{detail != undefined ?detail.user_name:''}</Description>
    		 		</DescriptionList>
    		 	</Row>	
      	<Divider style={{ marginBottom: 32 }} />
			    <DescriptionList size="large" title="店铺信息" style={{ marginBottom: 32 }}>
          	<Description term="店铺名称">{detail != undefined ?detail.title:''}</Description>
          	<Description term="行业类型">{detail != undefined ?detail.tName:''}</Description>
          	<Description term="店铺区域">{detail != undefined ?detail.proviceName:''}{detail != undefined ?detail.cityName:''}{detail != undefined ?detail.areaName:''}</Description>
          	<Description term="详细地址">{detail != undefined ? (detail.address ? detail.address:'无'):'' }<span style={{
          		color:'#1890ff',
          		border:'1px solid #ededed',
          		borderRadius:'8px',
          		padding:'4px 8px',
          		marginLeft:'10px',
          		cursor:'pointer'
          		}} onClick={this.openmap}>查看定位</span></Description>
          	<Description term="店铺电话">{detail != undefined ? (detail.telephone ? detail.telephone :'无'):''}</Description>
        	</DescriptionList>
        	<div className={styles.cle}>
        		<label style={{float:'left'}}>
        			门脸照:
        		</label>
        		<ul className={styles.ul_img}>
        			<li>
        				<img src={detail != undefined ?detail.door_card:''} />
        			</li>
        		</ul>
        	</div>
        	<div className={styles.cle}>
        		<label style={{float:'left'}}>
        			环境照:
        		</label>
        		<ul className={styles.ul_img}>
        			{this.renderChild(detail !=undefined ? detail.environment_photo:undefined)}
        		</ul>
        	</div>
        	<Divider style={{ marginBottom: 32 }} />
        	<DescriptionList size="large" title="营业执照信息" style={{ marginBottom: 32 }}>
        		<Description term="店铺类型">{detail != undefined ?(detail.sellerType == 1 ? '个体工商户':'企业公司'):''}</Description>
          	<Description term="注册号">{detail != undefined ?detail.registered_number:''}</Description>
          	<Description term="有效期">{detail != undefined ?detail.term_of_valitdity_start:''}至{detail != undefined ?detail.term_of_valitdity_end:''}/{detail != undefined ?(detail.long_term_validity ? '长期有效':'短期有效'):''}</Description>
          	<Description term="字号名称">{detail != undefined ?detail.font_name:''}</Description>
        	</DescriptionList>
        	<div>
        		<label style={{float:'left'}}>
        			执照照片:
        		</label>
        		<ul className={styles.ul_img}>
        			<li>
        				<img src={detail != undefined ?detail.identity_card_photo_up:''} />
        			</li>
        		</ul>
        	</div>
					<Divider style={{ marginBottom: 32 }} />
        	<DescriptionList size="large" title="经营者/法人信息" style={{ marginBottom: 32 }}>
          	<Description term="身份证姓名">{detail != undefined ?detail.identity_card_name:''}</Description>
          	<Description term="身份证号码">{detail != undefined ?detail.identity_card_no:''}</Description>
        	</DescriptionList>
        	<div>
        		<label style={{float:'left'}}>
        			身份证正面照:
        		</label>
        		<ul className={styles.ul_img}>
        			<li>
        				<img src={detail != undefined ?detail.identity_card_photo_up:''} />
        			</li>
        		</ul>
        	</div>
        	<div style={{
        		marginLeft:'30px',
						float: 'left',
        	}}>
        		<label style={{float:'left',display:'block'}}>
        			身份证反面照:
        		</label>
        		<ul className={styles.ul_img}>
        			<li>
        				<img src={detail != undefined ?detail.identity_card_photo_low:''} />
        			</li>
        		</ul>
        	</div>
        	<Divider style={{ marginBottom: 32 }} />
        	<DescriptionList size="large" title="银行卡信息" style={{ marginBottom: 32 }}>
          	<Description term="账户类型">	{this.bankch(bank != undefined ? bank.account_number_type :'')}</Description>
          	<Description term="开户名">{bank != undefined ? bank.account_holder:''}</Description>
          	<Description term="银行卡号">{bank != undefined ? bank.account_number:''}</Description>
          	<Description term="开户行">{bank != undefined ? bank.bank_name :''}</Description>
          	<Description term="开户行地区">{ bank != undefined ? bank.proviceName:''}{bank!=undefined ? bank.cityName:''}{bank!=undefined?bank.areaName:''}</Description>
          	<Description term="开户行名称">{bank != undefined ? bank.open_bank_name:''}</Description>
        	</DescriptionList>
        	<Divider style={{ marginBottom: 32 }} />
        	<div>
        		<label style={{float:'left'}}>
        			其他证明:
        		</label>
        		<ul className={styles.ul_img}>
        			{this.other_proof(detail != undefined ?detail.other_proof:undefined)}
        		</ul>
        	</div>
        	<Divider style={{ marginBottom: 32 }} />
        	<Row gutter={24} style={{display:detail.seller_state == '2'? 'block':'none' }}>
        		<Col span={2}>
        			<span>拒绝理由:</span>
        		</Col>
        		<Col span={10}>
        			<span>
        				{detail != undefined ?detail.remark_:''}
        			</span>
        		</Col>
        	</Row>
        	<Row gutter={24} style={{display:detail.seller_state == '0'? 'block':'none' }}>
        		<Col span={1} offset={10}>
        			<Button type="primary" onClick={this.agree}>通过</Button>
        		</Col>
        		<Col span={1} offset={1}>
        		  <Button type="danger" ghost onClick={this.showModal}>拒绝</Button>
        		</Col>
        	</Row>
        	
	        <div className={styles.map_bj} style={{display:this.state.mapshow == 0? 'block':'none'}}>
	        	<Icon type="close-circle-o" onClick={this.close_map.bind(this)} />
	        	<div className={styles.map_content}>
							<Map 
		           	style={{height: '550px'}}
		            center={{lng:this.state.lon, lat:this.state.lat}} 
		            zoom='13' 
		        	>
							<Marker position={{lng: this.state.lon, lat:this.state.lat}} />
							<NavigationControl /> 
		        </Map>
	        	</div>
	        </div>
      	</Card>
      	 <Modal
          title="拒绝理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={24}>
        		<Col span={24}>
        			<TextArea placeholder="请填写拒绝理由" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.textchange} />
        		</Col>
        	</Row>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
