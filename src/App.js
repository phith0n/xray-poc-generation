import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Form, Input, Button } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poc: {
        name: "",
        rules: [],
        detail: {},
      }
    }
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Row gutter={16} type="flex">
            <Col span={12} >
              <Form>
                <Form.Item label="POC名">
                  <Input 
                    placeholder="由数字、字母、短横线组成" 
                    type="text" 
                    value={this.state.poc.name} 
                    onChange={e => this.setState({poc: {name: e.target.value}})} 
                  />
                </Form.Item>
                <Form.Item label="Field B">
                  <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" size="large">Submit</Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={12} >
              Content
            </Col>
          </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 XRay POC Generation</Footer>
      </Layout>
    );
  }
}

export default App;
