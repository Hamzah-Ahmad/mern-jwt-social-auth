import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Link } from "react-router-dom";
import FbBtn from "./FbBtn";
import GoogleBtn from "./GoogleBtn";

class Login extends Component {
  state = {
    //modal: false,
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal

    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Create user object
    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        {/* <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink> */}

        <div>
          {this.state.msg ? (
            <p style={{ color: "red" }}>{this.state.msg}</p>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <label for="email">Email:</label>
            <input
              style={{ margin: "10px" }}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={this.onChange}
            />

            <label for="password">Password:</label>
            <input
              style={{ margin: "10px" }}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mb-3"
              onChange={this.onChange}
            />
            <button style={{ marginTop: "2rem" }} block>
              Login
            </button>
          </form>
          <Link to="/register">Not a member?</Link>
          <hr />
          <FbBtn />
          <div style={{ paddingTop: "20px" }}></div>
          <GoogleBtn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
