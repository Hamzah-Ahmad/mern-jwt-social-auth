import React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { fbLogin } from "../../actions/authActions";

const FbBtn = props => {
  const responseFacebook = response => {
    const email = response.email;
    const name = response.name;
    const userID = response.userID;
    const body = { email, name, userID };
    if (response.name) {
      props.fbLogin(body);
    } else {
      console.log("Error with FB Login");
    }
    //axios.post("/api/auth/facebook", body).then(res => console.log(res));
  };

  return (
    <div>
      <FacebookLogin
        appId="106641530788785"
        autoLoad={false}
        fields="name,email,picture"
        //onClick={componentClicked}
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(mapStateToProps, { fbLogin })(FbBtn);
