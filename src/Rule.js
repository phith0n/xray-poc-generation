import React, { Fragment } from 'react';
import update from 'immutability-helper';
import {Card, Form, Input, Select, Switch, Button, Radio} from "antd";
import HeaderComponent from "./Header";
import Header from "./model/header";
import { findObjectByIndex } from "./model/helper";


export default class RuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.changeInputValueByName = this.changeInputValueByName.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.deleteHeader = this.deleteHeader.bind(this);
  }

  changeInputValue(e) {
    this.props.updateHandler(this.props.rule.index, e.target.name, e.target.value);
  }

  changeInputValueByName(name, value) {
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
            <Button onClick={e => this.props.deleteHandler(this.props.rule.index)}>删除Rule</Button>
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
        <Form.Item label="请求路径" className="rule-item">
          <Input placeholder="/path/to/request" type="text" name="path" value={this.props.rule.path} onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="请求头" className="rule-item">
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
