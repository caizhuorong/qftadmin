import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Cascader,
  Tabs,
  Table
} from 'antd';

import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart
} from 'components/Charts';
import numeral from 'numeral';
import DescriptionList from 'components/DescriptionList';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import {getTimeDistance} from '../../utils/utils';
import styles from './Friends.less';
const { Description } = DescriptionList;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;	
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY-MM-DD';
const CreateForm = Form.create()(props => {
const { modalVisible, form, handleAdd, handleModalVisible ,top,dis} = props;
const {dispatch} = dis;
const okHandle = () => {
  form.validateFields((err, fieldsValue) => {
    if (err) return;
    form.resetFields();
    handleAdd(fieldsValue);
    
  });
};
  return (
    <Modal
      title="活动配置"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="活动状态">
        {form.getFieldDecorator('activate', {
          rules: [{ required: true, message: '请选择活动状态' }],
          initialValue:top.activate
        })(
        	<Select style={{ width:'100%' }} >
			      <Option value='true' >开启活动</Option>
			      <Option value='false' >终止活动</Option>
			    </Select>
    		)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="参与条件">
        {form.getFieldDecorator('descs', {
          rules: [{ required: true, message: '请选择参与条件' }],
          initialValue:0
        })(
        	<Select style={{ width:'100%' }}  disabled >
			      <Option value={0}>新注册用户</Option>
			      <Option value={1}>所有用户</Option>
			    </Select>	
      	)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="单次领取数量">
        {form.getFieldDecorator('token', {
          rules: [{ required: true, message: '请输入单次领取数量' }],
					 initialValue:top.token
        })(<Input placeholder="请输入单次领取数量" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="奖励类别">
        {form.getFieldDecorator('descsss', {
          rules: [{ required: true, message: '请选择奖励类别' }],
          initialValue:'BPCC'
        })(<Input placeholder="请输入"  disabled/>)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="可领取次数">
        {form.getFieldDecorator('descssss', {
          rules: [{ required: true, message: '请输入可领取次数' }],
          initialValue:1
        })(<Input placeholder="请输入"  disabled/>)}
      </FormItem>
    </Modal>
  );
});

@connect(({ newman, loading }) => ({
newman,
loading: loading.models.newman,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    pageNumber:1,
    sellerState:'',
    title:'',
    datepick:'day',
    starttime:'',
    endtime:'',
    week:'',
    month:'',
    cyrs:'0',
    qd:'0',
    man_num:0,
    cr_qd:0,
    value:'hour',
    type:1
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'newman/list',
      payload:{
		  	size:10,
		  	pageNumber:1,
		  	taskId:1
      }
    });
    dispatch({
      type: 'newman/top',
      payload:{
		  	id:1
      }
    });
    dispatch({
      type: 'newman/top_toal',
      payload:{
		  	taskId:1
      }
    });
  }
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
	
  handleAdd = fields => {
    const { dispatch } = this.props;
 		dispatch({
      type: 'newman/editTask',
      payload:{
		  	id:1,
		  	activate:fields.activate,
		  	token:fields.token
      },
     
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };



	pagechange(pagination, filtersArg, sorter){
	  const { dispatch } = this.props;
		 dispatch({
      type: 'newman/list',
      payload:{
		  	size:10,
		  	pageNumber: pagination.current,
		  	taskId:1
      }
    });
	}
	navGo(id){
  	let thats = this.props.that;
	  this.props.history.push({
			pathname:'./detail',
			state:{
				id:id
			}
		})
 }
	callback(key) {
  	const { dispatch } = this.props;
  	if( key == 1 ){
  		dispatch({
	      type: 'newman/list',
	      payload:{
			  	size:10,
			  	pageNumber:1,
			  	taskId:1
	      }
	    });
	    dispatch({
	      type: 'newman/top',
	      payload:{
			  	id:1
	      }
	    });
	    dispatch({
	      type: 'newman/top_toal',
	      payload:{
			  	taskId:1
	      }
	    });
  	}else{
			this.setState({
				starttime:getTimeDistance('today')[0],
				endtime:getTimeDistance('today')[1]
			},()=>{
				dispatch({
		      type: 'newman/chart',
		      payload:{
		      	startTime:this.state.starttime,
		      	endTime:this.state.endtime,
		      	value:this.state.value,
		      	taskId:1,
		      	type:this.state.type
		      }
		    });
			});
  	}
	}
	man_handleChange= (value)=>{
		const {dispatch} = this.props;
		this.setState({
			type:value
		},()=>{
			dispatch({
	      type: 'newman/chart',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	taskId:1,
	      	type:this.state.type
	      }
	    });
		})
		
	}
	onChange1(val){
		const {dispatch} = this.props;
		this.setState({
			starttime:val[0].format('YYYY-MM-DD')+' 00:00:00',
			endtime:val[1].format('YYYY-MM-DD') +' 00:00:00' ,
			value:'day'
		},()=>{
			dispatch({
	      type: 'newman/chart',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	taskId:1,
	      	type:this.state.type
	      }
	    });
		})
	}
	onChange2(date, dateString){
		var weekOfday = moment(date).format('E');//计算今天是这周第几天
		var last_monday = moment(date).add(-weekOfday+1, 'days').format('YYYY-MM-DD');//周一日期
		var last_sunday = moment(date).add(7-weekOfday, 'days').format('YYYY-MM-DD');//周日日期
		const {dispatch} = this.props;
		this.setState({
			starttime:last_monday+' 00:00:00',
			endtime:last_sunday+' 00:00:00',
			value:'day'
		},()=>{
			dispatch({
	      type: 'newman/chart',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	taskId:1,
	      	type:this.state.type
	      }
	    });
		});
	}
	onChange3(date, dateString){
		let start = moment(date).add('month', 0).format('YYYY-MM') + '-01';
  	let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD');

		const {dispatch} = this.props;
		this.setState({
			starttime:start+' 00:00:00',
			endtime:end+' 00:00:00',
			value:'day'
		},()=>{
			dispatch({
	      type: 'newman/chart',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	taskId:1,
	      	type:this.state.type
	      }
	    });
		});
	}
	onChange4(){
		const {dispatch} = this.props;
		this.setState({
			starttime:getTimeDistance('today')[0],
			endtime:getTimeDistance('today')[1],
			value:'hour'
		},()=>{
			dispatch({
	      type: 'newman/chart',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	taskId:1,
	      	type:this.state.type
	      }
	    });
		});
	}

	handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {
  	const {newman:{data,chart_data,top,top_toal,zg},loading} = this.props;
  	const datepick = this.state.datepick;
		let datediv = null;
		if( datepick == 'day' ){
			datediv =  <RangePicker style={{display:'block'}} onChange={this.onChange1.bind(this)} value={[moment(this.state.starttime, dateFormat), moment(this.state.endtime, dateFormat)]} format={dateFormat} />;
		}else if( datepick == 'week' ){
			datediv =  <WeekPicker style={{display:'block'}} onChange={this.onChange2.bind(this)} placeholder="Select week" />;
		}else{
			datediv =  <MonthPicker style={{display:'block'}} onChange={this.onChange3.bind(this)} placeholder="Select month" />;
		};
		const { selectedRows, modalVisible } = this.state;
		const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
		const columns = [
      {
        title: '参与时间',
        dataIndex: 'start_time',
        key:'createTime'
      },
      {
        title: '用户ID',
        dataIndex: 'id_',
        key:'id'
      },
      {
        title: '用户账户',
        dataIndex: 'telephone',
        key:'telephone'
      },
      {
        title: '用户昵称',
        dataIndex: 'nick_name',
        key:'nickName'
      },
      {
      	title:'奖励类别',
      	dataIndex:'reward',//0 BPCC 1现金 红包
      	key:'reward',
				render(val){
					let type = '';
					switch (val){
						case '0':
							type='BPCC';
							break;
						default:
							type='现金红包';
							break;
					}
					return type;
				}
      },
      {
      	title:'奖励数值',
      	dataIndex:'token',
      }
    ];
    return (
      <PageHeaderLayout title="新人注册">
      	<Card bordered={false}>
      		<Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
				    <TabPane tab="列表" key="1">
				    	<DescriptionList size="large" title="活动信息" style={{ marginBottom: 32}}>
			        	<Row gutter={24}>
			        		<Col span={2}>
			          		<div className={styles.tab}>{top.activate == 'true' ? '进行中':'已关闭' }</div>
			          	</Col>
			          	<Col span={2}>
			          		<Button type="primary" onClick={() => this.handleModalVisible(true)}>活动编辑</Button>
			          	</Col>
			          </Row>
			          <Divider style={{ marginBottom: 32 }} />
			          <Description term="参与人数">{top_toal.Number}</Description>
			          <Description term="BPCC发放">{top_toal.Total}</Description>
			          <Description term="参与条件">新注册用户</Description>
			          <Description term="可领取次数">1</Description>
			          <Description term="单次领取数量">{top.token}</Description>
			        </DescriptionList>
			        <StandardTable
	              selectedRows={selectedRows}
	              loading={loading}
	              data={data}
	              columns={columns}
	              onChange={this.pagechange.bind(this)}
	            />
				    </TabPane>
				    <TabPane tab="图表" key="2">
				    	<Row gutter={24}>
					      <Col span={10}>
				      		<Select defaultValue="1" style={{width:'30%'}} onChange={this.man_handleChange}>
							      <Option value="0">参与人数</Option>
							      <Option value="1">发放数值</Option>
							    </Select>
					      </Col>
					      <Col span={7} offset={7}>
					      		{datediv}
					      		<Row gutter={24} style={{marginTop:'15px'}}>
						      		<Col span={6}>
						      			<Button type="primary">实时数据</Button>
						      		</Col>
						      		<Col span={6}>
						      			<Button type="primary" onClick={()=>{this.setState({datepick:'day'})}}>按日</Button>
						      		</Col>
						      		<Col span={6}>
						      			<Button type="primary" onClick={()=>{this.setState({datepick:'week'})}}>按周</Button>
						      		</Col>
					      			<Col span={6}>
					      				<Button type="primary" onClick={()=>{this.setState({datepick:'month'})}}>按月</Button>
					      			</Col>
					      		</Row>

					      </Col>
					    </Row>
					    <Row>
					      <Col span={22} offset={1}>
					      	<ChartCard
			              bordered={false}
			              title="新人注册"
			              loading={loading}
			              total={numeral(zg).format('0,0')}
			              footer={<Field label="该时间段新人注册量" value={numeral(data.datanum).format('0,0')} />}
			              contentHeight={400}
			            >
			              <MiniArea color="#975FE4" data={chart_data} />
			            </ChartCard>
					      </Col>
					    </Row>
				    </TabPane>
				  </Tabs>
	      </Card>  
	       <CreateForm {...parentMethods} modalVisible={modalVisible} top={top} dis={this.props} />
      </PageHeaderLayout>
    );
  }
}


