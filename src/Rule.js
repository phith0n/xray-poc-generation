import React, { Fragment } from 'react';
import {Card, Form, Input, Select, Switch} from "antd";
import HeaderComponent from "./Header"
import Header from "./model/header"
import { findObjectByIndex } from "./model/helper";


export default class RuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.initRule
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.changeInputValueByName = this.changeInputValueByName.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.deleteHeader = this.deleteHeader.bind(this);
  }

  changeInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.updateHandler(this.state)
  }

  changeInputValueByName(name, value) {
    this.setState({
      [name]: value
    });
    this.props.updateHandler(this.state);
  }

  addHeader() {
    let headers = this.state.headers;
    headers.push(new Header());
    this.setState({headers: headers});
  }

  updateHeader(index, key, value) {
    let headers = this.state.headers;
    const i = findObjectByIndex(headers, index);
    if (i >= 0) {
      headers[i].key = key;
      headers[i].value = value;
      this.setState({headers: headers});
    }
  }

  deleteHeader(index) {
    let headers = this.state.headers;
    const i = findObjectByIndex(headers, index);
    if (i >= 0) {
      headers.splice(i, 1);
      this.setState({headers: headers});
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
          <Fragment>
            <a href="#" style={{paddingRight: 5}}>删除Rule</a>
            <a onClick={this.props.addHandler}>增加一个Rule</a>
          </Fragment>
        )}
      >
        <Form.Item label="请求方法" className="rule-item">
          <Select defaultValue={this.state.method} style={{ width: 120 }} name="method" onChange={value => this.changeInputValueByName("method", value)}>
            {["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "CONNECT", "OPTIONS", "TRACE"].map((value, index) =>
              <Select.Option value={value} key={value}>{value}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="请求路径" className="rule-item">
          <Input placeholder="/path/to/request" type="text" name="path" value={this.state.path} onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="请求头" className="rule-item">
          {this.state.headers.map((header, index) =>
            <HeaderComponent
              key={header.index}
              initHeader={header}
              showAddButton={index === this.state.headers.length - 1}
              showDeleteButton={this.state.headers.length > 1}
              addHandler={this.addHeader}
              updateHandler={this.updateHeader}
              deleteHandler={this.deleteHeader}
            />
          )}
        </Form.Item>
        <Form.Item label="请求体" className="rule-item">
          <Input.TextArea autosize={{minRows: 2}} name="body" value={this.state.body} onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="允许跳转" className="rule-item">
          <Switch checked={this.state.followRedirects} name="allowRedirects" onChange={value => this.changeInputValueByName("followRedirects", value)} />
        </Form.Item>
        <Form.Item label="CEL表达式" className="rule-item">
          <Input placeholder="status==200" type="text" value={this.state.expression} name="expression" onChange={this.changeInputValue} />
        </Form.Item>
        <Form.Item label="提取规则" className="rule-item">
          <Input placeholder="" type="text" value={this.state.search} name="search" onChange={this.changeInputValue} />
        </Form.Item>
      </Card>
    )
  }
}
