import React, { Component } from 'react';
import './gt-header.component.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';

interface propsFromState {
  username: string
}

class GtHeaderComponent extends Component<propsFromState> {
  render() {
    return <div className="gt-header">
      <div className="container left-container">GoTriV</div>
      <div className="container right-container">{this.props.username}</div>
    </div>
  }
}

const mapStateToProps = ({ user }: ApplicationState) => ({
  username: user.username
})

export const GtHeader = connect(mapStateToProps)(GtHeaderComponent)
