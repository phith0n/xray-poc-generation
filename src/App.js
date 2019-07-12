import React from 'react';
import update from 'immutability-helper';
import { Layout, Menu, Breadcrumb, Row, Col, Form, Input, Button } from 'antd';
import RuleComponent from './Rule';
import Rule from './model/rule'
import { findObjectByIndex } from "./model/helper";

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rules: [new Rule()],
      detail: {},
    };
    this.updateRule = this.updateRule.bind(this);
    this.generatePOC = this.generatePOC.bind(this);
    this.addRule = this.addRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
  }

  updateRule(index, key, value) {
    const i = findObjectByIndex(this.state.rules, index);
    if (i >= 0) {
      let rules = update(this.state.rules, {[i]: {[key]: {$set: value}}});
      this.setState({rules});
    }
  }

  deleteRule(index) {
    const i = findObjectByIndex(this.state.rules, index);
    if (i >= 0) {
      let rules = update(this.state.rules, {$splice: [[i, 1]]});
      this.setState({rules});
    }
  }

  generatePOC() {
    console.log(this.state);
  }

  addRule() {
    let rules = update(this.state.rules, {$push: [new Rule()]});
    this.setState({rules})
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

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
              <Form layout={"horizontal"} labelAlign="left">
                <Form.Item label="POC名" {...formItemLayout}>
                  <Input 
                    placeholder="由数字、字母、短横线组成" 
                    type="text" 
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                  />
                </Form.Item>
                {this.state.rules.map((rule, index) =>
                  <RuleComponent
                    key={rule.index}
                    rule={rule}
                    updateHandler={this.updateRule}
                    addHandler={this.addRule}
                    deleteHandler={this.deleteRule}
                  />
                )}
                <Form.Item>
                  <Button type="primary" size="default" onClick={this.generatePOC}>生成</Button>
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