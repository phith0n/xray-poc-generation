import React from 'react';
import update from 'immutability-helper';
import yaml from 'js-yaml';
import clone from 'clone';
import ClipboardJS from 'clipboard';
import { Layout, Menu, Breadcrumb, Row, Col, Form, Input, Button, Affix, notification } from 'antd';
import RuleComponent from './Rule';
import Rule from './model/rule'
import { findObjectByIndex } from "./model/helper";

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "poc-yaml-",
      rules: [new Rule()],
      detail: {},
      poc: "",
    };

    this.updateRule = this.updateRule.bind(this);
    this.generatePOC = this.generatePOC.bind(this);
    this.addRule = this.addRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    const cjs = new ClipboardJS('#copy-btn');
    cjs.on('success', e => {
      this.notify("复制成功", "POC内容已成功复制到剪切板");
    })
  }

  notify(title, description) {
    notification.success({
      message: title,
      description: description,
      duration: 3,
    })
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
    let data = {
      name: this.state.name,
      rules: clone(this.state.rules),
    };

    for (let rule of data.rules) {
      delete rule['index'];

      let headers = {};
      for (let header of rule.headers) {
        if (header['key']) {
          headers[header['key']] = header['value'];
        }
      }

      if (Object.keys(headers).length > 0) {
        rule.headers = headers;
      } else {
        delete rule.headers;
      }

      if (!rule.body.length) {
        delete rule.body;
      }

      if (!rule.path.length) {
        delete rule.path;
      }

      if (!rule.search.length) {
        delete rule.search;
      }
    }

    const poc = yaml.safeDump(data);
    this.setState({poc});
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
          <div className="logo" ><span role="img" aria-label="dna" aria-hidden="true">🧬</span> XRay POC Generation</div>
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
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>POC生成</Breadcrumb.Item>
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
                    ruleSize={this.state.rules.length}
                    updateHandler={this.updateRule}
                    addHandler={this.addRule}
                    deleteHandler={this.deleteRule}
                  />
                )}
              </Form>
            </Col>
            <Col span={12} style={{paddingTop: "4px"}} >
              <Affix offsetTop={8}>
                <Input.TextArea
                  autosize={{minRows: 20}}
                  placeholder="生成POC内容"
                  value={this.state.poc}
                  id="poc-detail"
                  readOnly={true}
                  style={{marginBottom: "15px"}}
                />
                <Row justify="end" type="flex">
                  <Button type="primary" size="default" onClick={this.generatePOC} className="br">生成</Button>
                  <Button
                    type="dashed"
                    icon="copy"
                    id="copy-btn"
                    data-clipboard-text={this.state.poc}
                  >
                    复制POC
                  </Button>
                </Row>
              </Affix>
            </Col>
          </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 XRay POC Generation</Footer>
      </Layout>
    );
  }
}