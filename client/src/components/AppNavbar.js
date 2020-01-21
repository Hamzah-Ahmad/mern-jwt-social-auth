import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        {/* We can use this.props.auth to get user info as well */}
        {/* <span style={{ paddingLeft: "20px" }}>
          <strong>
            {this.props.auth.user ? `${this.props.auth.user.name}` : ""}
          </strong>
        </span> */}

        <span style={{ paddingLeft: "20px" }}>
          <Logout />
        </span>
      </Fragment>
    );

    // const guestLinks = (
    //   <Fragment>
    //     <NavItem>
    //       <Register />
    //     </NavItem>
    //     <NavItem>
    //       <Login />
    //     </NavItem>
    //   </Fragment>
    // );

    return (
      <div>
        <div>
          <Link to="/">Home</Link>

          <span className="ml-auto" navbar>
            {isAuthenticated ? authLinks : null}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
