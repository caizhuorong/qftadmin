import React, {
	PureComponent,
} from 'react';
import { connect } from 'dva';

import { 
	Row, 
	Col,
	Button,
	DatePicker, 
	Select ,
	Divider 
} from 'antd';

import {
  ChartCard,
  MiniArea,
  MiniBar,
  Field,
  TimelineChart,
} from 'components/Charts';
import moment from 'moment';
import numeral from 'numeral';
import css from './AppChart.less';
import {getTimeDistance} from '../../utils/utils';
import StandardTable from 'components/StandardTable';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;		
const dateFormat = 'YYYY-MM-DD';
@connect(({ chart, loading }) => ({
  chart,
  loading: loading.models.chart,
}))

export default class AppChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			datepick:'day',
			date:'02-02~02-02',
			modalVisible: false,
	    selectedRows: [],
	    pageNumber:1,
	    size:10,
			starttime:'',
			endtime:'',
			value:'hour',
			width:'1550px',
			titleCode:'',
		};
	};
	componentWillMount() {
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		this.setState({
			width:w-400+'px'
		})
		const {dispatch} = this.props;
		dispatch({
      type: 'chart/selectCount',
    });
		this.setState({
			starttime:getTimeDistance('today')[0]+' 00:00:00',
			endtime:getTimeDistance('today')[1]+' 00:00:00'
		},()=>{
			dispatch({
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:'',
	      	modelMap:''
	      }
	    });
	    dispatch({
	      type: 'chart/selectDetails',
	      payload:{
	      	pageNumber:1,
	      	size:10,

	      }
	    });
		});
	}
	onChange1(val){
		const {dispatch} = this.props;
		this.setState({
			starttime:val[0].format('YYYY-MM-DD')+' 00:00:00',
			endtime:val[1].format('YYYY-MM-DD') +' 00:00:00' ,
			value:'day'
		},()=>{
			dispatch({
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:this.state.titleCode,
	      	modelMap:''
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
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:this.state.titleCode,
	      	modelMap:''
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
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:this.state.titleCode,
	      	modelMap:''
	      }
	    });
		});
	}
	handleChange(val){
		const {dispatch} = this.props;
		this.setState({
			titleCode:val,
		},()=>{
			dispatch({
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:this.state.titleCode,
	      	modelMap:''
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
	      type: 'chart/selectByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	titleCode:this.state.titleCode,
	      	modelMap:''
	      }
	    });
		});
	}
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageNumber: pagination.current,
      size: 10,
      sort:this.state.sort,
	    startTime:this.state.startTime,
	    endTime:this.state.endTime,
	    userState:this.state.userState,
	    userNo:this.state.userNo
    };
    

    dispatch({
      type: 'chart/selectDetails',
      payload: params,
    });
  };
	render() {
		const {chart:{user,data,datas},loading} = this.props;
		const datepick = this.state.datepick;


		const { selectedRows, modalVisible } = this.state;
		const columns = [
      {
        title: '日期',
        dataIndex: 'allTime',
      },
      {
        title: '发放总数',
				render(text,record,index){
					return parseFloat(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))
				}
      },
      {
        title: '注册奖励',
        dataIndex: 'registerTotal',
        render(text,record,index){
					return parseFloat(record.registerTotal)+'('+(parseFloat(record.registerTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '每日签到',
        dataIndex: 'signInTotal',
        render(text,record,index){
					return parseFloat(record.signInTotal)+'('+(parseFloat(record.signInTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '每日分享',
        dataIndex: 'shareTotal',
        render(text,record,index){
					return parseFloat(record.shareTotal)+'('+(parseFloat(record.shareTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '消费返利',
        dataIndex: 'consumeTotal',
        render(text,record,index){
					return parseFloat(record.consumeTotal)+'('+(parseFloat(record.consumeTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '点评奖励',
        dataIndex: 'evaluateTotal',
        render(text,record,index){
					return parseFloat(record.evaluateTotal)+'('+(parseFloat(record.evaluateTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '好友邀请',
        dataIndex: 'inviteTotal',
        render(text,record,index){
					return parseFloat(record.inviteTotal)+'('+(parseFloat(record.inviteTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
      {
        title: '商户推荐',
        dataIndex: 'sellerInviteTotal',
        render(text,record,index){
					return parseFloat(record.sellerInviteTotal)+'('+(parseFloat(record.sellerInviteTotal)/(parseFloat(record.registerTotal)+parseFloat(record.signInTotal)+parseFloat(record.shareTotal)+parseFloat(record.consumeTotal)+parseFloat(record.evaluateTotal)+parseFloat(record.inviteTotal)+parseFloat(record.sellerInviteTotal))*100).toFixed(2)+')%'
				}
      },
    ];
		let datediv = null;
		if( datepick == 'day' ){
			datediv =  <RangePicker style={{display:'block'}} value={[moment(this.state.starttime, dateFormat), moment(this.state.endtime, dateFormat)]} format={dateFormat} onChange={this.onChange1.bind(this)} />;
		}else if( datepick == 'week' ){
			datediv =  <WeekPicker style={{display:'block'}} onChange={this.onChange2.bind(this)} placeholder="Select week" />;
		}else{
			datediv =  <MonthPicker style={{display:'block'}} onChange={this.onChange3.bind(this)} placeholder="Select month" />;
		}
		return(
			<div style={{background:'#fff'}}>
				<Row gutter={24}>
		      <Col span={8}>
		      	<div className={css.nav_name}>
		      		<label className={css.nav_name_label}>优惠卷发放数量</label>
		      	</div>
		      </Col>
		      <Col span={10} offset={6}>
		      	<div className={css.nav_name}>
		      		{datediv}
		      		<Row gutter={24} style={{marginTop:'15px'}}>
		      			<Col span={8}>
			      			<Select value={this.state.titleCode} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
			      			  <Option value=''>全部渠道</Option>
							      <Option value='register'>注册任务</Option>
							      <Option value='sign_in'>签到</Option>
							      <Option value="share">分享</Option>
							      <Option value="comment">点评</Option>
							      <Option value="inviting_friends">邀请</Option>
							      <Option value="be_inviting">受邀注册</Option>
							      <Option value="seller_recommend">推荐</Option>
							      <Option value="wechat_subscription">关注微信公众号</Option>
							      <Option value="join_wechat_group">添加微信群</Option>
							      <Option value="authenticate">认证</Option>
							      <Option value="consumer_return">消费返利</Option>
							    </Select>
			      		</Col>
			      		<Col span={4}>
			      			<Button type="primary" onClick={this.onChange4.bind(this)}>实时数据</Button>
			      		</Col>
			      		<Col span={4}>
			      			<Button type="primary" onClick={()=>{this.setState({datepick:'day'})}}>按日</Button>
			      		</Col>
			      		<Col span={4}>
			      			<Button type="primary" onClick={()=>{this.setState({datepick:'week'})}}>按周</Button>
			      		</Col>
		      			<Col span={4}>
		      				<Button type="primary" onClick={()=>{this.setState({datepick:'month'})}}>按月</Button>
		      			</Col>
		      		</Row>
		      	</div>
		      </Col>
		    </Row>
		    <div style={{width:this.state.width,marginLeft:'50px'}}>
	      	<ChartCard
              bordered={false}
              title="BPCC发放数量"
              loading={loading}
              total={numeral(user).format('0,0')}
              footer={<Field label="该时间段BPCC发放数量" value={numeral(data.datanum).format('0,0')} />}
              contentHeight={400}
            >
              <MiniArea color="#975FE4" data={data.data} />
            </ChartCard>
		    </div>
		    <Divider style={{marginTop:'20px',marginBottom:'20px'}} />
		    <Row gutter={24} > 
		    	<Col span={22} offset={1}>
		    		<StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={datas}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
		    	</Col>
		    </Row>
		    <Divider style={{marginTop:'32px',}} />
			</div>
		);
	}
}
