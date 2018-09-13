import React, {	PureComponent} from 'react';
import { connect } from 'dva';
import { 	Row,	Col,	Button,	DatePicker,} from 'antd';
import {  TimelineChart,} from 'components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import css from './AppChart.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;		

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))

export default class AppChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			datepick:'day',
			date:'02-02~02-02',
		};
		this.onChange = this.onChange.bind(this);
	};

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
	render() {
		const {chart:{data},loading} = this.props;
		const datepick = this.state.datepick;
		let datediv = null;
		if( datepick == 'day' ){
			datediv =  <RangePicker style={{display:'block'}} onChange={this.onChange} />;
		}else if( datepick == 'week' ){
			datediv =  <WeekPicker style={{display:'block'}} onChange={this.onChange} placeholder="Select week" />;
		}else{
			datediv =  <MonthPicker style={{display:'block'}} onChange={this.onChange} placeholder="Select month" />;
		}
		return(
			<PageHeaderLayout title="APP下载趋势">
				<div style={{background:'#fff'}}>
					<Row gutter={24}>
			      <Col span={8}>
			      	<div className={css.nav_name}>
			      		<label className={css.nav_name_label}>APP下载趋势</label>
			      		<span className={css.nav_name_span}>下载总量:5000</span>
			      		<span className={css.nav_name_span}>{this.state.date}:2000</span>
			      	</div>
			      </Col>
			      <Col span={9} offset={7}>
			      	<div className={css.nav_name}>
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
			      	</div>
			      </Col>
			    </Row>
			    <Row>
			      <Col span={22} offset={1}>
			      	<TimelineChart
						    height={500}
						    data={data}
						    loading={loading}
						    titleMap={{ y1: 'APP下载量'}}
						  />
			      </Col>
			    </Row>
				</div>
			</PageHeaderLayout>
		);
	}
}