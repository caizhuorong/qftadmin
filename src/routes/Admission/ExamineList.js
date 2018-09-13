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
  Cascader 
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import styles from './List.less';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['processing','success','processing','error'];
const RangePicker = DatePicker.RangePicker;
const status = ['停业修整','营业','processing','封停'];
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

@connect(({ admission, loading }) => ({
  admission,
  loading: loading.models.admission,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {
	    industry:'',
	    area:'',
	    sellerState:'',
	    title:'',
    },
    pageNumber:1,
    industry:'',
    area:'',
    sellerState:'',
    title:'',
    size:10
  };
  componentWillMount() {
    const { dispatch } = this.props;
		dispatch({
      type: 'admission/city',
      payload: {
        pId:'ZHCN',
        modelMap:''
      },
    });
   dispatch({
      type: 'admission/fl',
    });
    dispatch({
    	type:'admission/pcSellerRecordCount',
    	payload:{
    		modelMap:'a'
    	}
    });
    dispatch({
    	type:'admission/pcSellerRecord',
    	payload:{
    		modelMap:'a',
    		pageNumber:this.state.pageNumber,
    		size:this.state.size,
    		industry:'',
    		area:'',
    		startTime:'',
    		endTime:'',
    	}
    });
    
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {

		const { dispatch } = this.props;
		const { formValues } = this.state;
		
		dispatch({
		  type: 'admission/pcSellerRecord',
		  payload: {
		  	...formValues,
		  	pageNumber:pagination.current,
		  	size:this.state.size
		  },
		});

  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };




  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let fieldsValues = {};
      fieldsValues.area = fieldsValue.area == undefined ? '':fieldsValue.area[0]+','+fieldsValue.area[1]+','+fieldsValue.area[2];
      fieldsValues.industry = fieldsValue.industry == undefined ? '':fieldsValue.industry;
      fieldsValues.startTime =fieldsValue.date == undefined || fieldsValue.date.length == 0  ? '':(fieldsValue.date[0].format('YYYY-MM-DD')+' 00:00:00');  
      fieldsValues.endTime = fieldsValue.date == undefined || fieldsValue.date.length == 0 ? '':(fieldsValue.date[1].format('YYYY-MM-DD')+' 00:00:00');
      fieldsValues.modelMap = '';
      this.setState({
        formValues: fieldsValues,
      });
      
      dispatch({
        type: 'admission/pcSellerRecord',
        payload: {
        	...fieldsValues,
        	pageNumber:this.state.pageNumber,
					size:this.state.size
        },
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
	onChanges = (value,selectedOptions)=> {


	};

	loadData = (selectedOptions) => {

		const {dispatch} = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
		if( selectedOptions.length == 2 ){
			dispatch({
	      type: 'admission/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption,
	        no:true
	      },
	    });
		}else{

			dispatch({
	      type: 'admission/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption
	      },
	    });
		}
  }

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={24}>
        	<Col span={6}>
            <FormItem label="店铺分类">
              {getFieldDecorator('industry')(
                <Select placeholder="请选择"  style={{ width: '100%' }}>
                		<Option value='' key='0'>全部</Option>
                 		{this.renderChild(this.props.admission.fl)}
                </Select>
              )}
            </FormItem>
          </Col>
          
         	<Col span={6}>
         	  <FormItem label="城市">
              {getFieldDecorator('area')(<Cascader changeOnSelect loadData={this.loadData} options={this.props.admission.optionss} onChange={this.onChanges} placeholder="请选择地区" />)}
            </FormItem>
         	</Col>
         	<Col span={8}>
         		<FormItem
		          label="日期"
		        >
		          {getFieldDecorator('date')(
		            <RangePicker />
		          )}
		        </FormItem>
         	</Col>
          <Col span={4}>
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
	renderChild =(d) => {
		let children = [];
		if(d.length != undefined ){
			d.forEach(function(x,y){
				children.push(<Option value={x.id} key={y+1}>{x.title}</Option>);
			})
		}
		return children;
		
	}

  render() {
    const {
      admission: { 
      	optionss,
      	fl,
      	pcSellerRecordCounts,
      	pcSellerRecord
      },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const columns = [
      {
        title: '入驻时间',
        dataIndex: 'checker_time',
      },
      {
        title: '店铺ID',
        dataIndex: 'seller_no',
      },
      {
        title: '店铺名称',
        dataIndex: 'title',
      },
      {
        title: '地区',
        render:(text,record,index)=>{
					return record.proviceName+record.cityName+record.areaName;
        }
      },
      {
        title: '申请人',
        dataIndex: 'true_name',
      },
      {
        title: '联系方式',
        dataIndex: 'telephone',
      },
      {
        title: '分类',
        dataIndex: 'tName', // 0 审核中 1审核通过 2审核未通过	3封停
      },
      {
        title: '审核人',
       dataIndex:'checkName'
      },
    ];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="入驻记录">
        <Card bordered={false}>
          <div className={styles.tableList}>
          <Row gutter={24}>
          	<Col span={6}>
          		<h4>总入住商家:{pcSellerRecordCounts.total}</h4>
          		<h4>当前:{pcSellerRecordCounts.countToday}</h4>
          	</Col>
          	<Col span={18}>
          	  <div className={styles.tableListForm}>{this.renderForm()}</div>
          	</Col>
          </Row>
           
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={pcSellerRecord}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
				<CreateForm {...parentMethods} modalVisible={modalVisible} /><CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}


