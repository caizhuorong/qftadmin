import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Icon,
  Button,
  message,
  Modal,
  Badge,
  Tabs,
  Divider,
  Cascader,
  DatePicker,
  Switch,
  Avatar
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import { Link,hashHistory } from 'dva/router';
import styles from './detail.less';
const {Description}= DescriptionList;
const { Option } = Select;
const { TextArea } = Input;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect(({ person, loading }) => ({
  person,
  loading: loading.models.person,
}))
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    visible:false,
    visible1:false,
    selectedRows: [],
    formValues: {},
    action_date:'',
    action_name:'',
    action_remake:'',
    remark:'',
    ssstate:true,
   	stor1:'asc',
   	start_time1:'',
   	end_time1:'',
   	type2:'',
 		stor2:'asc',
   	start_time2:'',
   	end_time2:'',
   	type3:'',
 		stor3:'asc',
   	start_time3:'',
   	end_time3:'',
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'person/selectDetailsById',
      payload:{
      	userId:this.props.location.state.id,
      	modelMap:''
      }
    });
    this.setState({
    	ssstate:this.props.person.state == '0'? false : true 
    });
    dispatch({
      type: 'person/selectHistoryById',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:'',
      	endTime:'',
      	sort:'asc',
      	modelMap:''
      }
    });

  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleOk1 = (e) => {
  	 const { dispatch } = this.props;
    this.setState({
      visible1: false,
    });
    
    dispatch({
      type: 'person/suspendedByID',
      payload:{
      	userId:this.props.location.state.id,
      	remark:this.state.remark
      }
    });

    if( this.props.person.state == '0' ){
    	this.setState({
      	ssstate:!this.state.ssstate
      })
    }else{
    	this.setState({
      	ssstate:this.state.ssstate
      })
    }
  }

  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
      remark:''
    });
   
  }
	changeswh(value){
		const { dispatch } = this.props;
		let stat = '';
		let _this = this;
		if( value ){
	    confirm({
			    title: '提示',
			    content: '确定要解除封停状态?',
			    onOk() {
			       dispatch({
				      type: 'person/relieveSuspendedByID',
				      payload:{
				      	userId:_this.props.location.state.id,
				      }
				    });
				    _this.setState({
			      	ssstate:value
			      })
			    },
			    onCancel() {
			      _this.setState({
			      	ssstate:!value
			      })
			    },
			  });
		}else{
 			this.setState({
	      visible1: true,
	    });
			  
		}
	}
	TextAreachange(values){
		this.setState({
			remark:values.target.value
		})
	}
	openly(){
		this.setState({
			visible:true
		})
	}
	callbacktab(v){
		const { dispatch } = this.props;
		if( v == 0 ){
			dispatch({
	      type: 'person/selectHistoryById',
	      payload:{
	      	userId:this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:this.state.start_time1,
		    	endTime:this.state.end_time1,
		    	sort:this.state.stor1,
	      	modelMap:''
	      }
	    });
		}else if( v == 1 ){
			dispatch({
	      type: 'person/selectWalletRecordDetails',
	      payload:{
	      	userId:this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:this.state.start_time2,
		    	endTime:this.state.end_time2,
		    	sort:this.state.stor2,
		    	type:this.state.type2,
	      	modelMap:''
	      }
	    });
		}else if( v == 2 ){
			dispatch({
	      type: 'person/selectUserOrdersById',
	      payload:{
	      	userId:this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:this.state.start_time3,
		    	endTime:this.state.end_time3,
		    	sort:this.state.stor3,
		    	state:this.state.type3,
	      	modelMap:''
	      }
	    });
		}else{
			
		}
	}
	onChangess(v){

		let _this = this;
		const { dispatch } = _this.props;
		_this.setState({
			start_time1:v[0].format('YYYY-MM-DD'),
			end_time1:v[1].format('YYYY-MM-DD')
		},()=>{
			dispatch({
	      type: 'person/selectHistoryById',
	      payload:{
	      	userId:_this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:v[0].format('YYYY-MM-DD'),
	      	endTime:v[1].format('YYYY-MM-DD'),
	      	sort:_this.state.stor1,
	      	modelMap:''
	      }
	    });
		})
	
	}
	onChangess2(v){

		let _this = this;
		const { dispatch } = _this.props;
		_this.setState({
			start_time2:v[0].format('YYYY-MM-DD'),
			end_time2:v[1].format('YYYY-MM-DD')
		},()=>{
			dispatch({
	      type: 'person/selectHistoryById',
	      payload:{
	      	userId:_this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:v[0].format('YYYY-MM-DD'),
	      	endTime:v[1].format('YYYY-MM-DD'),
	      	sort:_this.state.stor2,
	      	type:_this.state.type2,
	      	modelMap:''
	      }
	    });
		})
	
	}
	onChangess3(v){

		let _this = this;
		const { dispatch } = _this.props;
		_this.setState({
			start_time3:v[0].format('YYYY-MM-DD'),
			end_time3:v[1].format('YYYY-MM-DD')
		},()=>{
			dispatch({
	      type: 'person/selectUserOrdersById',
	      payload:{
	      	userId:_this.props.location.state.id,
	      	pageNumber:1,
	      	size:10,
	      	startTime:v[0].format('YYYY-MM-DD'),
	      	endTime:v[1].format('YYYY-MM-DD'),
	      	sort:_this.state.stor3,
	      	state:_this.state.type3,
	      	modelMap:''
	      }
	    });
		})
	
	}
	selchange1(v){
		const { dispatch } = this.props;
		this.setState({
			stor1:v
		})
		dispatch({
      type: 'person/selectHistoryById',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:this.state.start_time1,
      	endTime:this.state.end_time1,
      	sort:v,
      	modelMap:''
      }
   }); 
	}
	selchange2(v){
		const { dispatch } = this.props;
		this.setState({
			stor2:v
		})
		dispatch({
      type: 'person/selectWalletRecordDetails',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:this.state.start_time2,
      	endTime:this.state.end_time2,
      	sort:v,
      	modelMap:'',
      	type:this.state.type2,
      }
   }); 
	}
	selchanges2(v){
		const { dispatch } = this.props;
		this.setState({
			type2:v
		})
		dispatch({
      type: 'person/selectWalletRecordDetails',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:this.state.start_time2,
      	endTime:this.state.end_time2,
      	sort:this.state.stor2,
      	modelMap:'',
      	type:v
      }
   }); 
	}
	selchange3(v){
		const { dispatch } = this.props;
		this.setState({
			stor3:v
		})
		dispatch({
      type: 'person/selectUserOrdersById',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:this.state.start_time3,
      	endTime:this.state.end_time3,
      	sort:v,
      	modelMap:'',
      	state:this.state.type3,
      }
   }); 
	}
	
	selchanges3(v){
		const { dispatch } = this.props;
		this.setState({
			type3:v
		})
		dispatch({
      type: 'person/selectUserOrdersById',
      payload:{
      	userId:this.props.location.state.id,
      	pageNumber:1,
      	size:10,
      	startTime:this.state.start_time3,
      	endTime:this.state.end_time3,
      	sort:this.state.stor3,
      	modelMap:'',
      	state:v
      }
   }); 
	}
  handleStandardTableChange1 = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageNumber: pagination.current,
	    userId:this.props.location.state.id,
    	size:10,
    	startTime:this.state.start_time1,
    	endTime:this.state.end_time1,
    	sort:this.state.stor1,
    	modelMap:''
    };
    dispatch({
      type: 'person/selectHistoryById',
      payload: params,
    });
  };
  handleStandardTableChange2 = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageNumber: pagination.current,
	    userId:this.props.location.state.id,
    	size:10,
    	startTime:this.state.start_time2,
    	endTime:this.state.end_time2,
    	sort:this.state.stor2,
    	type:this.state.type2,
    	modelMap:''
    };
    dispatch({
      type: 'person/selectWalletRecordDetails',
      payload: params,
    });
  };
  handleStandardTableChange3 = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageNumber: pagination.current,
	    userId:this.props.location.state.id,
    	size:10,
    	startTime:this.state.start_time3,
    	endTime:this.state.end_time3,
    	sort:this.state.stor3,
    	state:this.state.type3,
    	modelMap:''
    };
    dispatch({
      type: 'person/selectUserOrdersById',
      payload: params,
    });
  };
	navGo(id){
  	let thats = this.props.that;
		this.props.history.push({
			pathname:'./order',
			state:{
				id:id
			}
		})
  }
  render() {
    const {
      person: { datas_detail ,data,tab1,tab2},
      loading,
    } = this.props;

    let data_qd = '';
    if( datas_detail != undefined ){
    	 switch (datas_detail.register_ditch){
	    	case '1':
	    		data_qd = '微信';
	    		break;
	  		case '2':
	  			data_qd="微信朋友圈";
	    		break;
	  		case '3':
	  			data_qd="QQ";
	    		break;
	  		case '4':
	    		data_qd="QQ空间";
	    		break;
	  		case '5':
	  			data_qd="其他";
	    		break;
	    	default:
	    		break;
	    }
    }

		
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '登录时间',
        dataIndex: 'create_time',
      },
      {
        title: '地理位置',

         render: (text,record,index) => {
					return record.proviceName + record.cityName + record.areaName
        },
      },
      {
        title: 'IP地址',

       	render: (text,record,index) => {
					if( record.describe != undefined ){
						let data = JSON.parse(JSON.stringify(record.describe));

						return data.ip
					}else{
						return ''
					}
					
        },
      },
      {
        title: 'APP版本',
        render: (text,record,index) => {
        	if( record.describe != undefined ){
        		let data = JSON.parse(JSON.stringify(record.describe));
						return data.appVersion
        	}else{
        		return '';
        	}
					
        },
      }
     
    ];
    const columns2 = [
      {
        title: '时间',
        dataIndex: 'create_time',
      },
      {
        title: '状态',
         render: (text,record,index) => {
         	if( record.type_ != undefined ){
         			if( record.type_ == 'false' ){
		         		return '收入'
		         	}else{
		         		return '支出'
		         	}
         	}
        },
      },
      {
        title: '变动项目',
        dataIndex: 'title',
      },
      {
        title: '详情内容',
        render: (text,record,index) => {//false 收入 turn 支出
        	if( record.type_ != undefined ){
        		if( record.type_ == 'false' ){
							return '+'+record.token
						}else{
							return '-'+record.token
						}
        	}
        },
      }
    ];
    const columns3 = [
      {
        title: '时间',
        dataIndex: 'create_time',
      },
      {
        title: '商户名称',
       dataIndex: 'title',
      },
      {
        title: '地区',
       	render:(text,record,index) => {
       		if( record.proviceName != undefined ){
       			 return record.proviceName + record.cityName + record.areaName;
       		}
       	 
       	}
      },
      {
        title: '状态',
       	render:(text,record,index) => {
       		let texts = '';
       		if( record.order_status != undefined ){
       			switch (record.order_status){
	       			case '0':
	       				texts = '待支付';
	       				break;
	       			case '1':
	       				texts = '待使用';
	       				break;
	       			case '2':
	       				texts = '已使用';
	       				break;
	       			case '3':
	     					texts = '退款中';
	       				break;
	     				case '4':
	     					texts = '已退款';
	       				break;	
	       			default:
	       				texts = '过期';
	       				break;
	       		}
       		}
       		
       		return texts;
					
        },
       
      },
       {
        title: '订单编号',
        dataIndex: 'order_no',
      },
       {
        title: '操作',
				render:(text,record,index) => {
					return  (
	        	<Fragment>
            	<a onClick={()=>this.navGo(record.id_)}>详情</a>
          	</Fragment>
        	);
        },
      }
    ];



//  const parentMethods = {
//    handleAdd: this.handleAdd,
//    handleModalVisible: this.handleModalVisible,
//  };
    return (
      <PageHeaderLayout title="用户详情">
      	<Card bordered={false}>
      		<div>
      			<h3>用户详情<span style={{display:this.state.ssstate? 'none':'inline-block'}} className={styles.spans} onClick={this.openly.bind(this)}>封停理由</span><span className={styles.wisbtn}>状态&nbsp;&nbsp;&nbsp;&nbsp;<Switch checkedChildren="正常" unCheckedChildren="封停" checked={this.state.ssstate} onChange={this.changeswh.bind(this)}   /></span></h3>
      			<Row gutter={24}>
      				<Col span={24}>
      					<DescriptionList size="large" title="">
      						<Description term="用户头像" style={{height:'40px'}}><Avatar src={ datas_detail != undefined ? datas_detail.head_img :''} /></Description>
				        	<Description term="注册时间" style={{height:'40px'}}>{datas_detail != undefined ? datas_detail.create_time:''}</Description>
				        	<Description term="用户ID" style={{height:'40px'}}>{datas_detail != undefined?datas_detail.id_:''}</Description>
				        	<Description term="用户名称">{datas_detail != undefined?datas_detail.nick_name:''}</Description>
				        	<Description term="BPCC总量">{datas_detail != undefined?datas_detail.balance:''}</Description>
				        	<Description term="最近一次登录">{datas_detail != undefined?datas_detail.last_login_time:''}</Description>
				        	<Description term="注册渠道">{datas_detail != undefined?data_qd:''}</Description>
				        	<Description term="性别">{datas_detail != undefined?datas_detail.sex:''}</Description>
				        	<Description term="生日">{datas_detail != undefined?datas_detail.birthday:''}</Description>
				        	<Description term="地区">{datas_detail != undefined?datas_detail.province:''}{datas_detail != undefined?datas_detail.city:''}{datas_detail != undefined?datas_detail.area:''}</Description>
				      	</DescriptionList>
      				</Col>
      			</Row>
      		</div>
      		<Tabs defaultActiveKey="0" onChange={this.callbacktab.bind(this)}>
				    <TabPane tab="登录历史" key={0}>
				    	<Row gutter={24}>
				    		<Col span={1}>
				    			<span>排序:</span>
				    		</Col>
				    		<Col span={8}>
				    			<Select defaultValue="asc" style={{width:'80%'}} onChange={this.selchange1.bind(this)}>
							      <Option value="desc">倒序</Option>
							      <Option value="asc">正序</Option>
							    </Select>
				    		</Col>
				    		<Col span={1}>
				    			<span>日期:</span>
				    		</Col>
				    		<Col span={8}>
				    			<RangePicker onChange={this.onChangess.bind(this)} />
				    		</Col>
				    		<Col span={24} style={{marginTop:'30px'}}>
				    			<StandardTable
			              selectedRows={selectedRows}
			              loading={loading}
			              data={data}
			              columns={columns}
			              onSelectRow={this.handleSelectRows}
			              onChange={this.handleStandardTableChange1}
			            />
				    		</Col>
				    	</Row>
				    </TabPane>
				    <TabPane tab="BPCC信息" key={1}>
				    	<Row gutter={24}>
				    		<Col span={1}>
				    			<span>排序:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Select defaultValue="asc" style={{width:'80%'}} onChange={this.selchange2.bind(this)}>
							      <Option value="desc">倒序</Option>
							      <Option value="asc">正序</Option>
							    </Select>
				    		</Col>
				    		<Col span={1}>
				    			<span>记录:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Select defaultValue="" style={{width:'80%'}} onChange={this.selchanges2.bind(this)}>
							      <Option value=''>全部</Option>
							      <Option value={0}>收入</Option>
							      <Option value={1}>支出</Option>
							    </Select>
				    		</Col>
				    		<Col span={1}>
				    			<span>日期:</span>
				    		</Col>
				    		<Col span={7}>
				    			<RangePicker onChange={this.onChangess2.bind(this)} />
				    		</Col>
				    		<Col span={24} style={{marginTop:'30px'}}>
				    			<StandardTable
			              selectedRows={selectedRows}
			              loading={loading}
			              data={tab1 != undefined ? tab1:''}
			              columns={columns2}
			              onSelectRow={this.handleSelectRows}
			              onChange={this.handleStandardTableChange2}
			            />
				    		</Col>
				    	</Row>
			    	</TabPane>
				    <TabPane tab="订单信息" key={2}>
				    	<Row gutter={24}>
				    		<Col span={1}>
				    			<span>排序:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Select defaultValue="asc" style={{width:'80%'}} onChange={this.selchange3.bind(this)}>
							      <Option value="desc">倒序</Option>
							      <Option value="asc">正序</Option>
							    </Select>
				    		</Col>
				    		<Col span={1}>
				    			<span>状态:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Select defaultValue="" style={{width:'80%'}} onChange={this.selchanges3.bind(this)}>
							      <Option value=''>全部</Option>
							      <Option value={0}>待支付</Option>
							      <Option value={1}>待使用</Option>
							      <Option value={1}>已使用</Option>
							      <Option value={1}>退款中</Option>
							      <Option value={1}>已退款</Option>
							      <Option value={1}>过期</Option>
							    </Select>
				    		</Col>
				    		<Col span={1}>
				    			<span>日期:</span>
				    		</Col>
				    		<Col span={7}>
				    			<RangePicker onChange={this.onChangess3.bind(this)} />
				    		</Col>
				    		<Col span={24} style={{marginTop:'30px'}}>
				    			<StandardTable
			              selectedRows={selectedRows}
			              loading={loading}
			              data={tab2 != undefined ? tab2:''}
			              columns={columns3}
			              onSelectRow={this.handleSelectRows}
			              onChange={this.handleStandardTableChange3}
			            />
				    		</Col>
				    	</Row>
				    </TabPane>
				    <TabPane tab="认证信息" key={3}>Content of Tab Pane 3</TabPane>
				  </Tabs>
      	</Card>
      	<div style={{height:'30px'}}></div>
        <Modal
          title="封停理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        	<Row gutter={24}>
        		<Col span={5}>
        			<span>封停理由:</span>
        		</Col>
        		<Col span={19}>
        			<span>
        			{datas_detail == null ? '': datas_detail.discardedRemark }
        			</span>
        		</Col>
        		<Col span={5}>
        			<span>封停时间</span>
        		</Col>
        		<Col span={19}>
        			<span>{datas_detail != undefined ? datas_detail.discardedTime :''}</span>
        		</Col>
        		<Col span={5}>
        			<span>操作人:</span>
        		</Col>
        		<Col span={19}>
        			<span>{datas_detail != undefined ? datas_detail.adminName :''}</span>
        		</Col>
        	</Row>
        </Modal>
         <Modal
          title="封停账户"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
        	<Row gutter={24}>
        		<Col span={20} offset={2}>
        			<TextArea rows={4} autosize={false} placeholder="请输入封停理由,最多200字" onChange={this.TextAreachange.bind(this)} />
        		</Col>
        	</Row>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
