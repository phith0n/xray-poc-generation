import React from 'react';
import {Icon, Input} from "antd";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.changeInputValue = this.changeInputValue.bind(this);
  }

  changeInputValue(e) {
    this.props.updateHandler(this.props.header.index, e.target.name, e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <Input.Group compact style={{width: '90%'}}>
          <Input
            style={{ width: '20%' }}
            name="key"
            value={this.props.header.key}
            onChange={this.changeInputValue}
            placeholder="User-Agent"
          />
          <Input
            style={{ width: '80%' }}
            name="value"
            value={this.props.header.value}
            onChange={this.changeInputValue}
            placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
          />
        </Input.Group>
        {this.props.showDeleteButton ? (
          <Icon
            className="dynamic-delete-button color-red"
            type="minus-circle-o"
            style={{"color": "#ff6868"}}
            onClick={e => this.props.deleteHandler(this.props.header.index)}
          />
        ) : null}
        {this.props.showAddButton ? (
          <Icon
            className="dynamic-delete-button color-grey"
            type="plus-circle-o"
            onClick={this.props.addHandler}
          />
        ) : null}
      </React.Fragment>
    )
  }
}
