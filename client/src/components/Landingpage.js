import React from "react";
import { connect } from "react-redux";

const Landingpage = props => {
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <div>
        {props.location.state && !isAuthenticated ? (
          <p style={{ color: "red" }}>{props.location.state.msg}</p>
        ) : null}
        <h3>Landing Page</h3>
        <h4>User: {props.auth.user.name}</h4>
        <h4>Id: {props.auth.user._id}</h4>
        {/* <h4>Email: {props.auth.user.email}</h4> */}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landingpage);
