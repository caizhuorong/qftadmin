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
const editorProps = {
  height: 300,
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
			content:'',
			content1:'',
			id1:'',
			ids:'',
			id:2020
		};
	};
  componentWillMount() {
	 	const { dispatch } = this.props;
	 	const _this = this;
		_this.setState({
			id:_this.props.location.state.id,
		},()=>{
		  dispatch({
		    type: 'copywriting/friends',
		    payload:{
		    	id:_this.state.id
		    },
		    callback(data){
		    	_this.setState({
		    		ids:data[0].id,
		    		id1:data[1].id,
		    		content:data[0].codeText,
		    		content1:data[1].codeText,
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
 	onChange1 = (content) => {
    this.setState({
    	content1:content
    })
  }
  onSave = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'copywriting/save',
      payload:[
	      {
	      	id:this.state.ids,
	      	codeText:this.state.content
	      },
	      {
	      	id:this.state.id1,
	      	codeText:this.state.content1
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
      <PageHeaderLayout title="好友邀请">
          <Card bordered={false}>
       			<Row gutter={24}>
       				<Col span={2}>
       					<span>提示文案:</span>
       				</Col>
       				<Col span={20} offset={1} style={{border:'1px solid #dedede'}}>
       					<BraftEditor {...editorProps}
       						initialContent={this.state.content}
       						contentId={this.state.ids}
       						onChange={this.onChange}
       					/>
       				</Col>
       				<div style={{width:'100%',height:'32px',float:'left'}}></div>
			    		<Divider style={{marginTop:'32px'}} />
				    	<Col span={2}>
				    		<span>奖励规则</span>
				    	</Col>
				    	<Col span={20} offset={1} style={{border:'1px solid #dedede'}}>
				    		<BraftEditor {...editorProps}
       						initialContent={this.state.content1}
       						contentId={this.state.id1}
       						onChange={this.onChange1}
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
