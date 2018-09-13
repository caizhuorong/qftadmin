import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
Row,
Col,
Card,
Button,
Input,
message,
Divider
} from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {getFormatCode} from '../../../utils/utils.js';
import {getFormatCodes} from '../../../utils/utils.js';

const editorProps = {
  height: 300,
  contentFormat: 'html',
  excludeControls:['emoji','clear','media']
}
const { TextArea } = Input;
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
			id1:'',
			id2:'',
			id3:'',
			id4:'',
			id5:'',
			id6:'',
			content3:'',
			content4:'',
			content5:'',
			content6:'',
			id:2024
		};
	};
  componentWillMount() {
	 	const { dispatch } = this.props;
	 	const _this = this;
		_this.setState({
			id:_this.props.location.state.id,
		},()=>{
		  dispatch({
		    type: 'copywriting/reward',
		    payload:{
		    	id:_this.state.id
		    },
		    callback(data){
		    	_this.setState({
		    		id1:data[0].id,
		    		id2:data[1].id,
		    		id3:data[2].id,
		    		id4:data[3].id,
		    		id5:data[4].id,
		    		id6:data[5].id,
		    		content1:data[0].codeText,
		    		content2:getFormatCodes(data[1].codeText),
		    		content3:data[2].codeText,
		    		content4:getFormatCodes(data[3].codeText),
		    		content5:data[4].codeText,
		    		content6:getFormatCodes(data[5].codeText)
		    	});
		    }
		  });
		})
 	}
 	input1 = (e) => {
    this.setState({
    	content1:e.target.value
    })
  }
	input2 = (e) => {
    this.setState({
    	content2:e.target.value
    })
  }
	input3 = (e) => {
    this.setState({
    	content3:e.target.value
    })
  }
	input4 = (e) => {
    this.setState({
    	content4:e.target.value
    })
  }
	input5 = (e) => {
    this.setState({
    	content5:e.target.value
    })
  }
	input6 = (e) => {
    this.setState({
    	content6:e.target.value
    })
  }
  onSave = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'copywriting/save',
      payload:[
	      {
	      	id:this.state.id1,
	      	codeText:this.state.content1
	      },
	      {
	      	id:this.state.id2,
	      	codeText:getFormatCode(this.state.content2)
	      },
	      {
	      	id:this.state.id3,
	      	codeText:this.state.content3
	      },
	      {
	      	id:this.state.id4,
	      	codeText:getFormatCode(this.state.content4)
	      },
	      {
	      	id:this.state.id5,
	      	codeText:this.state.content5
	      },
	      {
	      	id:this.state.id6,
	      	codeText:getFormatCode(this.state.content6)
	      }
      ]
    });
  }
  render() {
    const {
      copywriting: { friends },
      loading,
    } = this.props;
    return (
      <PageHeaderLayout title="个人-获取机制">
          <Card bordered={false}>
       			<Row gutter={24}>
       				<Col span={1}>
       					<span>1:</span>
       				</Col>
       				<Col span={20}>
       					<Input onChange={this.input1} defaultValue={this.state.content1} />
       				</Col>
       				<Col span={20} offset={1} style={{marginTop:'20px'}}>
       					<TextArea rows={5} onChange={this.input2} value={this.state.content2} autosize/>
       				</Col>
       				<div style={{width:'100%',height:'32px',float:'left'}}></div>
			    		<Divider style={{marginTop:'32px'}} />
				    	<Col span={1}>
       					<span>2:</span>
       				</Col>
       				<Col span={20} >
       					<Input onChange={this.input3} defaultValue={this.state.content3}/>
       				</Col>
       				<Col span={20} offset={1} style={{marginTop:'20px'}}>
       					<TextArea rows={5} onChange={this.input4} value={this.state.content4} autosize/>
       				</Col>
       				<div style={{width:'100%',height:'32px',float:'left'}}></div>
			    		<Divider style={{marginTop:'32px'}} />
			    		<Col span={1}>
       					<span>3:</span>
       				</Col>
       				<Col span={20} >
       					<Input onChange={this.input5} defaultValue={this.state.content5} />
       				</Col>
       				<Col span={20} offset={1} style={{marginTop:'20px'}}>
       					<TextArea rows={5} onChange={this.input6} value={this.state.content6} autosize/>
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
