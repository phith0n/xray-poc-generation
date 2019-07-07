import React from 'react';
import {Card, Form, Input, Select, Switch} from "antd";
import Header from "./Header"

let headerIndex = 1;

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "GET",
      path: "",
      headers: [
        [headerIndex, "", ""],
      ],
      body: "",
      followRedirects: true,
      expression: "",
      search: "",
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.changeInputValueByName = this.changeInputValueByName.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.deleteHeader = this.deleteHeader.bind(this);

    this.updateRule = props.updateRule
  }

  changeInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.updateRule(this.state)
  }

  changeInputValueByName(name, value) {
    this.setState({
      [name]: value
    });
    this.updateRule(this.state)
  }

  addHeader() {
    headerIndex++;
    let headers = this.state.headers;
    headers.push([headerIndex, "", ""]);
    this.setState({headers: headers})
  }

  updateHeader(key, hKey, hValue) {
    let headers = this.state.headers;
    headers[key][1] = hKey;
    headers[key][2] = hValue;
    this.setState({headers: headers})
  }

  deleteHeader(key) {
    let headers = this.state.headers;
    headers.splice(key, 1);
    this.setState({headers: headers})
  }

  render() {
    return (
      <Card title="规则（Rule）" size="small" className="rule-card" style={{marginBottom: "24px"}} extra={<a href="#">增加一个Rule</a>}>
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
            <Header
              key={header[0]}
              hKey={header[1]}
              hValue={header[2]}
              index={index}
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

export default Rule;