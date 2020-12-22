import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Campo, Error, Form, InputSubmit } from "../components/ui/Form";
import firebase from "../firebase";
import Router from "next/router";

import useFormValidate from "../hooks/useFormValidate";
import validateCreateAccount from "../validate/validateCreateAccount";
const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};
const CreateAccount = () => {
  const [error, setError] = useState(null);
  const {
    values,
    errors,
    handleSubmit,
    setValues,
    handleInputChange,
    handleBlur,
  } = useFormValidate(INITIAL_STATE, validateCreateAccount, registerAccount);
  const { name, email, password } = values;

  const registerAccount = async () => {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al crear al Usuario", error.message);
      setError(error.message);
    }
  };
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Crear cuenta
        </h1>
        <Form onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              value={name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errors.name && <Error> El nombre es Obligatorio</Error>}
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

          <InputSubmit type="submit" value="Crear Cuenta" />
        </Form>
      </>
    </Layout>
  );
};
export default CreateAccount;
