import React, { Component } from 'react';
import './gt-header.component.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { withRouter } from 'react-router';

class GtHeaderComponent extends Component<any> {
  goHome() {
    this.props.history.push('/');
  }

  render() {
    return <div className="gt-header">
      <div className="container left-container" onClick={this.goHome.bind(this)}>GoTriV</div>
      <div className="container right-container">{this.props.username}</div>
    </div>
  }
}

const mapStateToProps = ({ user }: ApplicationState) => ({
  username: user.username
})

export const GtHeader = withRouter<any, any>(connect(mapStateToProps)(GtHeaderComponent))
