import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";

const Landingpage = props => {
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <Container>
        {props.location.state && !isAuthenticated ? (
          <Alert color="danger">{props.location.state.msg}</Alert>
        ) : null}
        <h3>Landing Page</h3>
        <h4>User: {props.auth.user.name}</h4>
        <h4>Id: {props.auth.user._id}</h4>
        {/* <h4>Email: {props.auth.user.email}</h4> */}
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landingpage);
