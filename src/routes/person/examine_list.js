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
	};

	componentWillMount() {
		const {
			dispatch
		} = this.props;
		dispatch({
			type: 'examine/fetch',
			payload: {
				pageNumber: this.state.pageNumber,
				size: this.state.size,
				sort: this.state.sort,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				userId: this.state.userId,
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
		};
		dispatch({
			type: 'examine/fetch',
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

			}, () => {
				dispatch({
					type: 'examine/fetch',
					payload: {
						pageNumber: this.state.pageNumber,
						size: this.state.size,
						sort: this.state.sort,
						startTime: rangeValue != undefined ? rangeValue[0].format('YYYY-MM-DD') : '',
						endTime: rangeValue != undefined ? rangeValue[1].format('YYYY-MM-DD') : '',
						userId: fieldsValue.userId != undefined ? fieldsValue.userId : '',
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
				type:'list'
			}
		})
	}
	render() {
		const {
			examine: {
				data
			},
			loading,
		} = this.props;
		const {
			selectedRows,
			modalVisible
		} = this.state;
		const columns = [{
				title: '申请时间',
				dataIndex: 'create_time',
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