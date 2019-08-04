import React from 'react';
import update from 'immutability-helper';
import {Card, Form, Input, Select, Switch, Button} from "antd";
import HeaderComponent from "./Header";
import Header from "./model/header";
import { findObjectByIndex } from "./model/helper";


export default class RuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathHelp: {
        status: "success",
        help: ""
      },
      headersHelp: {
        status: "success",
        help: ""
      }
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.changeInputValueByName = this.changeInputValueByName.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.deleteHeader = this.deleteHeader.bind(this);
  }

  checkRule(name, value) {
    if (name === "path") {
      let pathHelp;
      if (!value.startsWith("/")) {
        pathHelp = update(this.state.pathHelp, {$set: {status: "error", help: "path需要以/开头"}});
      } else {
        pathHelp = update(this.state.pathHelp, {$set: {status: "success", help: ""}});
      }

      this.setState({pathHelp});
    } else if (name === "headers") {
      let headersHelp = update(this.state.headersHelp, {$set: {status: "success", help: ""}});
      for (let header of value) {
        if (!header.key) {
          headersHelp = update(this.state.headersHelp, {$set: {status: "error", help: "HTTP头Key不能为空"}});
        }
      }

      this.setState({headersHelp});
    }
  }

  changeInputValue(e) {
    this.checkRule(e.target.name, e.target.value);
    this.props.updateHandler(this.props.rule.index, e.target.name, e.target.value);
  }

  changeInputValueByName(name, value) {
    this.checkRule(name, value);
    this.props.updateHandler(this.props.rule.index, name, value);
  }

  addHeader() {
    let headers = update(this.props.rule.headers, {$push: [new Header()]});
    this.changeInputValueByName('headers', headers);
  }

  updateHeader(index, key, value) {
    const i = findObjectByIndex(this.props.rule.headers, index);
    if (i >= 0) {
      let headers = update(this.props.rule.headers, {[i]: {[key]: {$set: value}}});
      this.changeInputValueByName('headers', headers);
    }
  }

  deleteHeader(index) {
    const i = findObjectByIndex(this.props.rule.headers, index);
    if (i >= 0) {
      let headers = update(this.props.rule.headers, {$splice: [[i, 1]]});
      this.changeInputValueByName('headers', headers);
    }
  }

  render() {
    return (
      <Card
        title="规则（Rule）"
        size="small"
        className="rule-card"
        style={{marginBottom: "24px"}}
        extra={(
          <Button.Group size="small">
            <Button onClick={e => this.props.deleteHandler(this.props.rule.index)} disabled={this.props.ruleSize <= 1}>删除Rule</Button>
            <Button onClick={this.props.addHandler}>增加一个Rule</Button>
          </Button.Group>
        )}
      >
        <Form.Item label="请求方法" className="rule-item">
          <Select defaultValue={this.props.rule.method} style={{ width: 120 }} name="method" onChange={value => this.changeInputValueByName("method", value)}>
            {["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "CONNECT", "OPTIONS", "TRACE"].map((value, index) =>
              <Select.Option value={value} key={value}>{value}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="请求路径" className="rule-item" validateStatus={this.state.pathHelp.status} help={this.state.pathHelp.help}>
          <Input
            placeholder="/path/to/request"
            type="text"
            name="path"
            value={this.props.rule.path}
            onChange={this.changeInputValue}
          />
        </Form.Item>
        <Form.Item label="请求头" className="rule-item" validateStatus={this.state.headersHelp.status} help={this.state.headersHelp.help}>
          {this.props.rule.headers.map((header, index) =>
            <HeaderComponent
              key={header.index}
              header={header}
              showAddButton={index === this.props.rule.headers.length - 1}
              showDeleteButton={this.props.rule.headers.length > 1}
              addHandler={this.addHeader}
              updateHandler={this.updateHeader}
              deleteHandler={this.deleteHeader}
            />
          )}
        </Form.Item>
        <Form.Item label="请求体" className="rule-item">
          <Input.TextArea autosize={{minRows: 2}} name="body" value={this.props.rule.body} onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="允许跳转" className="rule-item">
          <Switch checked={this.props.rule.followRedirects} name="allowRedirects" onChange={value => this.changeInputValueByName("followRedirects", value)} />
        </Form.Item>
        <Form.Item label="CEL表达式" className="rule-item">
          <Input placeholder="status==200" type="text" value={this.props.rule.expression} name="expression" onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="提取规则" className="rule-item">
          <Input placeholder="" type="text" value={this.props.rule.search} name="search" onChange={this.changeInputValue} />
        </Form.Item>
      </Card>
    )
  }
}
