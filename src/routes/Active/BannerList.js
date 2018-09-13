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
  Menu,
  Modal,
  message,
  Badge,
  Divider,
  Cascader,
  List 
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import styles from './BannerList.less';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['error','success'];
const status = ['隐藏','显示'];
@connect(({ active, loading }) => ({
  active,
  loading: loading.models.active,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    pageNumber:1,
    selindex:'index',
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'active/banner',
      payload: {
        pageNumber:this.state.pageNumber,
        size:10,
        type:'index',
      },
    });
		dispatch({
      type: 'active/execution',
      payload:{
      	action:'advertising'
      }
    });
  }
	selChange(values){
		const { dispatch } = this.props;
		 dispatch({
      type: 'active/banner',
      payload: {
        pageNumber:this.state.pageNumber,
        size:10,
        type:values,
      },
    });
    this.setState({
    	selindex:values
    })
	}
	navgo = () => {
		let thats = this.props.that;
  	this.props.history.push({
			pathname:'./bannerdetail',
			state:{
				selindex:this.state.selindex,
			}
		})
	}

	handleStandardTableChange = (pagination, filtersArg, sorter) => {
		const { dispatch } = this.props;
		const { formValues } = this.state;
		dispatch({
		  type: 'active/banner',
		  payload: {
		  	pageNumber:pagination.current,
        size:10,
        type:this.state.selindex,
		  },
		});
  };

  render() {
    const {
      active: { 
      	banner,
      	execution,
      },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'id_',
      },
      {
        title: '广告标题',
        dataIndex: 'title',
      },
      {
        title: '操作人',
        dataIndex: 'user_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '点击量',
        dataIndex: 'click_count',
      },
      {
        title: '状态',
        dataIndex: 'enable_', //1上架 0下架
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: (text,record,index) => {
	        return  (
	        	<Fragment>
            	<Link to={{
            		pathname:'BannerDetail',	
            		state:{
            			id_:record.id_,
            			selindex:this.state.selindex,
            			enable_:record.enable_,
            			title:record.title,
            			url:record.img_link,
            			img_url:record.img_url,
            			starttime:record.start_time,
            			endtime:record.end_time
            		}
            	}} >详情</Link>
          	</Fragment>
        	);
        },
      },
    ];

    return (
      <PageHeaderLayout title="广告位">
        <Card bordered={false}>
      		<Select defaultValue="index" style={{ width: 120 ,marginBottom:'30px'}} onChange={this.selChange.bind(this)}>
			      <Option value="index">首页轮播位</Option>
			      <Option value="near">附近轮播位</Option>
			    </Select>
			    <div style={{float:'right'}}>
			    	<Button type="primary" onClick={this.navgo}>添加</Button>
			    </div>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={banner}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <h3 style={{ margin: '16px 0' }}>执行记录</h3>
			    <List
			      size="small"
			      bordered
			      dataSource={execution}
			      renderItem={item => (<List.Item>{item.adminName}{item.remark}{item.id}({item.createTime})</List.Item>)}
			    />
        </Card>
      </PageHeaderLayout>
    );
  }
}


