import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  message,
  Cascader,
  Upload,
  Modal,
  DatePicker 
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import moment from 'moment';
import styles from './BannerDetail.less';
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
import {apidd} from '../../services/api.js';

@connect(({ active, loading }) => ({
active,
loading: loading.models.active,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    data:{},
    previewVisible: false,
    previewImage: '',
    facepage: [],
    type:0,
    text:'更新了',
		datas:{},
    ModalText: '确认修改广告吗',
  };
  componentWillMount() {
  	console.log(this.props)
  	if( this.props.location.state.id_ != undefined ){
  		let data = [{
	  		uid:1,
	  		name:'xx.png',
	  		status:'done',
	  		url:this.props.location.state.img_url,
	  	}];
  		this.setState({
	  		data:{...this.props.location.state},
	  		type:this.props.location.state.enable_,
	  		facepage:data
	  	})
  	}else{
  		this.setState({
	  		data:{...this.props.location.state},


	  	})
  	}
  }
  selchange(value){
  	if( value == this.state.data.type ){
  		this.setState({
  			 text:'更新了',
  			 type:value
  		})
  	}else{
  		if( value == 1 ){
  			this.setState({
  			  text:'上架了',
  			  type:value
  			})
  		}else{
  			this.setState({
	  			text:'下架了',
	  			type:value
	  		})
  		}
  	}
  }
	facepagehandlePreview = (file) =>{
		this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  facepagehandleChange = ({ fileList,event }) => {
		this.setState({
			facepage:[...fileList]
		})
	}
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	let data={};
      	if( this.props.location.state.id_ == undefined ){
      		 data = {
      		 	qftIndexImg:{
  		 				title:values.title,
		      		type:this.props.location.state.selindex,
		      		imgLink:values.url,
		      		imgUrl:this.state.facepage[0].response == undefined ? this.state.data.img_url:this.state.facepage[0].response.data,
	      			startTime:moment(values.date[0]).format(dateFormat),
	      			endTime:moment(values.date[1]).format(dateFormat),
      		 	},
	      		action:'advertising',
	      		remark:this.state.text+values.title
	      	}
      	}else{
      		data = {
	      		qftIndexImg:{
	      			enable:this.state.type,
		      		id:this.state.data.id_,
		      		title:values.title,
		      		imgLink:values.url,
		      		imgUrl:this.state.facepage[0].response == undefined ? this.state.data.img_url:this.state.facepage[0].response.data,
	      			startTime:moment(values.date[0]).format(dateFormat),
	      			endTime:moment(values.date[1]).format(dateFormat),
	      		},
	      		action:'advertising',
	      		remark:this.state.text+values.title
	      	}
      	}
      	
      	if( this.props.location.state.id_ == undefined ){
					this.setState({
						ModalText:'确认添加广告位吗?'
					})
				}else{
					this.setState({
						ModalText:'确认修改广告位吗?'
					})
				}
				console.log(data);
      	this.setState({
					datas:data,
					visible: true,
				});
				

      }
    });
  };
	hidemodal = () =>{
		this.setState({
      visible: false,
    });
	}
	handleOk = () => {
	const { form, dispatch } = this.props;
    this.setState({
      confirmLoading: true,
    });
    if( this.props.location.state.id_ != undefined ){
    	 dispatch({
	      type: 'active/bj',
	      payload: this.state.datas,
	    });
    }else{
    	dispatch({
	      type: 'active/addbanner',
	      payload: this.state.datas,
	    });
    };
   
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }
   handleCancel = () => {
  	this.setState({ previewVisible: false })
	};
 
	onChangedate(values){

	}
navgos =() =>{
	let thats = this.props.that;
  this.props.history.push({
		pathname:'../../active/banner',
	})
}
  render() {
  	
  	const {active,loading,submitting,form} = this.props;
  	const { getFieldDecorator, getFieldValue } = form;
  	const {
  		data,
  		previewVisible, 
   		previewImage,
   		facepage,
   		fileList,
   		visible,
   		confirmLoading,
   		ModalText, 
  	
  	} = this.state;
  	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log(data.starttime);
    return (
      <PageHeaderLayout title="广告位编辑" >
      	<Card bordered={false}>
      	<h3>
      		{data.selindex == 'index' ? '首页轮播位':'附近轮播位' }序号{data.id_}
      	</h3>
      		<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('enable_', {
                initialValue: data.enable_,
                rules: [
                  {
                    required: true,
                    message: '请选择状态',
                  },
                ],
              })(
              	<Select onChange={this.selchange.bind(this)}>
                	<Option value="0">下架</Option>
                	<Option value="1">上架</Option>
              	</Select>
            	)}
            </FormItem>
             <FormItem {...formItemLayout} label="日期">
              {getFieldDecorator('date', {
                initialValue:data.starttime != undefined ?[moment(data.starttime, dateFormat),moment(data.endtime, dateFormat)]:'',
              	rules: [
                  {
                    required: true,
                    message: '请选择日期',
                  },
                ],
              })(
              	<RangePicker onChange={this.onChangedate} format={dateFormat} />
            	)}
            </FormItem>
             
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
                initialValue:data.title,
              })(<Input placeholder="请输入标题" />)}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label='链接'
            >
              {getFieldDecorator('url',{
                initialValue:data.url,
                
              })(
                <Input placeholder="请输入链接" />
              )}
            </FormItem>
             <FormItem
              {...formItemLayout}
              label='图片'
            >
              {getFieldDecorator('img_url',{
                initialValue:data.img_url,
              })(
                <Upload
				          action={apidd}
				          listType="picture-card"
				          fileList={facepage}
				          onPreview={this.facepagehandlePreview}
				          onChange={this.facepagehandleChange}
				        >
				          {facepage.length >= 1 ? null : uploadButton}
				        </Upload>
				        
              )}
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
				          <img alt="example" style={{ width: '100%' }} src={previewImage} />
				        </Modal>
            </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button onClick={this.navgos} style={{ marginLeft: 8 }}>取消</Button>
            </FormItem>
          </Form>
	      </Card>  
	      <Modal title="Title"
	          visible={visible}
	          onOk={this.handleOk}
	          confirmLoading={confirmLoading}
	          onCancel={this.hidemodal}
	        >
	          <p>{ModalText}</p>
	        </Modal>
      </PageHeaderLayout>
    );
  }
}


