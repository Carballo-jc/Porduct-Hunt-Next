import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAuthenticate from "../hooks/useAuthenticate";

import "../styles/globals.css";

const MyApp = (props) => {
  const user = useAuthenticate();
  const { Component, pageProps } = props;
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
