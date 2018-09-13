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
			content:'',
			id:2020
		};
	};
	
  componentWillMount() {
	 	const { dispatch } = this.props;
		this.setState({
			id:this.props.location.state.id,
		},()=>{
		  dispatch({
		    type: 'copywriting/signin',
		    payload:{
		    	id:this.state.id
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
      payload:[{
      	id:this.state.id,
      	codeText:this.state.content
      }]
    });
  }
  render() {
    const {
      copywriting: { signins },
      loading,
    } = this.props;
    return (
      <PageHeaderLayout title="首页-签到任务">
          <Card bordered={false}>
       			<Row gutter={24}>
       				<Col span={24}>
       					<span style={{dispaly:'block',textAlign:'left'}}>首页-签到任务文案编辑</span>
       				</Col>
       				<Col span={22} offset={1} style={{border:'1px solid #dedede',marginTop:'30px'}}>
       					<BraftEditor {...editorProps}
       						initialContent={signins.codeText}
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
