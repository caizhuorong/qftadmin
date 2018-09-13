import React, { Component } from 'react';
import { connect } from 'dva';
import { 
	Card, 
	Badge, 
	Table, 
	Divider,
	Row,
	Col,
	Tabs,
	Input ,
	Button ,
	DatePicker, 
	Switch,
	Form,
	Icon,
	Cascader,
	Select,
	TimePicker,
	Upload, 
	Modal
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import moment from 'moment';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import styles from './ListDetail.less';
import business_on from '../../assets/business_on.png';
import order_on from '../../assets/order_on.png';
import park_on from '../../assets/park_on.png';
import train_on from '../../assets/train_on.png';
import wifi_on from '../../assets/wifi_on.png';
import {apidd} from '../../services/api.js';
const Option = Select.Option;
const { Description } = DescriptionList;
const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const icon_label = ['business_world','appointment','stop_car','subway','wifi']
@connect(({ merchant, loading }) => ({
  merchant,
  loading: loading.effects.merchant,
}))
@Form.create()
export default class BasicProfile extends Component {
	constructor(props) {
    super(props);
    this.state={
    	lat:0,
    	lon:0,
    	mapshow:1,
    	tab_index:1,
    	mapshow1:1,
    	jcxx:1,
    	lat1:0,
    	lon1:0,
    	cityname:'',
    	icon_color:['#999','#999','#999','#999','#999'],
    	fjxx:1,
    	tpxx:1,
    	fileList:[],
    	fileList1:[],
    	previewVisible:false,
    	previewImage:'',
    	previewVisible1:false,
    	previewImage1:''
    	
    }
    this.callback = this.callback.bind(this);
	}

  componentWillMount() {
  	const _this = this;
    const { dispatch } = _this.props;
    dispatch({
      type: 'merchant/detail',
			payload:{
				sellerId:_this.props.location.state.id,
				modelMap:''
			},
			callback(data){
				_this.setState({
					lat:data.lat,
					lon:data.lon,
					lat1:data.lat,
					lon1:data.lon,
					cityname:data.proviceName+data.cityName+data.areaName
				})
			}
    });
    dispatch({
      type: 'merchant/bankcar',
			payload:{
				userId:_this.props.location.state.id,
			}
    });
    dispatch({
	    type: 'merchant/fl',
	  });
  }
	inputvalue = (e) => {
		let _this = this;
		const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

    }
		var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(_this.state.cityname+e.target.value, function(point){
			console.log(point);
			if (point) {
				_this.setState({
					lon1:point.lng,
					lat1:point.lat
				})
			}else{

			}
		});
	}
	openmap = () => {
		this.setState({
			mapshow:0,
		})
	}
	openmap1 = () => {
		let _this = this;
		var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(_this.state.cityname+_this.props.merchant.sellerStoreDetails.address, function(point){
			console.log(point);
			if (point) {
				_this.setState({
					lon1:point.lng,
					lat1:point.lat
				})
			}else{

			}
		});
		this.setState({
			mapshow1:0,
		})
	}
	close_map(){
		this.setState({
			mapshow:1
		})
	}
	close_map1(){
		this.setState({
			mapshow1:1
		})
	}
	getEvents1 = () =>{

  }
	loadData = (selectedOptions) => {
		const {dispatch} = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
		if( selectedOptions.length == 2 ){
			
			dispatch({
	      type: 'merchant/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption,
	        no:true
	      },
	    });
		}else{
			
			dispatch({
	      type: 'merchant/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption
	      },
	    });
		}
};
	onChangedate(){
		
	}
	callback=(v)=>{
		const _this = this;
		const { dispatch } = _this.props;
		_this.setState({
			type_index:v
		});
		if(v == 2){
			dispatch({
	      type: 'merchant/city',
	      payload: {
	        pId:'ZHCN',
	        modelMap:'',
	        optionss:[],
	      },
	      callback(datas){
  			  dispatch({
				  	type:'merchant/sellerStoreDetails',
				  	payload:{
				  		sellerId:_this.props.location.state.id,
				  		modelMap:''
				  	},
				  	callback(data){
				  		let dat_a = {
				  			label:data.proviceName,
				  			value:data.province,
				  			children:[]
				  		}
							let data_icon = JSON.parse(data.label);
							let s = ['#bebebf','#bebebf','#bebebf','#bebebf','#bebebf'];
							data_icon.forEach(function(x,y){
								icon_label.forEach(function(j,h){
									if( x == j ){
										s[h] = '#333';
									}
								})
							});
							let se = JSON.parse(data.environment_photo);
							let ses=[];
							se.forEach(function(x,y){
								ses.push({
									url:x,
									uid: y,
						      name: 'xxx.png',
						      status: 'done',
								})
							})
							_this.setState({
								icon_color:s,
								fileList:[{
									url:data.door_card,
									uid: -1,
						      name: 'xxx.png',
						      status: 'done',
								}],
								fileList1:ses
							})
				  		dispatch({
					      type: 'merchant/city',
					      payload: {
					        pId:parseInt(data.province),
					        modelMap:'',
					        targetOption:dat_a,
					      },
					      callback(res){
					      	let dat_as = {
					  				label:data.cityName,
					  				value:data.city,
					  				children:[],
						  		};
					      	dispatch({
							      type: 'merchant/city',
							      payload: {
							        pId:parseInt(data.city),
							        modelMap:'',
							        targetOption:dat_as,
					  					no:true,
											ss:res,
											pIds:parseInt(data.province)
							      }
							    });
					      }
					    });
				  	}
				  });
	      }
	    });
	    dispatch({
		    type: 'merchant/fl',
		  });
		}else{
			dispatch({
	      type: 'merchant/detail',
				payload:{
					sellerId:_this.props.location.state.id,
					modelMap:''
				},
				callback(data){
					_this.setState({
						lat:data.lat,
						lon:data.lon,
						lat1:data.lat,
						lon1:data.lon,
						cityname:data.proviceName+data.cityName+data.areaName
					})
				}
	    });
	    dispatch({
	      type: 'merchant/bankcar',
				payload:{
					userId:_this.props.location.state.id,
				}
	    });
		}
	}
  handleCancel = () => {
  	this.setState({ previewVisible: false })
	};
  handleCancel1 = () => {
  	this.setState({ previewVisible1: false })
	};
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
      type: 'merchant/switchs',
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
  renderChilds =(d) => {
		let children = [];
		if(d != undefined && d != NaN ){
			d.forEach(function(x,y){
				children.push(<Option value={x.id} key={y+1}>{x.title}</Option>);
			})
		}
		return children;
		
	}
  handleSubmit = e => {
  	const _this = this;
    e.preventDefault();
    const { form, dispatch } = _this.props;
    if( _this.state.jcxx == 1 ){
    	_this.setState({
    		jcxx:!_this.state.jcxx
    	})
    }else{
	    form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        let data={
	        	address:values.address,
	        	province:values.city[0],
	        	city:values.city[1],
	        	area:values.city[2],
	        	categoryId:values.category_id,
	        	title:values.title,
	        	averageConsumption:values.average_consumption,
	        	closeTime:'1970-01-01 '+moment(values.close_time).format('HH:mm:ss'),
	        	openTime:'1970-01-01 '+moment(values.open_time).format('HH:mm:ss'),
	        	telephone:values.telephone,
	        	id:_this.props.location.state.id,
	        	lon:_this.state.lon1,
	        	lat:_this.state.lat1
	        };
	        dispatch({
	        	type:'merchant/editBasicBySellerNo',
	        	payload:data,
	        	callback(){
	        		_this.setState({
	        			jcxx:!_this.state.jcxx
	        		})
	        	}
	        })

	      }
	    });
    }
  };
  changefjxx =() =>{
  	const　_this = this;
  	const {dispatch} = _this.props;
  	let data = [];
  	let datas = [];
  	if( _this.state.fjxx != 1 ){
  		_this.state.icon_color.forEach(function(x,y){
  			if( x == '#00FF00' ){
  				datas.push(icon_label[y]);
  			}
  		});
  		dispatch({
  			type:'merchant/editInformation',
  			payload:{
  				sellerId:_this.props.location.state.id,
  				label:JSON.stringify(datas),
  				modelMap:''
  			},
  			callback(data){
  				if( data == 200 ){
  					let data = [];
  					console.log(_this.state.icon_color);
  					_this.state.icon_color.forEach(function(x,y){
  						console.log(x,y)
							if( x == '#00FF00' ){
								data[y] = '#333';
							}else{
								data[y] = '#bebebf';
							}
						});
						_this.setState({
							icon_color:data,
							fjxx:1
						})
  				}
  				
  			}
  		})
  	}else{
			_this.state.icon_color.forEach(function(x,y){
				if( x == '#bebebf' ){
					data[y] = '#DC143C';
				}else{
					data[y] = '#00FF00';
				}
			});
			_this.setState({
				icon_color:data,
				fjxx:0
			})
  	}
  }
  changetpxx =() =>{
  	const　_this = this;
  	const {dispatch} = _this.props;
 		let data = [];
  	if( _this.state.tpxx != 1 ){
  		console.log(this.state);
  		this.state.fileList1.forEach(function(x,y){
  			if( x.response != undefined ){
  				data.push(x.response.data);
  			}else{
  				data.push(x.url)
  			}
  		})
		dispatch({
			type:'merchant/editPhoto',
			payload:{
				id:_this.props.location.state.id,
				doorCard:this.state.fileList[0].response == undefined ?   this.state.fileList[0].url : this.state.fileList[0].response.data,
				environmentPhoto:data,
				modelMap:''
			},
			callback(data){
				if( data == 200 ){
					_this.setState({
						tpxx:1
					})
				}
				
			}
		})
  	}else{
			_this.setState({
				
				tpxx:0
			})
  	}
  }
  changcolor = (e) => {
  	let _this = this;
  	let data = _this.state.icon_color;
  	const {dispatch} = _this.props;
  	if( _this.state.fjxx != 1 ){
  		if( data[e] == '#DC143C' ){
  			data[e] = '#00FF00';
  		}else{
  			data[e] = '#DC143C';
  		};
  		_this.setState({
  			icon_color:data
  		})
  	}
  }
  Positive_handlePreview= (file) =>{
  	this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  Positive_handleChange = ({ fileList,event }) => {

		if( this.state.tpxx != 1 ){
			this.setState({
				fileList:[...fileList]
			})
		}
	}
  Positive_handlePreview1= (file) =>{
  	this.setState({
      previewImage1: file.url || file.thumbUrl,
      previewVisible1: true,
    });
	}
  Positive_handleChange1 = ({ fileList,event }) => {
		if( this.state.tpxx != 1 ){
			this.setState({
				fileList1:[...fileList]
			})
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
    const { merchant:{detail,bank,optionss,sellerStoreDetails,fl}, loading ,loadings,} = this.props;
    const { submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { jcxx,fjxx,tpxx,fileList,previewVisible,previewImage,fileList1,previewVisible1,previewImage1 } = this.state;
    let goodsData = [];
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
		let opentime = sellerStoreDetails.open_time;
		let closetime = sellerStoreDetails.close_time;
		const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderLayout title="商家详情">
    		<Card bordered={false}>
    		 	<Tabs defaultActiveKey="1" onChange={this.callback}>
        		<TabPane tab="入驻信息" key="1">
		    		 	<Row gutter={24}>
		    		 		<DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
			    		 		<Col span={2}>
			    		 			<Description term="店铺状态"></Description>
			    		 		</Col>
									<Col span={22}>
			    		 			<Switch checkedChildren="营业中" unCheckedChildren="封停" loading={loadings} defaultChecked={ detail != undefined ? (detail.seller_state == '1'):true } onChange={this.switchchange}/>
									</Col>
									<Divider style={{ marginBottom: 32 }} />
			    		 			<Description term="入驻时间">{detail != undefined ? detail.residence_time:''}</Description>
			    		 			<Description term="店铺ID">{detail != undefined ? detail.seller_no:''}</Description>
			    		 			<Description term="审核人">{detail != undefined ? detail.checkName:''}</Description>
			    		 			<Description term="入驻渠道">{detail != undefined ?(detail.joinChannel == 1 ? '自主入驻':'用户推荐'):''}</Description>
			    		 			<Description term="用户ID">{detail != undefined ? detail.invitation_person:''}</Description>
			    		 			<Description term="用户名称">{detail != undefined ?detail.true_name:''}</Description>
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
		        </TabPane>
		      	<TabPane tab="门店信息" key="2">
		      		<Row gutter={24}>
		    		 		<DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
			    		 		<Col span={2}>
			    		 			<Description term="店铺状态"></Description>
			    		 		</Col>
									<Col span={22}>
			    		 			<Switch checkedChildren="营业中" unCheckedChildren="封停" loading={loadings} defaultChecked={ detail != undefined ? (detail.seller_state == '1'):true } onChange={this.switchchange}/>
									</Col>
									<Divider style={{ marginBottom: 32 }} />
			    		 			<Description term="入驻时间">{detail != undefined ? detail.residence_time:''}</Description>
			    		 			<Description term="店铺ID">{detail != undefined ? detail.seller_no:''}</Description>
			    		 			<Description term="审核人">{detail != undefined ? detail.checkName:''}</Description>
			    		 			<Description term="入驻渠道">{detail != undefined ?(detail.joinChannel == 1 ? '自主入驻':'用户推荐'):''}</Description>
			    		 			<Description term="用户ID">{detail != undefined ? detail.invitation_person:''}</Description>
			    		 			<Description term="用户名称">{detail != undefined ?detail.true_name:''}</Description>
		    		 		</DescriptionList>
		    		 		<Divider style={{ marginBottom: 32 }} />
    		 				<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}  encType='multipart/form-data'  >
			          	<Row gutter={24}>
			          		<Col span={2}>
			          			<h3>基础信息</h3>
			          		</Col>
			          		<Col span={21}>
			          			 <Button type="primary" size="small" loading={loading} htmlType="submit" >{jcxx == 1 ? '编辑':'保存'}</Button>
			          		</Col>
			          		<div style={{width:'100%',height:'2px',clear:'both'}}></div>
			          		<Col span={8}>
			          			<FormItem {...formItemLayout} label="店铺名称">
					              {getFieldDecorator('title', {
					                initialValue:sellerStoreDetails.title,
					                rules: [
		                  			{
		                    			required: true,
		                    			message: '请输入店铺名称',
		                  			},
		                			],
					              })(<Input placeholder="请输入店铺名称" disabled={jcxx == 1 ? true:false} />)}
					            </FormItem>
			          		</Col>
					          <Col span={8}>
			          			 <FormItem {...formItemLayout} label="店铺区域">
					              {getFieldDecorator('city', {
					               rules: [
		                  			{
		                    			required: true,
		                    			message: '请选择店铺区域',
		                  			},
		                			],
		                			initialValue:[sellerStoreDetails.province,sellerStoreDetails.city,sellerStoreDetails.area],
					              })(<Cascader disabled={jcxx == 1 ? true:false} changeOnSelect loadData={this.loadData} options={optionss} onChange={this.onChanges} placeholder="请选择地区" />)}
					            </FormItem>
					          </Col>
					          <Col span={8}>
			          			<FormItem {...formItemLayout} label="详情地址">
			          			<Row gutter={8}>
			          			 	<Col span={18}>
				          			 	{getFieldDecorator('address', {
						                rules: [
			                  			{
			                    			required: true,
			                    			message: '请输入详情地址',
			                  			},
			                			],
			                			initialValue:sellerStoreDetails.address,
						              })(<Input placeholder="请输入详情地址" onChange={this.inputvalue} disabled={jcxx == 1 ? true:false}/>)}
			          			 	</Col>
			          			 	<Col span={6}>
			          			 		<Button onClick={this.openmap1} disabled={jcxx == 1 ? true:false}>定位地址</Button>
			          			 	</Col>
			          			</Row>
					              
					            </FormItem>
					          </Col>
					          <Col span={8}>
			          			 <FormItem {...formItemLayout} label="行业分类">
					              {getFieldDecorator('category_id', {
					               rules: [
		                  			{
		                    			required: true,
		                    			message: '请选择行业分类',
		                  			},
		                			],
		                			initialValue:sellerStoreDetails.category_id,
					              })(
					              	<Select placeholder="请选择行业分类" disabled={jcxx == 1 ? true:false} >
				                		<Option value='' key='0'>全部</Option>
				                 		{this.renderChilds(fl)}
					                </Select>
					              )}
					            </FormItem>
					          </Col>
					          <Col span={8}>
			          			 <FormItem {...formItemLayout} label="人均消费">
					              {getFieldDecorator('average_consumption', {
					                rules: [
		                  			{
		                    			required: true,
		                    			message: '请输入人均消费',
		                  			},
		                			],
		                			initialValue:sellerStoreDetails.average_consumption,
					              })(<Input placeholder="请输入人均消费" addonAfter="元/人" disabled={jcxx == 1 ? true:false} />)}
					            </FormItem>
					          </Col>
					          <Col span={8}>
			          			 <FormItem {...formItemLayout} label="开门时间">
					              {getFieldDecorator('open_time', {
					                rules: [
		                  			{
		                    			required: true,
		                    			message: '请选择开门时间',
		                  			},
		                			],
		                			initialValue:opentime != undefined ? moment(opentime.substring(11,19),'HH:mm:ss'):moment('00:00:00','HH:mm:ss'),
					              })( <TimePicker  placeholder="请选择开门时间"  disabled={jcxx == 1 ? true:false}/>)}
					            </FormItem>
					          </Col>
					           <Col span={8}>
			          			 <FormItem {...formItemLayout} label="打烊时间">
					              {getFieldDecorator('close_time', {
					                rules: [
		                  			{
		                    			required: true,
		                    			message: '请选择打烊时间',
		                  			},
		                			],
		                			initialValue:closetime != undefined ? moment(closetime.substring(11,19),'HH:mm:ss'):moment('00:00:00','HH:mm:ss'),
					              })(<TimePicker placeholder="请选择打烊时间" disabled={jcxx == 1 ? true:false} />)}
					            </FormItem>
					          </Col>
					          <Col span={8}>
			          			 <FormItem {...formItemLayout} label="店铺电话">
					              {getFieldDecorator('telephone', {
					               rules: [
		                  			{
		                    			required: true,
		                    			message: '请输入店铺电话',
		                  			},
		                			],
		                			initialValue:sellerStoreDetails.telephone,
					              })(<Input placeholder="请输入店铺电话" disabled={jcxx == 1 ? true:false}  />)}
					            </FormItem>
					          </Col>
					        </Row>  
		            </Form>
		    		 	</Row>	
		    		 	<Divider style={{ marginBottom: 32 }} />
		    		 	<Row gutter={24}>
		    		 		<Col span={2}>
	          			<h3>附加信息</h3>
	          		</Col>
	          		<Col span={21}>
	          			 <Button type="primary" size="small" loading={loading} onClick={this.changefjxx}>{fjxx == 1 ? '编辑':'保存'}</Button>
	          		</Col>
	          		<Col span={22} offset={1}>
          				<Row gutter={24}>
          					<Col span={3} >
	          					<div >
	          						<img src={business_on} className={styles.icon_img} onClick={()=>{this.changcolor(0)}}/>
          							<Icon type="check-circle-o" className={styles.icon_s} style={{color:this.state.icon_color[0]}} onClick={()=>{this.changcolor(0)}} />
          						</div>
          					</Col>
          					<Col span={3}>
          						<div >
          							<img src={order_on} className={styles.icon_img} onClick={()=>{this.changcolor(1)}} />
          							<Icon type="check-circle-o" className={styles.icon_s} style={{color:this.state.icon_color[1]}} onClick={()=>{this.changcolor(1)}} />
          						</div>
          					</Col>
          					<Col span={3}>
          						<div >
          							<img src={park_on} className={styles.icon_img} onClick={()=>{this.changcolor(2)}} />
          							<Icon type="check-circle-o" className={styles.icon_s} style={{color:this.state.icon_color[2]}} onClick={()=>{this.changcolor(2)}} />
          						</div>
          					</Col>
          					<Col span={3}>
          						<div >
          							<img src={train_on} className={styles.icon_img} onClick={()=>{this.changcolor(3)}} />
          							<Icon type="check-circle-o" className={styles.icon_s} style={{color:this.state.icon_color[3]}} onClick={()=>{this.changcolor(3)}} />
          						</div>
          					</Col>
          					<Col span={3}>
          						<div >
          							<img src={wifi_on} className={styles.icon_img} onClick={()=>{this.changcolor(4)}} />
          							<Icon type="check-circle-o" className={styles.icon_s} style={{color:this.state.icon_color[4]}} onClick={()=>{this.changcolor(4)}} />
          						</div>
          					</Col>
									</Row>
	          		</Col>
		    		 	</Row>
		    		 	<Divider style={{ marginBottom: 32 }} />
		    		 	<Row gutter={24}>
		    		 		<Col span={2}>
	          			<h3>图片 信息</h3>
	          		</Col>
	          		<Col span={22}>
	          			 <Button type="primary" size="small" loading={loading} onClick={this.changetpxx}>{tpxx == 1 ? '编辑':'保存'}</Button>
	          		</Col>
	          		<div style={{ marginBottom: 32,clear:'both' }} ></div>
	          		<Col span={2}>
	          			<h4>门脸照</h4>
	          		</Col>
	          		<Col span={21}>
	          			 <div className="clearfix">
						        <Upload
						          action={apidd}
						          listType="picture-card"
						          fileList={fileList}
						          onPreview={this.Positive_handlePreview}
						          onChange={this.Positive_handleChange}
						          disabled={tpxx == 1 ? true:false}
						        >
						          {fileList.length >= 1 ? null : uploadButton}
						        </Upload>
						        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
						          <img alt="example" style={{ width: '100%' }} src={previewImage} />
						        </Modal>
						      </div>	
	          		</Col>
	          		<Col span={2}>
	          			<h4>环境照</h4>
	          		</Col>
	          		<Col span={21}>
	          			 <div className="clearfix">
						        <Upload
						          action={apidd}
						          listType="picture-card"
						          fileList={fileList1}
						          onPreview={this.Positive_handlePreview1}
						          onChange={this.Positive_handleChange1}
						          disabled={tpxx == 1 ? true:false}
						        >
						          {fileList1.length >= 10 ? null : uploadButton}
						        </Upload>
						        <Modal visible={previewVisible1} footer={null} onCancel={this.handleCancel1}>
						          <img alt="example" style={{ width: '100%' }} src={previewImage1} />
						        </Modal>
						      </div>	
	          		</Col>
		    		 	</Row>
		      	</TabPane>
	      	</Tabs> 
	      	<div className={styles.map_bj} style={{display:this.state.mapshow1 == 0? 'block':'none'}}>
	        	<Icon type="close-circle-o" onClick={this.close_map1.bind(this)} />
	        	<div className={styles.map_content}>
	        		<Map events={this.getEvents1()} style={{height: '550px'}}  center={{lng: this.state.lon1, lat: this.state.lat1}} zoom="12">
						    <Marker position={{lng: this.state.lon1, lat:this.state.lat1}} />
						    <NavigationControl /> 
							</Map>
	        	</div>
	        </div>
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
      </PageHeaderLayout>
    );
  }
}
//<Map events={this.getEvents()} style={{height: '550px'}}  center={{lng: this.state.lon, lat: this.state.lat}} zoom="12">
//						    <Marker position={{lng: this.state.lon, lat:this.state.lat}} />
//						    <NavigationControl /> 
//							</Map>