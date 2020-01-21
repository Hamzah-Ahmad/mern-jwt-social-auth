import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Link } from "react-router-dom";
import GoogleBtn from "./GoogleBtn";
import FbBtn from "./FbBtn";

class Register extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
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

  // toggle = () => {
  //   // Clear errors
  //   this.props.clearErrors();
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        {/* <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink> */}

        {this.state.msg ? (
          <p style={{ color: "red" }}>{this.state.msg}</p>
        ) : null}
        <form onSubmit={this.onSubmit}>
          <label for="name">Name:</label>
          <input
            style={{ margin: "10px" }}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="mb-3"
            onChange={this.onChange}
          />

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
          <button color="dark" style={{ marginTop: "2rem" }} block>
            Register
          </button>
        </form>
        <Link to="/login">Already a member?</Link>
        <hr />
        <FbBtn />
        <div style={{ paddingTop: "20px" }}></div>
        <GoogleBtn />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
