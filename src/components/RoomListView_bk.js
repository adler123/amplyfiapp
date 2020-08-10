import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Steps, Card, Avatar,Row, Col, DatePicker, Badge, Button, Select, Modal, Input } from 'antd';
import { PoweroffOutlined,EyeInvisibleOutlined,EyeOutlined } from '@ant-design/icons';


import UserContext from '../context/usercontext';
import { apiConfig } from '../config/config';

const { Meta } = Card;
const { Step } = Steps;
const steps = [
    {
        title: 'Chọn cơ sở',
        content: 'First-content',
    },
    {
        title: 'Chọn dịch vụ',
        content: 'Last-content',
    },
    {
        title: 'Chọn ngày',
        content: 'Second-content',
    },
    {
        title: 'Đặt lịch',
        content: 'Last-content',
    },
];

class RoomList extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            filterData: [],
            roomData: [],
            chainData: [],
            start: null,
            end: null,
            service: null,
            chain: null,
            slots: null,
            current: 0,
            dis_select: 'disabled',
            purpose: 'Purpose not provided',
            date: moment().add(1, 'day').format('YYYY-MM-DD'),
        };
    }


    fetchData = () => {
        const config = {
            headers: { Authorization: `Token ${this.context.token}` },
        };
        axios.get(`${apiConfig.baseUrl}service/all`, config).then((res) => {
            res.data.sort((a, b) => {
                a = a.service_name.toLowerCase();
                b = b.service_name.toLowerCase();
                return a < b ? -1 : a > b ? 1 : 0;
            });
            this.setState({ roomData: res.data });
        });

        axios.get(`${apiConfig.baseUrl}chain/all`, config).then((res) => {
            res.data.sort((a, b) => {
                a = a.chain_name.toLowerCase();
                b = b.chain_name.toLowerCase();
                return a < b ? -1 : a > b ? 1 : 0;
            });
            this.setState({ chainData: res.data });
        });
    };

    handleServiceChange = (value) => {
        this.setState({ service: value })


        //  if(this.state.service){
        const config = {
            headers: { Authorization: `Token ${this.context.token}` },
        };
        axios
            .post(
                `${apiConfig.baseUrl}booking/all`,
                {
                    date: this.state.date,
                    service: value,
                    chain: this.state.chain
                },
                config
            )
            .then((res) => this.setState({ filterData: res.data, current: 2 }))
        // }

        //  }
        // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    }


    handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        console.log('Name:', name)
        console.log('Value:', value)
    }

    handleChainChange = (value) => {
        this.setState({ chain: value, current: 1,dis_select:'' })
        const config = {
            headers: { Authorization: `Token ${this.context.token}` },
        };
        if(this.state.date && this.state.chain && this.state.service){
            axios
            .post(
                `${apiConfig.baseUrl}booking/all`,
                {
                    date: this.state.date,
                    service: this.state.service,
                    chain: value
                },
                config
            )
            .then((res) => this.setState({ filterData: res.data, modalVisible: false, purpose: null, current: 1 }))
        }


    }
    handleDateChange = (value) => {
        //alert(value)
        this.setState({ date: value, current: 3 })
        const config = {
            headers: { Authorization: `Token ${this.context.token}` },
        };
        if(this.state.service && this.state.chain){
            axios
            .post(
                `${apiConfig.baseUrl}booking/all`,
                {
                    date: value,
                    service: this.state.service,
                    chain: this.state.chain
                },
                config
            )
            .then((res) => this.setState({ filterData: res.data, modalVisible: false, purpose: null, current: 3 }))
        }
  
    }
    handleButtonClick = (event, data) => {
        //   alert(data["chain_id"])
        //   console.log(data)
        event.preventDefault();
        const config = {
            headers: { Authorization: `Token ${this.context.token}` },
        };
        // alert(this.state.start)
        axios
            .post(
                `${apiConfig.baseUrl}book/`,
                {
                    date: this.state.date,
                    startTime: this.state.start,
                    endTime: this.state.start,
                    chain_id: this.state.chain,
                    service_id: this.state.service,
                },
                config
            )
            .then((res) => {
                const config = {
                    headers: { Authorization: `Token ${this.context.token}` },
                };
                axios
                    .post(
                        `${apiConfig.baseUrl}booking/all`,
                        {
                            date: this.state.date,
                            service: this.state.service,
                            chain: this.state.chain
                        },
                        config
                    )
                    .then((res) => this.setState({ filterData: res.data, modalVisible: false, purpose: null, current: 3 }))

            });
        // this.Next()
    };
    componentDidMount() {
        this.fetchData();

    }
    render() {
        const { current } = this.state;
        return (
            <div>
                <Row gutter={[16, { xs: 32, sm: 24, md: 16, lg: 8 }]} style={{ justifyContent: 'center', padding: '15px' }}>
                    <Steps size="small" current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </Row>


                <Row gutter={[16, { xs: 32, sm: 24, md: 16, lg: 8 }]} style={{ justifyContent: 'center', padding: '15px' }}>

                

                    <Col className="gutter-row" span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
                        <Select
                            style={{ width: 180 }}
                            size="large"
                            placeholder='Chọn cơ sở'
                            onChange={(value) => {
                                this.handleChainChange(value)
                            }}
                        >
                            {
                                this.state.chainData.map((item, key) =>
                                    <Select.Option key={item.id} value={item.id}>{item.chain_name}</Select.Option>
                                )};

                        </Select>
                    </Col>
                    <Col className="gutter-row" span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
                        <Select
                            style={{ width: 180 }}
                            size="large"
                            disabled = {this.state.dis_select}
                            placeholder='Chọn dịch vụ'
                            onChange={(value) => {
                                this.handleServiceChange(value)
                            }}
                        >
                            {
                                this.state.roomData.map((item, key) =>
                                    <Select.Option key={item.id} value={item.id}>{item.service_name}</Select.Option>
                                )}

                        </Select>
                    </Col>
                    <Col className="gutter-row" span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>

<DatePicker
    style={{ width: 180 }}
    defaultValue={moment().add(1, 'day')}
    placeholder='Chọn ngày đặt'
    onChange={(_date, dateString) => this.handleDateChange(dateString)}
    format={'YYYY-MM-DD'}
    size="large"
    allowClear={false}
    disabledDate={(current) => {
        return current < moment().startOf('day');
    }}
/>
</Col>
<Row>
{/* <div className="ant-hm"></div> */}
</Row>

                </Row>
                <Row gutter={[16, { xs: 32, sm: 24, md: 16, lg: 8 }]}
                    style={{ justifyContent: 'space-around', marginTop: 20 }}>
                    {
                        this.state.filterData.map(value => (
                            <Col className="gutter-row" xs={12} sm={12} md={3} lg={8} key={value.id} >

                                <div style={{ padding: '12px' }}>
                                    <Badge count={value.status} style={{ backgroundColor: value.color }}>
                                        <Card hoverable>
                                            <Meta
                                                title={value.gio}
                                                
                                            />
                                      
                                        </Card>
                                      
                                        <Button type="primary" disabled= {value.disable}
                                            icon={<PoweroffOutlined />}
                                            size="large"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    modalVisible: true,
                                                    start: value.gio,
                                                    purpose: ''
                                                    // start: value['start_timing'],
                                                    // end: value['end_timing'],
                                                });
                                            }}> Đặt lịch </Button>
                                    </Badge>
                                </div>
                            </Col>
                        ))
                    }

                    <Modal
                        title="Yêu cầu đặt lịch"
                        centered
                        visible={this.state.modalVisible}
                        onOk={(e) => {
                            this.handleButtonClick(e, {
                                chain_id: this.state.chain,
                                service_id: this.state.service,
                            });
                        }}
                        onCancel={() => {
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <Input.TextArea
                            placeholder="Yêu cầu đặt lịch"
                            autoSize={{ minRows: 4, maxRows: 8 }}
                            onChange={(v) => {
                                this.setState({ purpose: v.target.value });
                            }}
                        />
                    </Modal>
                </Row>
            </div>
        );
    }
}

export default RoomList;
