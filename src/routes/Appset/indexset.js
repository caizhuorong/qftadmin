import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Icon,
  Button,
  Avatar,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message 
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link,hashHistory } from 'dva/router';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
import {apidd} from '../../services/api.js';
@connect(({ appset, loading }) => ({
  appset,
  loading: loading.models.appset,
}))
@Form.create()
export default class TableList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
	    expandForm: false,
	    selectedRows: [],
	    visible: false,
	    loading: false,
	    imageUrl:'',
	    title:'',
	    stat:'',
	    pai:'',
	    id:'',
	    setimg:'',
		};
		this.beforeUpload = this.beforeUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selhandleChange = this.selhandleChange.bind(this);
		this.getBase64 = this.getBase64.bind(this);
		this.navGo = this.navGo.bind(this);
		this.handleOk = this.handleOk.bind(this);
	};
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'appset/showActivities',
      callback:function(data){
      }
    });
   
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
 		
  };
	handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
			this.setState({
				setimg:info.fileList[info.fileList.length-1].response.data
			})
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
        
      }));
    }
  }
	navGo(id){
		const _this = this;
		_this.props.appset.data.list.forEach(function(x,y){
			if( id == x.id ){
				_this.setState({
					id:x.id,
					imageUrl:x.logo,
	    		title:x.title,
	    		stat:x.taskType,
	    		pai:x.sort,
					visible: true,
				})
			}
		})
  }
 selhandleChange(val){
 	this.setState({
 		stat:val
 	})
 }
  beforeUpload(file) {
	  const isLt2M = file.size / 1024 / 1024 < 2;
	  if (!isLt2M) {
	    message.error('Image must smaller than 2MB!');
	  }
	  return isLt2M;
	}
	getBase64(img, callback) {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img);
	}
  handleOk = (e) => {
  	const _this = this;
  	const {dispatch} = _this.props;
  	 dispatch({
      type: 'appset/editActivities',
      payload:{
			  id:_this.state.id,
			  logo:_this.state.setimg,
			  title:_this.state.title,
			  taskType:_this.state.stat,
			  sort:_this.state.pai
      },
      callback:function(data){
      	_this.setState({
			    visible: false,
			    id:'',
					setimg:'',
					title:'',
					stat:'',
					pai:''
			  },()=>{
			  	dispatch({
			      type: 'appset/showActivities',
			      callback:function(data){
			      }
			    });
			  });
      }
    });
   
  }
	inputchange(e){
		this.setState({
			title:e.target.value
		})
	}
	inputschang(e){
		this.setState({
			pai:e.target.value
		})
	}
  handleCancel = (e) => {
    this.setState({
      visible: false,
      id:'',
			setimg:'',
			title:'',
			stat:'',
			pai:''
    });
  }
  render() {
    const {
      appset: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'sort',
      },
      {
        title: '图标',
        dataIndex: 'logo',
        render(val) {
        	 return (<Avatar shape="square" size={64} src={val} />);
        },
       
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '操作人',
        dataIndex: 'adminName',
      },
      {
        title: '上传时间',
        dataIndex: 'updateTime',
      },
      {
        title: '状态',
        dataIndex: 'taskType',
        render(val) {
        	var name = '';
        	switch(val){
        		case 'index':
        			name = '显示';
        			break;
      			default:
      				name = '隐藏';
      				break;
        	}
          return name;
        },
      },
      {
        title: '更多',
        render: (text,record,index) => {
	        return  (
	        	<Fragment>
            	<a onClick={()=>this.navGo(record.id)}>编辑</a>
          	</Fragment>
        	);
        },
      },
    ];
    
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    
    return (
      <PageHeaderLayout title="首页任务栏配置">
          <Card bordered={false}>
          <div className={styles.tableList}>
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
        
        <Modal
          title="标签配置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        	<Row gutter={24}>
        		<Col span={8} offset={8}>
		          <Upload
				        listType="picture-card"
				        className="avatar-uploader"
				        showUploadList={false}
				        action={apidd}
				        beforeUpload={this.beforeUpload}
				        onChange={this.handleChange}
				      >
				        {this.state.imageUrl ? <img style={{width:'100%'}} src={this.state.imageUrl} alt="avatar" /> : uploadButton}
				      </Upload>
				    </Col>
				    <Col span={20} offset={2}>
				    	<div className={styles.divs}>
								<label className={styles.labels}>标签名称:</label>
								<Input className={styles.spans} onChange={this.inputchange.bind(this)} placeholder="请输入标签名称" value={this.state.title}  />
							</div>
				    </Col>
				    <Col span={20} offset={2}>
				    	<div className={styles.divs}>
					    	<label className={styles.labels}>显示状态:</label>
					    	<Select className={styles.spans}  value={this.state.stat} style={{ width:'80%' }} onChange={this.selhandleChange}>
						      <Option value='index'>首页显示</Option>
						      <Option value=''>隐藏</Option>
						      <Option value='bpcc'>BPCC显示</Option>
						    </Select>
					    </div>
				    </Col>
				    <Col span={20} offset={2} style={{display:this.state.stat == 'index' ||this.state.stat == 'bpcc' ? 'block':'none'}}>
				    	<div className={styles.divs}>
					    	<label className={styles.labels}>排列顺序:</label>
					    	<Input className={styles.spans} placeholder="请输入排列顺序"  onChange={this.inputschang.bind(this)} value={this.state.pai}  />
			    		</div>
				    </Col>
       		</Row>
        </Modal>
	       
      </PageHeaderLayout>
    );
  }
}
