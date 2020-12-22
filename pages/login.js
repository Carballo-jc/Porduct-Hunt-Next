import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Campo, Error, Form, InputSubmit } from "../components/ui/Form";
import firebase from "../firebase";
import Router from "next/router";

import useFormValidate from "../hooks/useFormValidate";
import validateLogin from "../validate/validateLogin";
const INITIAL_STATE = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, setError] = useState(null);
  const {
    values,
    errors,
    handleSubmit,
    handleInputChange,
    handleBlur,
  } = useFormValidate(INITIAL_STATE, validateLogin, logIn);
  const { email, password } = values;

  async function logIn() {
    try {
      console.log("iniciando...");
    } catch (error) {
      console.error("Hubo un error", error);
    }
  }
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Iniciar Sesión
        </h1>
        <Form onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="emial">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Tu Email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errors.email && <Error> El email es Obligatorio</Error>}

          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu Password"
              value={password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errors.password && <Error>La Contraseña es Obligatorio</Error>}
          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Form>
      </>
    </Layout>
  );
};
export default Login;
