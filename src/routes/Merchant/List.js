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

	
	
	
	

@connect(({ merchant, loading }) => ({
  merchant,
  loading: loading.models.merchant,
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
    
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'merchant/fetch',
      payload: {
        pageNumber:this.state.pageNumber,
        size:10,
        industry:this.state.industry,
        sellerState:this.state.sellerState,
        area:this.state.area,
        title:this.state.title,
        modelMap:'a',
      },
    });
		dispatch({
      type: 'merchant/city',
      payload: {
        pId:'ZHCN',
        modelMap:''
      },
    });
   dispatch({
      type: 'merchant/fl',
    });
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {

		const { dispatch } = this.props;
		const { formValues } = this.state;
		
		dispatch({
		  type: 'merchant/fetch',
		  payload: {
		  	...formValues,
		  	pageNumber:pagination.current
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
      fieldsValue.area = fieldsValue.area == undefined ? '':fieldsValue.area;
      if( fieldsValue.area.length != 0 ){
      	 fieldsValue.area = fieldsValue.area.join(',');
      }
     
      fieldsValue.industry = fieldsValue.industry == undefined ? '':fieldsValue.industry
      fieldsValue.sellerState = fieldsValue.sellerState == undefined ? '':fieldsValue.sellerState
      fieldsValue.title = fieldsValue.title == undefined ? '':fieldsValue.title;
      this.setState({
        formValues: fieldsValue,
      });

      dispatch({
        type: 'merchant/fetch',
        payload: {
        	...fieldsValue,
        	pageNumber:this.state.pageNumber
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
	      type: 'merchant/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption,
	        no:true
	      },
	    });
		}else{

			dispatch({
	      type: 'merchant/city',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption
	      },
	    });
		}
  }
	gotoadd= () =>{
		let thats = this.props.that;
	  this.props.history.push({
			pathname:'./add',
		})
	}
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        	<Col md={4} sm={24}>
            <FormItem label="店铺分类">
              {getFieldDecorator('industry')(
                <Select placeholder="请选择"  style={{ width: '100%' }}>
                		<Option value='' key='0'>全部</Option>
                 		{this.renderChild(this.props.merchant.fl)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="店铺状态">
             {getFieldDecorator('sellerState')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="1">营业中</Option>
                  <Option value="3">封停</Option>
                </Select>
              )}
            </FormItem>
          </Col>
         	<Col md={6} sm={24}>
         	  <FormItem label="城市">
              {getFieldDecorator('area')(<Cascader changeOnSelect loadData={this.loadData} options={this.props.merchant.optionss} onChange={this.onChanges} placeholder="请选择地区" />)}
            </FormItem>
         	</Col>
         	<Col md={4} sm={24}>
         		<FormItem label="店铺名称/ID" >
		          {getFieldDecorator('title')(
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
              <Button type="primary" style={{ marginLeft: '40px' }} onClick={this.gotoadd}>	
	      			添加商户
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
      merchant: { 
      	data,
      	optionss,
      	fl 
      },
      loading,
    } = this.props;

    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '编号',
        dataIndex: 'seller_no',
      },
      {
        title: '店铺名称',
        dataIndex: 'title',
      },
      {
        title: '店铺类型',
        dataIndex: 'tName',
      },
      {
        title: '地区',
        dataIndex: 'proviceName',
        render:(text,record,index)=>{

					return record.proviceName+record.cityName+record.areaName;
        }
      },
      {
        title: '店铺状态',
        dataIndex: 'seller_state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
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
      <PageHeaderLayout title="查询表格">
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
				<CreateForm {...parentMethods} modalVisible={modalVisible} /><CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}


