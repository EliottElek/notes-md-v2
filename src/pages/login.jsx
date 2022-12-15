import React from "react";
import Button from "../components/Button";
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

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleLogin}>Login with github</Button>
    </div>
  );
};

export default Login;
