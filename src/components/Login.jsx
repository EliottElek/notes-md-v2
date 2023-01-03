import React from "react";
import Button from "./Button";
import { supabase } from "../lib/supabase";
const Login = () => {
  const getURL = () => {
    //let url = "http://localhost:3000/"; // Set this to your site URL in production env.
    let url = window.location.host; // Set this to your site URL in production env.

    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleLogin = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: getURL(),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onClick={handleLogin}>Login with github</Button>;
};

export default Login;
