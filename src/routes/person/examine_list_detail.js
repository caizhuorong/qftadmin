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
	Input,
	Button,
	Modal,
	message,
	Divider,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link, hashHistory } from 'dva/router';
import styles from './list.less';
const {
	TextArea
} = Input;
const {
	Description
} = DescriptionList;
const confirm = Modal.confirm;
@connect(({
	examine,
	loading
}) => ({
	examine,
	loading: loading.models.examine,
}))
export default class TableList extends PureComponent {
	state = {
		visible: false,
		visible1: false,
		text: '',
		block: false,
		type:'list',
	};

	componentWillMount() {
		const {
			dispatch
		} = this.props;
		
		this.setState({
			type:this.props.location.state.type
		});
		dispatch({
			type: 'examine/readdetail',
			payload: {
				qId: this.props.location.state.id
			}
		});
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = (e) => {
		const {
			dispatch
		} = this.props;
		let _this = this;
		if(_this.state.text == '') {
			_this.setState({
				block: true,
			})

		} else {
			dispatch({
				type: 'examine/updatepassQftUserProve',
				payload: {
					id: _this.props.location.state.id,
					reason: _this.state.text
				},
				callback() {
					_this.setState({
						visible: false,
					});
				}
			});
		}

	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}
	showModal1 = () => {
		let _this = this;
		const {
			dispatch
		} = _this.props;
		confirm({
			title: '确认该用户通过实名认证?',
			content: 'BPCC奖励100',
			onOk() {
				dispatch({
					type: 'examine/updateagreeQftUserProve',
					payload: {
						id: _this.props.location.state.id
					}
				});
			},
			onCancel() {

			},
		});
	}
	textcahnge(val) {
		this.setState({
			text: val.target.value,
			block: false
		})
	}

	render() {
		const {
			examine: {
				detail
			},
			loading,
		} = this.props;
		let statess='';
		if(detail!=undefined){
			switch (detail.state_){
				case '1':
				statess = '通过';
					break;
				default:
				statess = '拒绝';
					break;
			}
		}

		return(
			<PageHeaderLayout title="审核列表">
          <Card bordered={false}>
          <DescriptionList size="large" title="认证详情" style={{ marginBottom: 32 }}>
  		 			<Description style={{width:'25%'}}  term="申请时间">{detail != undefined ?detail.create_time:''}</Description>
  		 			<Description style={{width:'75%',display:this.state.type == 'record' ? 'block':'none'}}  term="状态">{statess}</Description>
  		 			<Description style={{width:'25%'}} term="用户ID">{detail != undefined ?detail.uId:''}</Description>
  		 			<Description style={{width:'25%'}} term="用户名称">{detail != undefined ?detail.nick_name:''}</Description>
  		 			<Description style={{width:'25%'}} term="用户手机">{detail != undefined ?detail.telephone:''}</Description>
  		 		</DescriptionList>    
  		 		<Divider />
  		 		<Row gutter={24}>
  		 			<Col span={12}>
  		 				<div className={styles.detail_text}>
  		 					<label>身份证姓名:</label>
  		 					<span>{detail != undefined ?detail.name_:''}</span>
  		 				</div>
  		 			</Col>
  		 			<Col span={12}>
							<div className={styles.detail_text}>
								<label>身份证号码:</label>
								<span>{detail != undefined ?detail.id_number:''}</span>
							</div>
  		 			</Col>
  		 			<Col	span={12}>
  		 				<div className={styles.detail_img}>
  		 					<label>国徽面:</label>
  		 					<img src={detail != undefined ?detail.positive:''} />
  		 				</div>
  		 			</Col>
  		 			<Col span={12}>
  		 				<div className={styles.detail_img}>
  		 					<label>人相面:<br />(手持证件照片)</label>
  		 					<img src={detail != undefined ?detail.con:''} />
  		 				</div>
  		 			</Col>
  		 			<div style={{clear: 'both'}}></div>
  		 			<Col span={22} offset={1} style={{marginTop:'30px',display:this.state.type == 'record' ? 'block':'none'}}>
  		 				<div className={styles.detail_text}>
  		 					<label>拒绝理由:</label>
  		 					<span>{detail != undefined ? detail.fail_reason:''}</span>
  		 				</div>
  		 			</Col>
  		 			<div style={{clear: 'both'}}></div>
  		 			<Divider style={{marginTop:'30px'}}/>
  		 			<Col span={2} offset={9} style={{display:this.state.type == 'record' ? 'none':'block'}} >
  		 				<Button size={'large'} type="danger" onClick={this.showModal.bind(this)} >拒绝</Button>
  		 			</Col>
  		 			<Col span={2} style={{display:this.state.type == 'record' ? 'none':'block'}}>
  		 				<Button size={'large'} type="primary" onClick={this.showModal1.bind(this)}>通过</Button>
  		 			</Col>
  		 			
  		 		</Row>
        </Card>
        <Modal
          title="请在下方空白处填写拒绝理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea rows={4} onChange={this.textcahnge.bind(this)} />
          <span className={styles.jujue} style={{display:this.state.block?'block':'none'}}>请填写拒绝理由</span>
        </Modal>
      </PageHeaderLayout>
		);
	}
}