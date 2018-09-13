import React, {
	PureComponent,
	Fragment
} from 'react';
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
	Cascader,

} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link, hashHistory } from 'dva/router';
import styles from './list.less';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const {
	Option
} = Select;
const statusMap = ['processing','success','error'];
const status = ['停业修整','通过','拒绝'];
@connect(({
	examine,
	loading
}) => ({
	examine,
	loading: loading.models.examine,
}))
@Form.create()
export default class TableList extends PureComponent {
	state = {
		modalVisible: false,
		expandForm: false,
		selectedRows: [],
		formValues: {},
		pageNumber: 1,
		size: 10,
		sort: 'desc',
		startTime: '',
		endTime: '',
		userId: '',
		states:'' //全部 空  通过1 拒绝2
	};

	componentWillMount() {
		const {
			dispatch
		} = this.props;
		dispatch({
			type: 'examine/readcheckList',
			payload: {
				pageNumber: this.state.pageNumber,
				size: this.state.size,
				sort: this.state.sort,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				userId: this.state.userId,
				state:this.state.states
			}
		});
	}

	handleStandardTableChange = (pagination, filtersArg, sorter) => {
		const {
			dispatch
		} = this.props;
		const params = {
			pageNumber: pagination.current,
			size: 10,
			sort: this.state.sort,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			userId: this.state.userId,
			state:this.state.states
		};
		dispatch({
			type: 'examine/readcheckList',
			payload: params,
		});
	};

	handleFormReset = () => {
		const {
			form,
			dispatch
		} = this.props;
		form.resetFields();
		this.setState({
			formValues: {},
		});
	};
	handleSearch = e => {
		e.preventDefault();
		const {
			dispatch,
			form
		} = this.props;
		form.validateFields((err, fieldsValue) => {
			if(err) return;
			const rangeValue = fieldsValue.date;
			this.setState({
				pageNumber: 1,
				size: 10,
				sort: fieldsValue.sort != undefined ? fieldsValue.sort : '',
				startTime: rangeValue != undefined ? rangeValue[0].format('YYYY-MM-DD') : '',
				endTime: rangeValue != undefined ? rangeValue[1].format('YYYY-MM-DD') : '',
				userId: fieldsValue.userId != undefined ? fieldsValue.userId : '',
				states:fieldsValue.states != undefined ? fieldsValue.states:''
			}, () => {
				dispatch({
					type: 'examine/readcheckList',
					payload: {
						pageNumber: this.state.pageNumber,
						size: this.state.size,
						sort: this.state.sort,
						startTime: rangeValue != undefined ? rangeValue[0].format('YYYY-MM-DD') : '',
						endTime: rangeValue != undefined ? rangeValue[1].format('YYYY-MM-DD') : '',
						userId: fieldsValue.userId != undefined ? fieldsValue.userId : '',
						state:fieldsValue.states!=undefined ? fieldsValue.states:''
					},
				});
			});

		});
	};

	renderSimpleForm() {
		const {
			form
		} = this.props;
		const {
			getFieldDecorator
		} = form;
		return(
			<Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        	<Col md={3} sm={24}>
            <FormItem label="排序">
              {getFieldDecorator('sort',{
              	 initialValue:'desc',
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="desc">正序</Option>
                  <Option value="asc">倒叙</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label="排序">
              {getFieldDecorator('states',{
              	 initialValue:'',
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                	<Option value="">全部</Option>
                  <Option value={1}>通过</Option>
                  <Option value={2}>已拒绝</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="时间">
              {getFieldDecorator('date')(
		            <RangePicker/>
		          )}
            </FormItem>
          </Col>
         	<Col md={6} sm={24}>
         		<FormItem label="用户ID" >
		          {getFieldDecorator('userNo')(
		            <Input placeholder="请输入用户ID" />
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
		const {
			expandForm
		} = this.state;
		return this.renderSimpleForm();
	}
	navGo(id) {
		let thats = this.props.that;
		this.props.history.push({
			pathname: './examinelistdetail',
			state: {
				id: id,
				type:'record'
			}
		})
	}
	render() {
		const {
			examine: {
				datas
			},
			loading,
		} = this.props;
		let data = {
			list:[],
			pagination:{}
		};
		if( datas != undefined ){
			data = datas;
		}
		const {
			selectedRows,
			modalVisible
		} = this.state;
		const columns = [{
				title: '审核时间',
				dataIndex: 'authenticate_time',
			},
			{
				title: '用户ID',
				dataIndex: 'uId',
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
				title: '状态',
				dataIndex: 'state_',
				 render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
			},
			{
				title: '更多',
				render: (text, record, index) => {
					return(
						<Fragment>
            	<a onClick={()=>this.navGo(record.id_)}>详情</a>
          	</Fragment>
					);
				},
			}
		];
		return(
			<PageHeaderLayout title="审核列表">
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
      </PageHeaderLayout>
		);
	}
}