import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Icon,
  Modal,
  Cascader,
  Tabs,
  Table
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';

@connect(({ copywriting, loading }) => ({
copywriting,
loading: loading.models.copywriting,
}))

export default class TableList extends PureComponent {
  state = {
    pageNumber:1,
    sellerState:'',
    selectedRows: [],
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'copywriting/list',
      payload:{
		  	size:10,
		  	pageNumber:1,
      }
    });
 }
	pagechange(pagination, filtersArg, sorter){
	  const { dispatch } = this.props;
		 dispatch({
      type: 'copywriting/list',
      payload:{
		  	size:10,
		  	pageNumber: pagination.current,
		  	taskId:this.state.taskId
      }
    });
	}
	navGo(id,texts){
		if(id == '2001'){
			this.props.history.push({
				pathname:'copywriting/homepage',
				state:{
					id:id
				}
			})
		}else if( id == '2002' ){
			this.props.history.push({
				pathname:'copywriting/signins',
				state:{
					id:id
				}
			})
		}else if( id== '2005' ){
			this.props.history.push({
				pathname:'copywriting/nearbys',
				state:{
					id:id
				}
			})
		}else if( id == '2006' ){
			this.props.history.push({
				pathname:'copywriting/wallet',
				state:{
					id:id
				}
			})
		}else if( id == '2020' ){
			this.props.history.push({
				pathname:'copywriting/aboutus',
				state:{
					id:id
				}
			})
		}else if( id == '2022' ){
			this.props.history.push({
				pathname:'copywriting/friendss',
				state:{
					id:id
				}
			})
		}else if( id == '2023' ){
			this.props.history.push({
				pathname:'copywriting/bpcc',
				state:{
					id:id
				}
			})
		}else if( id == '2024' ){
			this.props.history.push({
				pathname:'copywriting/reward',
				state:{
					id:id
				}
			})
		}
	}
  render() {
  	const {copywriting:{data},loading} = this.props;
  	const { selectedRows } = this.state;
		const columns = [
      {
        title: '模块名称',
        dataIndex: 'remark',
        key:'remark'
      },
      {
        title: '操作人',
        dataIndex: 'nickName',
        key:'nickName'
      },
      {
        title: '编辑时间',
        dataIndex: 'createTime',
        key:'createTime'
      },
      {
      	title:'操作',
				render: (text,record,index) => {
	        return  (
	        	<Fragment>
            	<a onClick={()=>this.navGo(record.id)}>编辑</a>
          	</Fragment>
        	);
        },
      }
    ];
    return (
      <PageHeaderLayout title="文案配置">
      	<Card bordered={false}>
      		<Row gutter={24}>
      			<Col span={22} offset={1}>
      			 	<StandardTable
	              selectedRows={selectedRows}
	              loading={loading}
	              data={data}
	              columns={columns}
	              onChange={this.pagechange.bind(this)}
	            />
      			</Col>
      		</Row>
			       
				 
	      </Card>  

      </PageHeaderLayout>
    );
  }
}


