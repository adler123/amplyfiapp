import React from 'react';
import axios from 'axios';
import {Row, Descriptions } from 'antd';

import { apiConfig } from "../config/config";
import UserContext from '../context/usercontext';


class UserAccount extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { user: [] };
    }
    componentDidMount() {
        const config = {
            headers: { Authorization: `Token  ${this.context.token}` },
        };
        axios.get(`${apiConfig.baseUrl}user/accountinfo`, config).then((res) => {
            this.setState({ user: res.data }, () => console.log(this.state.user));
        });
    }

    render() {

        return (
            <>
                <Row gutter={[16, { xs: 32, sm: 24, md: 16, lg: 8 }]} style={{ justifyContent: 'center' }}>
                    <Descriptions bordered>
                        {/* <Descriptions.Item>
                            <Avatar size={256} src={avatar} />
                        </Descriptions.Item> */}
                    </Descriptions>
                </Row>
                <Row gutter={[16, { xs: 32, sm: 24, md: 16, lg: 8 }]} style={{ justifyContent: 'space-around' }}>
                    <Descriptions bordered style={{ width: 1500 }}>
                        <Descriptions.Item label="Username" span={3}>
                            {this.state.user.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Họ tên" span={1}>
                            {this.state.user.name}
                        </Descriptions.Item>
                        <Descriptions.Item span={2}>
                           
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng số lịch đặt" span={3}>
                            {this.state.user.total}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lịch đặt chấp nhận" span={3}>
                            {this.state.user.accepted}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lịch đặt đang chờ" span={3}>
                            {this.state.user.pending}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lịch đặt từ chối" span={3}>
                            {this.state.user.declined}
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </>
        );
    }
}

export default UserAccount;
