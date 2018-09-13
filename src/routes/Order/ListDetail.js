import React, { Component } from 'react';
import { connect } from 'dva';
import { 
	Card, 
	Badge, 
	Table, 
	Divider,
	Row,
	Col,
	Button ,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ListDetail.less';

const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {
	constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
	}
  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }
	callback(index){

	}

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    return (
      <PageHeaderLayout title="商家详情">
        <Card bordered={false}>
        	<Row>
	      		<Col span={6}>
	      			<div style={{fontSize:'20px'}}>[商铺名字]</div>
	      		</Col>
	      	</Row>
			    <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
          	<Description term="账户">1000000000</Description>
          	<Description term="支付方式">已取货</Description>
          	<Description term="金额">1234123421</Description>
          	<Description term="购买商品">3214321432</Description>
        	</DescriptionList>
        	<Divider style={{ marginBottom: 32 }} />
        	<DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
          	<Description term="订单状态">1000000000</Description>
          	<Description term="创建时间">已取货</Description>
        	</DescriptionList>
        	<Divider style={{ marginBottom: 32 }} />
        	<DescriptionList size="large" title="商户信息" style={{ marginBottom: 32 }}>
          	<Description term="账户">1000000000</Description>
          	<Description term="商户名称">已取货</Description>
          	<Description term="商户地址">已取货</Description>
        	</DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
