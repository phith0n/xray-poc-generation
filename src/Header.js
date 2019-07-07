import React from 'react';
import {Icon, Input} from "antd";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hKey: props.hKey,
      hValue: props.hValue,
    };
    this.changeInputValue = this.changeInputValue.bind(this);
  }

  changeInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.updateHandler(this.props.index, this.state.hKey, this.state.hValue);
  }

  render() {
    return (
      <React.Fragment>
        <Input.Group compact style={{width: '90%'}}>
          <Input
            style={{ width: '20%' }}
            name="hKey"
            value={this.state.hKey}
            onChange={this.changeInputValue}
            placeholder="User-Agent"
          />
          <Input
            style={{ width: '80%' }}
            name="hValue"
            value={this.state.hValue}
            onChange={this.changeInputValue}
            placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
          />
        </Input.Group>
        {this.props.showDeleteButton ? (
          <Icon
            className="dynamic-delete-button color-red"
            type="minus-circle-o"
            style={{"color": "#ff6868"}}
            onClick={e => this.props.deleteHandler(this.props.index)}
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

export default Header