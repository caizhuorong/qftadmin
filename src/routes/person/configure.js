import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  InputNumber,
  message,
  Divider,
  Cascader,
  Tabs,
  Table
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
@connect(({ active, loading }) => ({
active,
loading: loading.models.active,
}))
export default class TableList extends PureComponent {
  state = {
 		value:0,
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'active/top',
      payload:{
		  	id:10
      }
    });
  }

	save = () =>{
		const { dispatch } = this.props;
		dispatch({
		 	type:'active/editTask',
			payload:{
				id:10,
		  	activate:'true',
		  	token:this.state.value,
			}
	  })
	}
	input1 = (e) => {
		this.setState({
			value:e.target.value
		})
	}
  render() {
  	const {active:{top},loading} = this.props;
    return (
      <PageHeaderLayout title="实名认证奖励配置">
      	<Card bordered={false}>
        	<Row gutter={24}>
        		<Col span={2}>
          		<span>参与条件:</span>
          	</Col>
          	<Col span={6}>
          		<Input value='所有用户'  disabled/>
          	</Col>
          	<Col span={2} offset={4}>
          		<span>奖励类别:</span>
          	</Col>
          	<Col span={6}>
          		<Input value='BPCC' disabled />
          	</Col>
          	</Row>
          	<div style={{width:'100%',height:'32px'}}></div>
          	<Row gutter={24}>
          	<Col span={2}>
          		<span>奖励次数:</span>
          	</Col>
          	<Col span={6}>
          		<Input value='1' disabled />
          	</Col>
          	<Col span={2} offset={4}>
        			<span>奖励数额:</span>
          	</Col>
          	<Col span={6}>
          		<Input defaultValue={top.token} onChange={this.input1} />
          	</Col>
          </Row>
          <Divider style={{ marginBottom: 32 }} />
          <Row gutter={24}>
          	<Col span={2} offset={11}>
          		<Button type="primary" onClick={this.save}>保存</Button>
          	</Col>
          </Row>
          
	        
	       </Card>
      </PageHeaderLayout>
    );
  }
}


