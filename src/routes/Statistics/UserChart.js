import React, {
	PureComponent,
} from 'react';
import { connect } from 'dva';

import { 
	Row, 
	Col,
	Button,
	DatePicker, 
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
  TimelineChart,
} from 'components/Charts';
import moment from 'moment';
import numeral from 'numeral';
import css from './AppChart.less';
import {getTimeDistance} from '../../utils/utils';
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
			starttime:'',
			endtime:'',
			value:'hour',
			width:'1550px'
		};
		this.onChange = this.onChange.bind(this);
	};
	componentWillMount() {
		console.log(9);
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		this.setState({
			width:w-400+'px'
		})
		const {dispatch} = this.props;
		dispatch({
      type: 'chart/pcUserDataCount',
    });
		this.setState({
			starttime:getTimeDistance('today')[0],
			endtime:getTimeDistance('today')[1]
		},()=>{
			dispatch({
	      type: 'chart/pcUserDataByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	modelMap:''
	      }
	    });
		});
	}
	onChange(date, dateString) {
		if( typeof dateString == 'object' ){
			let ss = dateString[0]+'~'+dateString[1] 
			this.setState({
	  		date:ss
	  	})
		}else{
			this.setState({
	  		date:dateString
	  	})
		}
	}
	datechange(){
		
	}
	onChange1(val){
		const {dispatch} = this.props;
		this.setState({
			starttime:val[0].format('YYYY-MM-DD')+' 00:00:00',
			endtime:val[1].format('YYYY-MM-DD') +' 00:00:00' ,
			value:'day'
		},()=>{
			dispatch({
	      type: 'chart/pcUserDataByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
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
	      type: 'chart/pcUserDataByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
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
	      type: 'chart/pcUserDataByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
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
	      type: 'chart/pcUserDataByTimeRanges',
	      payload:{
	      	startTime:this.state.starttime,
	      	endTime:this.state.endtime,
	      	value:this.state.value,
	      	modelMap:''
	      }
	    });
		});
	}
	render() {
		const {chart:{user,data},loading} = this.props;
		console.log(user,data)
		const datepick = this.state.datepick;
		let datas = data.data;
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
		      		<label className={css.nav_name_label}>注册用户量趋势</label>
		      	</div>
		      </Col>
		      <Col span={9} offset={7}>
		      	<div className={css.nav_name}>
		      		{datediv}
		      		<Row gutter={24} style={{marginTop:'15px'}}>
			      		<Col span={6}>
			      			<Button type="primary" onClick={this.onChange4.bind(this)}>实时数据</Button>
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
		      	</div>
		      </Col>
		    </Row>
		    <div style={{width:this.state.width,marginLeft:'50px'}}>
	      	<ChartCard
              bordered={false}
              title="注册用户数"
              loading={loading}
              total={numeral(user).format('0,0')}
              footer={<Field label="该时间段用户注册量" value={numeral(data.datanum).format('0,0')} />}
              contentHeight={400}
            >
              <MiniArea color="#975FE4" data={datas} />
            </ChartCard>
		    </div>
			</div>
		);
	}
}
