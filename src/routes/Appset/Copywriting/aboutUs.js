import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
Row,
Col,
Card,
Button,
Input,
message 
} from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
const editorProps = {
  height: 500,
  contentFormat: 'html',
  excludeControls:['emoji','clear','media']
}
@connect(({ copywriting, loading }) => ({
copywriting,
loading: loading.models.copywriting,
}))
export default class TableList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			content1:'',
			content2:'',
			content3:'',
			content4:'',
			content:'',
			id:'',
			id1:'',
			id2:'',
			id3:'',
			id4:'',
			id:2020
		};
	};
	
  componentWillMount() {
  	const _this = this;
	 	const { dispatch } = _this.props;
		_this.setState({
			id:_this.props.location.state.id,
		},()=>{
		  dispatch({
		    type: 'copywriting/aboutus',
		    payload:{
		    	id:_this.state.id
		    },
		    callback(data){
		    	_this.setState({
		    		id:data[2].id,
			    	id1:data[0].id,
			    	id2:data[1].id,
			    	id3:data[3].id,
			    	id4:data[4].id,
			    	content:data[2].codeText,
			    	content1:data[0].codeText,
			    	content2:data[1].codeText,
			    	content3:data[3].codeText,
			    	content4:data[4].codeText
		    	})
		    	
		    }
		  });
		})
 	}
 	onChange = (content) => {
    this.setState({
    	content:content
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
	      	codeText:this.state.content3
	      },
	      {
	      	id:this.state.id4,
	      	codeText:this.state.content4
	      },
      ]
    });
  }
  input1=(e)=>{
  	this.setState({
    	content1:e.target.value
    })
  }
  input2=(e)=>{
  	this.setState({
    	content2:e.target.value
    })
  }
  input3=(e)=>{
  	this.setState({
    	content3:e.target.value
    })
  }
  input4=(e)=>{
  	this.setState({
    	content4:e.target.value
    })
  }
  render() {
    const {
      copywriting: { aboutus },
      loading,
    } = this.props;
    console.log(this.state.content,this.state.id)
    return (
      <PageHeaderLayout title="个人-关于我们">
          <Card bordered={false}>
       			<Row gutter={24}>
       				<Col span={2}>
       					<span>微信公众号:</span>
       				</Col>
       				<Col span={6}>
       					<Input onChange={this.input1} value={this.state.content1} />
       				</Col>
       				<Col span={2} offset={8} >
       					<span>官方微信:</span>
       				</Col>
       				<Col span={6}>
       					<Input onChange={this.input2} value={this.state.content2} />
       				</Col>
       				<div style={{clear:'both',height:'32px'}}></div>
       				<Col span={2}>
       					<span>官方网站:</span>
       				</Col>
       				<Col span={6}>
       					<Input onChange={this.input3} value={this.state.content3}/>
       				</Col>
       				<Col span={2} offset={8} >
       					<span>版本号:</span>
       				</Col>
       				<Col span={6}>
       					<Input onChange={this.input4} value={this.state.content4}/>
       				</Col>
       				<Col span={2}>
       					<span>文本说明:</span>
       				</Col>
       				<Col span={20} style={{border:'1px solid #dedede',marginTop:'30px'}}>
       					<BraftEditor {...editorProps}
       						initialContent={this.state.content}
       						contentId={this.state.id}
       						onChange={this.onChange}
       					/>
       				</Col>
       				<Col span={2} offset={11} style={{marginTop:'32px'}}>
       					<Button type="primary" onClick={this.onSave}>保存</Button>
       				</Col>
       			</Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
