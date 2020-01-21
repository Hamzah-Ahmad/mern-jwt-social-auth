import React, { Component, Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";

export class Logout extends Component {
  render() {
    return (
      <Fragment>
        <button onClick={this.props.logout} href="#">
          Logout
        </button>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
