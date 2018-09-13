import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
  Divider,
  Cascader,
  Upload,
  Modal,
  Switch,
	TimePicker 
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './add.less';
import moment from 'moment';
import {bankCardAttribution} from '../../assets/bank';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
import {apidd} from '../../services/api.js';
const dateFormat = 'YYYY/MM/DD';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ merchant,loading }) => ({
  submitting: loading.models.merchant,
  merchant,
}))
@Form.create()
export default class BasicForms extends PureComponent {
 	state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    facepage:[],//门脸照
    Environmental_illumination_fileList:[],//环境照
    business:[],//营业执照
    Positive:[],//身份证正面照
    Back:[],//身份证反面照
    other:[],//其他证明
    bankname:'',
    disabledDate:false,
    statrtime:'',
    endtime:'',
    data:{},
    ModalText: '确认添加商户',
   	mapshow:1,
   	start_lng:116.402544,
   	start_lat:39.928216,
   	city_datas:'',
  };
  handleCancel = () => {
  	this.setState({ previewVisible: false })
	};
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
  business_handlePreview = (file) =>{
		this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  business_handleChange = ({ fileList,event }) => {
		this.setState({
			business:[...fileList]
		})
	}
  Environmental_illumination_handlePreview= (file) =>{
  	this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  Environmental_illumination_handleChange = ({ fileList,event }) => {
		this.setState({
			Environmental_illumination_fileList:[...fileList]
		})
	}
  Positive_handlePreview= (file) =>{
  	this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  Positive_handleChange = ({ fileList,event }) => {
		this.setState({
			Positive:[...fileList]
		})
	}
  Back_handlePreview= (file) =>{
  	this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  Back_handleChange = ({ fileList,event }) => {
		this.setState({
			Back:[...fileList]
		})
	}
  other_handlePreview= (file) =>{
  	this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
  other_handleChange = ({ fileList,event }) => {
		this.setState({
			other:[...fileList]
		})
	}
  
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
  	this.setState({ fileList })

	}
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      values.area == undefined ? '':values.area;
    	let c = [];
    	if( this.state.facepage[0] != undefined ){
    		 c.push(this.state.facepage[0].response.data);
    	}
      var list = [];
   		this.state.Environmental_illumination_fileList.forEach(function(x,y){
    		list.push(x.response.data);
    		 c.push(x.response.data);
      });
      let list1 = [];
      this.state.other.forEach(function(x,y){
      	list1.push(x.response.data);
      })
      const rangeValue = values.date;
			var data = {
				signInName:values.signInName,
				signInPhone :values.signInPhone,
				Seller:{
						address:values.address,
						area:values.area[2],
						province:values.area[0],
						city :values.area[1],
						doorCard:this.state.facepage[0] != undefined ? this.state.facepage[0].response.data:'',
						environmentPhoto:list,
						imgs:c,
						fontName:values.fontName,
						identityCardPhotoUp:this.state.Positive[0] != undefined ?this.state.Positive[0].response.data:'',
						identityCardPhotoLow: this.state.Positive[0] !=undefined ? this.state.Back[0].response.data:'',
						longTermValidity:!this.state.disabledDate,
						otherProof:list1,
						registeredNumber:values.registeredNumber,
						sellerType:values.sellerType,
						permitPhoto:this.state.business[0] !=undefined ?this.state.business[0].response.data:'',
						categoryId:values.categoryId,
						title:values.title,
						termOfValitdityStart:this.state.statrtime,
						termOfValitdityEnd:this.state.endtime,
						identityCardName:values.identityCardName,
						identityCardNo:values.identityCardNo,
						telephone:values.telephone,
						lat:this.state.start_lat,
						lon:this.state.start_lng,
						openTime:'1970-10-10 '+moment(values.openTime).format('HH:mm:ss'),
						closeTime:'1970-10-10 '+moment(values.closeTime).format('HH:mm:ss'),
					},
					SellerAccouny:{
						accountNumberType:values.accountNumberType,
						accountHolder:values.accountHolder,
						accountNumber:values.accountNumber,
						openBankName:values.openBankName,
						bankName:this.state.bankname,
						area:values.areae[2],
						city:values.areae[1], 
						province:values.areae[0] 
					}
			};
			 
			this.setState({
				data:data,
				visible: true,
			});
        
      }
    });
  };
  renderChild =(d) => {
		let children = [];
		if(d != undefined && d != NaN ){
			d.forEach(function(x,y){
				children.push(<Option value={x.id} key={y+1}>{x.title}</Option>);
			})
		}
		return children;
		
	}
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
};
	loadDatae = (selectedOptions) => {
		const {dispatch} = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
		if( selectedOptions.length == 2 ){
			dispatch({
	      type: 'merchant/citye',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption,
	        no:true
	      },
	    });
		}else{
			dispatch({
	      type: 'merchant/citye',
	      payload: {
	        pId:parseInt(targetOption.value),
	        modelMap:'',
	        targetOption:targetOption
	      },
	    });
		}
  };
	swonChange = (e) =>{
		this.setState({
			disabledDate:!e
		})
	}
	onChangedate = (x,y) =>{
		this.setState({
			statrtime:y[0],
			endtime:y[1]
		})
	}
	onChangedates = (x,y) =>{
		this.setState({
			statrtime:y,
		})
	}
	inputchange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
     var d = bankCardAttribution(e.target.value);
      if( d != 'error' ){
     		this.setState({
     			bankname:d.bankName
     		})
     	}
    }
  }
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
    dispatch({
      type: 'merchant/add',
      payload: this.state.data,
    });
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }

	onChanges(values,valuess){

		let city_data = '';
		valuess.forEach(function(x,y){
			city_data = city_data +x.label;
		});
		this.setState({
			city_datas:city_data
		})

			


	}
	inputvalue = (e) => {
		let _this = this;
		const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

    }
		var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(_this.state.city_datas+e.target.value, function(point){
			if (point) {
				_this.setState({
					start_lng:point.lng,
					start_lat:point.lat
				})
			}else{

			}
		});
	}
	openmap(){
		this.setState({
			mapshow:0
		})
	}
	close_map(){
		this.setState({
			mapshow:1
		})
	}
  componentWillMount() {
    const { dispatch } = this.props;
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
	  dispatch({
	    type: 'merchant/citye',
	    payload: {
	      pId:'ZHCN',
	      modelMap:''
	    },
	  });
  }
  
  getEvents() {
    return {
      click: (e) => {
        this.setState({
			   	start_lng:e.point.lng,
			   	start_lat:e.point.lat,
        })
      }
    }
  }
  render() {
  	const {
      merchant: { 
      	optionss,
      	fl,
      	optionsss,
      },
      loading,
    } = this.props;
   	const { 
   		previewVisible, 
   		previewImage,
   		facepage,
   		fileList,
   		Environmental_illumination_fileList,
   		business,
   		Positive,
   		Back,
   		other,
   		visible,
   		confirmLoading,
   		ModalText, 
   	} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadButtons = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
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
        sm: { span: 3, offset: 10 },
      },
    };
//  onChange={this.inputvalue}
    return (
      <PageHeaderLayout
        title="添加商户"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}  encType='multipart/form-data'  >
          	<Row gutter={24}>
          		<Col span={24}>
          			<h3>申请人</h3>
          		</Col>
          		<Col span={12}>
          			<FormItem {...formItemLayout} label="姓名">
		              {getFieldDecorator('signInName', {
		                rules: [
		                  {
		                    required: true,
		                    message: '请输入姓名',
		                  },
		                ],
		              })(<Input placeholder="请输入姓名" />)}
		            </FormItem>
          		</Col>
          		<Col span={12}>
          			 <FormItem {...formItemLayout} label="手机">
		              {getFieldDecorator('signInPhone', {
		                rules: [
		                  {
		                    required: true,
		                    message: '请输入手机',
		                  },
		                ],
		              })(<Input placeholder="给目标起个手机" />)}
		            </FormItem>
          		</Col>
          	</Row>
          	 <Divider style={{ marginBottom: 32 }} />
          	 <Row gutter={24}>
          	 	<Col span={24}>
          	 		<h3>店铺信息</h3>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem {...formItemLayout} label="门店名称">
		              {getFieldDecorator('title', {
		                rules: [
		                  {
		                    required: true,
		                    message: '请输入门店名称',
		                  },
		                ],
		              })(<Input placeholder="请输入门店名称" />)}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 	<FormItem {...formItemLayout} label="分店名称">
		              {getFieldDecorator('titles')(<Input placeholder="请输入分店名称" />)}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="城市" {...formItemLayout}>
		              {getFieldDecorator('area',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入城市',
		                  },
		                ],
		              })(
			              <Cascader  changeOnSelect loadData={this.loadData} options={this.props.merchant.optionss} onChange={this.onChanges.bind(this)} placeholder="请选择地区" />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 			<FormItem {...formItemLayout} label="详情地址">
		              {getFieldDecorator('address',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入详细地址',
		                  },
		                ],
		              })(
		              	<Input placeholder="请输入详情地址"  onBlur={ ::this.inputvalue.bind(this)}  />
	              	)}
		              <Button onClick={this.openmap.bind(this)}>地图定位</Button>
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem {...formItemLayout} label="门店电话">
		              {getFieldDecorator('telephone', {
		                rules: [
		                  {
		                    required: true,
		                    message: '请输入门店电话',
		                  },
		                ],
		              })(<Input placeholder="请输入门店电话" />)}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="店铺分类" {...formItemLayout}>
		              {getFieldDecorator('categoryId',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请选择店铺分类',
		                  },
		                ],
		              })(
		                <Select placeholder="请选择店铺分类"  >
		                		<Option value='' key='0'>全部</Option>
		                 		{this.renderChild(this.props.merchant.fl)}
		                </Select>
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="开门时间" {...formItemLayout}>
		              {getFieldDecorator('openTime',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请选择开门时间',
		                  },
		                ],
		              })(
		                <TimePicker />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="打烊时间" {...formItemLayout}>
		              {getFieldDecorator('closeTime',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请选择打样时间',
		                  },
		                ],
		              })(
		                <TimePicker />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={23} offset={1}>
          	 		<div className="titles">
          	 			门脸照上传
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={facepage}
					          onPreview={this.facepagehandlePreview}
					          onChange={this.facepagehandleChange}
					        >
					          {facepage.length >= 1 ? null : uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>
          	 	</Col>
          	 	<Col span={23} offset={1}>
          	 		<div className="titles">
          	 			环境照上传
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={Environmental_illumination_fileList}
					          onPreview={this.Environmental_illumination_handlePreview}
					          onChange={this.Environmental_illumination_handleChange}
					        >
					          {Environmental_illumination_fileList.length >= 5 ? null : uploadButtons}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>
          	 	</Col>
          	 </Row>
          	<Divider style={{ marginBottom: 32 }} />
          	<Row gutter={24}>
          	 	<Col span={24}>
          	 		<h3>资料信息</h3>
          	 	</Col>
          	 	<Col span={8} >
        	 			<FormItem label="门店类型" {...formItemLayout}>
		              {getFieldDecorator('sellerType',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请门店类型',
		                  },
		                ],
		              })(
		                <Select placeholder="请选择门店类型"  >
	                		<Option value='1' key={1}>个体工商户</Option>
	                		<Option value='2' key={2}>企业公司</Option>
		                </Select>
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={23} offset={1}>
          	 		<div className="titles">
          	 			营业执照上传
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={business}
					          onPreview={this.business_handlePreview}
					          onChange={this.business_handleChange}
					        >
					          {business.length >= 1 ? null : uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>	
          	 	</Col>
          	 	<Col span={7}>
          	 		<FormItem label="注册号" {...formItemLayout}>
		              {getFieldDecorator('registeredNumber',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入注册号',
		                  },
		                ],
		              })(
		               <Input placeholder="请输入注册号" />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem  label="有效期" {...formItemLayout} style={{display:this.state.disabledDate ? 'block':'none'}}>
		              {getFieldDecorator('date')(
								    <RangePicker onChange={this.onChangedate}  />
										
		              )}
		            </FormItem>
		            <FormItem  label="有效期" {...formItemLayout} style={{display:this.state.disabledDate ? 'none':'block'}}>
		              {getFieldDecorator('dates')(
										<DatePicker onChange={this.onChangedates}   />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={2} style={{marginLeft:'-150px'}}>
          	 	 	<Switch checkedChildren="长期有效" unCheckedChildren="定期有效" onChange={this.swonChange} defaultChecked={true} />
          	 	</Col>
          	 	<Col span={7}>
          	 		<FormItem label="字号名称" {...formItemLayout}>
		              {getFieldDecorator('fontName',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入字号名称',
		                  },
		                ],
		              })(
		                <Input placeholder="请输入字号名称" />
		              )}
		            </FormItem>
          	 	</Col>
          	</Row>
          	<Divider style={{ marginBottom: 32 }} />
          	<Row gutter={24}>
          		<Col span={24}>
          	 		<h3>经营者/法人身份证</h3>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="姓名" {...formItemLayout}>
		              {getFieldDecorator('identityCardName',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入姓名',
		                  },
		                ],
		              })(
		                <Input placeholder="请输入字号姓名" />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="证件号" {...formItemLayout}>
		              {getFieldDecorator('identityCardNo',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入证件号',
		                  },
		                ],
		              })(
		                <Input placeholder="请输入证件号" />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={11} offset={1} >
          	 		<div className="titles">
          	 			身份证正面
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={Positive}
					          onPreview={this.Positive_handlePreview}
					          onChange={this.Positive_handleChange}
					        >
					          {Positive.length >= 1 ? null : uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>	
          	 	</Col>
          	 	<Col span={11} offset={1} >
          	 		<div className="titles">
          	 			身份证反面
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={Back}
					          onPreview={this.Back_handlePreview}
					          onChange={this.Back_handleChange}
					        >
					          {Back.length >= 1 ? null : uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>	
          	 	</Col>
          	</Row>
          	<Divider style={{ marginBottom: 32 }} />
          	<Row gutter={24}>
          		<Col span={24}>
          			<h3>银行卡信息</h3>
          		</Col>
          		<Col span={8}>
          			<FormItem label="账户类型" {...formItemLayout}>
		              {getFieldDecorator('accountNumberType',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请选择账户类型',
		                  },
		                ],
		              })(
		                <Select placeholder="请选择账户类型"  >
		                		<Option value='1' key={0}>经营者账户</Option>
		                		<Option value='2' key={1}>公司账户</Option>
		                		<Option value='3' key={2}>法人账户</Option>
		                </Select>
		              )}
		            </FormItem>
          		</Col>
          		<Col span={8}>
          			<FormItem label="开户人" {...formItemLayout}>
		              {getFieldDecorator('accountHolder',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入开户人',
		                  },
		                ],
		              })(
		               <Input placeholder="请输入开户人" />
		              )}
		            </FormItem>
          		</Col>
          		<Col span={8}>
          			<FormItem label="银行卡号" {...formItemLayout}>
		              {getFieldDecorator('accountNumber',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入银行卡号',
		                  },
		                ],
		              })(
		                <Input  placeholder="请输入银行卡号" onChange={this.inputchange} />
		              )}
		            </FormItem>
          		</Col>
          		<Col span={8}>
          			<FormItem label="银行名称" {...formItemLayout} >
          				<div>{this.state.bankname}</div>
          			</FormItem>
          		</Col>
        			<Col span={8}>
          	 		<FormItem label="城市" {...formItemLayout}>
		              {getFieldDecorator('areae',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请选择城市',
		                  },
		                ],
		              })(
		              	<Cascader changeOnSelect loadData={this.loadDatae} options={this.props.merchant.optionsss} placeholder="请选择地区" />
		              )}
		            </FormItem>
          	 	</Col>
          	 	<Col span={8}>
          	 		<FormItem label="开户行名称" {...formItemLayout}>
		              {getFieldDecorator('openBankName',{
		              	rules: [
		                  {
		                    required: true,
		                    message: '请输入开户行名称',
		                  },
		                ],
		              })(
		               <Input placeholder="请输入开户行名称" />
		              )}
		            </FormItem>
          	 	</Col>
          	</Row>
          	<Divider style={{ marginBottom: 32 }} />
          	<Col span={23} offset={1} >
          	 		<div className="titles">
          	 			其他证明
          	 		</div>
          	 		<div className="clearfix">
					        <Upload
					          action= {apidd}
					          listType="picture-card"
					          fileList={other}
					          onPreview={this.other_handlePreview}
					          onChange={this.other_handleChange}
					        >
					          {other.length >= 10 ? null : uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>	
          	 	</Col>
          	 	<Col span={24}>
		            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
		              <Button type="primary" htmlType="submit" loading={submitting}>
		              		提交
		              </Button>
		              <Button style={{ marginLeft: 8 }}>返回</Button>
		            </FormItem>
            </Col>
          </Form>
          <Modal title="Title"
	          visible={visible}
	          onOk={this.handleOk}
	          confirmLoading={confirmLoading}
	          onCancel={this.hidemodal}
	        >
	          <p>{ModalText}</p>
	        </Modal>
	        <div className={styles.map_bj} style={{display:this.state.mapshow == 0? 'block':'none'}}>
	        	<Icon type="close-circle-o" onClick={this.close_map.bind(this)} />
	        	<div className={styles.map_content}>
	        		<Map events={this.getEvents()} style={{height: '550px'}}  center={{lng: this.state.start_lng, lat: this.state.start_lat}} zoom="12">
						    <Marker position={{lng: this.state.start_lng, lat:this.state.start_lat}} />
						    <NavigationControl /> 
							</Map>
	        	</div>
	        </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
