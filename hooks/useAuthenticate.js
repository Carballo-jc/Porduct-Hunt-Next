import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuthenticate() {
  const [userAuthenticado, setUserAuthenticado] = useState(null);

  useEffect(() => {
    const onSuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuthenticado(user);
      } else {
        setUserAuthenticado(null);
      }
    });
    return onSuscribe;
  }, []);
  return userAuthenticado;
}
export default useAuthenticate;
