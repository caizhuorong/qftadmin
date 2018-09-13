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
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Cascader ,

} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import styles from './list.less';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '正常', '停业修整', '封停'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
const optionss = [{
	  value: 'zhejiang',
	  label: 'Zhejiang',
	  children: [{
	    value: 'hangzhou',
	    label: 'Hangzhou',
	    children: [{
	      value: 'xihu',
	      label: 'West Lake',
	    }],
	  }],
	}, {
	  value: 'jiangsu',
	  label: 'Jiangsu',
	  children: [{
	    value: 'nanjing',
	    label: 'Nanjing',
	    children: [{
	      value: 'zhonghuamen',
	      label: 'Zhong Hua Men',
	    }],
	  }],
	}];
@connect(({ person, loading }) => ({
  person,
  loading: loading.models.person,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    date:[],
    pageNumber:1,
    size:10,
    sort:'desc',
    startTime:'',
    endTime:'',
    userState:'',
    userNo:''
  };
	
	
	
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'person/fetch',
      payload:{
      	pageNumber:this.state.pageNumber,
      	size:this.state.size,
      	sort:this.state.sort,
      	startTime:this.state.startTime,
      	endTime:this.state.endTime,
      	userState:this.state.userState,
      	userNo:this.state.userNo
      }
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
      type: 'person/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
			const rangeValue = fieldsValue.date;
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],

      };

      this.setState({
		    pageNumber:1,
		    size:10,
		    sort:fieldsValue.sort,
		    startTime:rangeValue[0].format('YYYY-MM-DD'),
		    endTime:rangeValue[1].format('YYYY-MM-DD'),
		    userState:fieldsValue.userState,
		    userNo:fieldsValue.userNo
      },()=>{
      	dispatch({
	        type: 'person/fetch',
	        payload: {
	        	pageNumber:this.state.pageNumber,
	        	size:this.state.size,
	        	sort:this.state.sort,
	        	startTime:rangeValue[0].format('YYYY-MM-DD'),
	        	endTime:rangeValue[1].format('YYYY-MM-DD'),
	        	userState:this.state.userState,
	        	userNo:this.state.userNo
	        },
	      });
      });

      
    });
  };


	onChanges = value=> {

	}


  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        	<Col md={3} sm={24}>
            <FormItem label="排序">
              {getFieldDecorator('sort')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="desc">时间正序</Option>
                  <Option value="asc">时间倒叙</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('userState')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="0">正常</Option>
                   <Option value="1">封停</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="时间">
              {getFieldDecorator('date',
              	{
              		type: 'array',
              		message: 'Please select time!'
              	}
            	,)(
		            <RangePicker onChange={this.onChangedate}/>
		          )}
            </FormItem>
          </Col>
         	<Col md={6} sm={24}>
         		<FormItem label="用户ID" >
		          {getFieldDecorator('userNo')(
		            <Input placeholder="请输入店铺名称/ID" />
		          )}
		        </FormItem>
         	</Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }



  renderForm() {
    const { expandForm } = this.state;
    return this.renderSimpleForm();
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
  render() {
    const {
      person: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const columns = [
      {
        title: '注册日期',
        dataIndex: 'create_time',
      },
      {
        title: '用户ID',
        dataIndex: 'id_',
      },
      {
        title: '用户名',
        dataIndex: 'nick_name',
      },
      {
        title: '手机号',
        dataIndex: 'telephone',
      },
      {
        title: '注册渠道',
        dataIndex: 'register_ditch',
        render(val) {
        	var name = '';
        	switch(val){
        		case 1:
        			name = '微信';
        		case 2:
        			name = '微信朋友圈';
        		case 3: 
        			name = 'QQ';
        		case 4:
        		  name = 'QQ空间';
        		case 5:
        			name = '其他';
      			default:
      				name = '其他';
        	}
          return name;
        },

      },
      {
        title: 'BPCC',
        dataIndex: 'balance',
      },
      {
        title: '账号状态',
        dataIndex: 'user_state',
      },
      {
        title: '最近一次登录',
        dataIndex: 'last_login_time',
      },
      {
        title: '更多',
        render: (text,record,index) => {
	        return  (
	        	<Fragment>
            	<a onClick={()=>this.navGo(record.id_)}>详情</a>
          	</Fragment>
        	);
        },
      },
    ];



    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="用户列表">
          <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
