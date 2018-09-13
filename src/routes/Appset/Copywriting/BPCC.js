import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Upload,
  Input,
  Icon,
  Button,
  Badge,
  Divider,
  Cascader,
  Tabs,
  Table,
  Modal
} from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
const editorProps = {
  height: 300,
  contentFormat: 'html',
  excludeControls:['emoji','clear','media']
}
const TabPane = Tabs.TabPane;
import {apidd} from '../../../services/api.js';
@connect(({ copywriting, loading }) => ({
copywriting,
loading: loading.models.copywriting,
}))
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
  	facepage:[{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  	previewVisible: false,
    previewImage: '',
    input_text:'',
    content:'',
    content1:'',
    content3:'',
    modalVisible1: false,
  	facepage1:[{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  	previewVisible1: false,
    previewImage1: '',
    input_text1:'',
    content2:'',
    id:'',
    id1:'',
    id2:'',
    id3:'',
    id4:'',
    id5:'',
    id6:'',
    content4:'',
    content5:'',
  };
  componentWillMount() {
  	const _this = this;
    const { dispatch } = _this.props;
		_this.setState({
			id:_this.props.location.state.id,
		},()=>{
		  dispatch({
		    type: 'copywriting/bpcc1',
		    payload:{
		    	id:_this.state.id,
		    	sortNo:1
		    },
		    callback(data){
		    	let datas = [{
		    		url:data[3].codeText,
		    		uid: -1,
			      name: '',
			      status: 'done',
		    	}];
		    	_this.setState({
		    		id:data[0].id,
		    		id1:data[1].id,
		    		id2:data[2].id,
		    		id3:data[3].id,
		    		content:data[0].codeText,
		    		content1:data[1].codeText,
		    		content2:data[2].codeText,
		    		facepage:datas
		    	})
		    }
		  });
		})
  }
	callback(key) {
  	const _this = this;
    const { dispatch } = _this.props;
  	if( key == 1 ){
			_this.setState({
				id:_this.props.location.state.id,
			},()=>{
			  dispatch({
			    type: 'copywriting/bpcc1',
			    payload:{
			    	id:_this.state.id,
			    	sortNo:1
			    },
			    callback(data){
			    	let datas = [{
			    		url:data[3].codeText,
			    		uid: -1,
				      name: '',
				      status: 'done',
			    	}];
			    	_this.setState({
			    		id:data[0].id,
			    		id1:data[1].id,
			    		id2:data[2].id,
			    		id3:data[3].id,
			    		content:data[0].codeText,
			    		content1:data[1].codeText,
			    		content2:data[2].codeText,
			    		facepage:datas
			    	})
			    }
			  });
			})
  	}else{
  		_this.setState({
				id:_this.props.location.state.id,
			},()=>{
			  dispatch({
			    type: 'copywriting/bpcc1',
			    payload:{
			    	id:_this.state.id,
			    	sortNo:2
			    },
			    callback(data){
			    	let datas = [{
			    		url:data[1].codeText,
			    		uid: -1,
				      name: '',
				      status: 'done',
			    	}];
			    	_this.setState({
			    		id4:data[0].id,
			    		id5:data[2].id,
			    		id6:data[1].id,
			    		content4:data[0].codeText,
			    		content5:data[2].codeText,
			    		facepage1:datas
			    	})
			    }
			  });
			})
  	}
			
	}
 	onChange = (content) => {
    this.setState({
    	content:content
    })
  }
	onChange1 = (content) => {
    this.setState({
    	content1:content
    })
  }
	inputchang=( e )=>{
		this.setState({
    	content2:e.target.value
    })
	}
  onSave = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'copywriting/save',
      payload:[
      	{
      		id:this.state.id,
      		codeText:this.state.content
      	},
      	{
      		id:this.state.id1,
      		codeText:this.state.content1
      	},
      	{
      		id:this.state.id2,
      		codeText:this.state.content2
      	},
      	{
      		id:this.state.id3,
      		codeText:this.state.facepage[0].url != undefined ? this.state.facepage[0].url:this.state.facepage[0].response.data
      	}
      ]
    });
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
	handleCancel = () => {
  	this.setState({ previewVisible: false })
	};



 	onChange2 = (content) => {
    this.setState({
    	content4:content
    })
  }

	inputchang1=( e )=>{
		this.setState({
    	content5:e.target.value
    })
	}
  onSave1 = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'copywriting/save',
      payload:[
      	{
      		id:this.state.id4,
      		codeText:this.state.content4
      	},
      	{
      		id:this.state.id5,
      		codeText:this.state.content5
      	},
      	{
      		id:this.state.id6,
      		codeText:this.state.facepage1[0].url != undefined ? this.state.facepage1[0].url:this.state.facepage1[0].response.data
      	}
      ]
    });
  }
	facepagehandlePreview1 = (file) =>{
		this.setState({
      previewImage1: file.url || file.thumbUrl,
      previewVisible1: true,
    });
	}
  facepagehandleChange1 = ({ fileList,event }) => {
		this.setState({
			facepage1:[...fileList]
		})
	}
	handleCancel1 = () => {
  	this.setState({ previewVisible1: false })
	};


  render() {
  	const {copywriting:{bpcc1},loading} = this.props;

		const { selectedRows, modalVisible } = this.state;
		const { 
   		previewVisible, 
   		previewImage,
   		facepage,
   		facepage1,
   		previewImage1,
   		previewVisible1
   	} = this.state;
   	const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadButton1 = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderLayout title="BPCC获取">
      	<Card bordered={false}>
      		<Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
				    <TabPane tab="关注公众号" key="1">
				    	<Row gutter={24}>
				    		<Col span={2}>
				    			<span>关注公众号提示:</span>
				    		</Col>
				    		<Col span={21} style={{border:'1px solid #dedede'}}>
				    			<BraftEditor {...editorProps}
	       						initialContent={this.state.content}
	       						onChange={this.onChange}
	       						contentId={this.state.id}
	       					/>
				    		</Col>
				    		<div style={{width:'100%',height:'32px',float:'left'}}></div>
				    		<Divider style={{marginTop:'32px'}} />
				    		<Col span={2}>
				    			<span>关注公众号流程:</span>
				    		</Col>
				    		<Col span={21} style={{border:'1px solid #dedede'}}>
				    			<BraftEditor {...editorProps}
	       						initialContent={this.state.content1}
	       						onChange={this.onChange1}
	       						contentId={this.state.id1}
	       					/>
				    		</Col>
				    		<div style={{width:'100%',height:'32px',float:'left'}}></div>
				    		<Divider style={{marginTop:'32px'}} />
				    		<Col span={2}>
				    			<span>公众号名称:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Input onChange={this.inputchang} value={this.state.content2}  />
				    		</Col>
				    		<Col span={2} offset={1}>
				    			<span>二维码展示:</span>
				    		</Col>
				    		<Col span={10}>
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
				    		</Col>
				    		<Col span={2} offset={11} style={{marginTop:'32px'}}>
	       					<Button type="primary" onClick={this.onSave}>保存</Button>
	       				</Col>
				    	</Row>
				    </TabPane>
				    <TabPane tab="加入交流群" key="2">
				  		<Row gutter={24}>
				    		<Col span={2}>
				    			<span>加入交流群提示:</span>
				    		</Col>
				    		<Col span={21} style={{border:'1px solid #dedede'}}>
				    			<BraftEditor {...editorProps}
	       						initialContent={this.state.content4}
	       						onChange={this.onChange2}
	       						contentId={this.state.id4}
	       					/>
				    		</Col>
				    		<div style={{width:'100%',height:'32px',float:'left'}}></div>
				    		<Divider style={{marginTop:'32px'}} />
				    		
				    		<Col span={2}>
				    			<span>公众号名称:</span>
				    		</Col>
				    		<Col span={7}>
				    			<Input onChange={this.inputchang1} value={this.state.content5}  />
				    		</Col>
				    		<Col span={2} offset={1}>
				    			<span>二维码展示:</span>
				    		</Col>
				    		<Col span={10}>
				    			<Upload
					          action={apidd}
					          listType="picture-card"
					          fileList={facepage1}
					          onPreview={this.facepagehandlePreview1}
					          onChange={this.facepagehandleChange1}
					        >
					          {facepage1.length >= 1 ? null : uploadButton1}
					        </Upload>
					        <Modal visible={previewVisible1} footer={null} onCancel={this.handleCancel1}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage1} />
					        </Modal>
				    		</Col>
				    		<Col span={2} offset={11} style={{marginTop:'32px'}}>
	       					<Button type="primary" onClick={this.onSave1}>保存</Button>
	       				</Col>
				    	</Row>
				    </TabPane>
				  </Tabs>
	      </Card>  
      </PageHeaderLayout>
    );
  }
}


