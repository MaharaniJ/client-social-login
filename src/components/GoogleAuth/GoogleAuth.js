import React, { useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { gapi } from "gapi-script";
import "../GoogleAuth/GoogleAuth.css";

const GoogleAuth = ({ informParent }) => {
  useEffect(() => {
    function initClient() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", initClient);
  });

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(
        "/user/google-login",
        { idToken: response.tokenId },
        { withCredentials: true }
      );
    console.log(result)

      informParent(result);
      console.log(result);
    } catch (error) {
      console.log("GOOGLE SIGNIN ERROR", error.response);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="699812083032-m1m692lkpg6tmud6oesl6tauga9bcodu.apps.googleusercontent.com">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="social-icon-google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i class="fab fa-google" />
          </button>
        )}
      />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;