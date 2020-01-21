import React from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/authActions";

const GoogleBtn = props => {
  const responseGoogle = response => {
    //console.log(response.profileObj);
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    const userID = response.profileObj.googleId;
    const body = { email, name, userID };
    props.googleLogin(body);
  };

  const failureResponse = () => {
    console.log("Error with Google Login");
  };
  return (
    <div>
      <GoogleLogin
        clientId="" //put your google client ID here
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={failureResponse}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default connect(null, { googleLogin })(GoogleBtn);
