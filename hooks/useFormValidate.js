import React, { useState, useEffect } from "react";

const useFormValidate = (stateInicial, validate, fn) => {
  const [values, setValues] = useState(stateInicial);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn(); //FN: ejecuta la funsion del componente
      }
      setSubmitForm(false);
    }
  }, [errors]);
  //funcion que se ejecuta cuando el usuario escribe
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  //funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValidate = validate(values);
    setErrors(errorValidate);
    setSubmitForm(true);
  };
  //cuando el usuario quita el mause del input
  const handleBlur = () => {
    const errorValidate = validate(values);
    setErrors(errorValidate);
  };

  return {
    values,
    errors,
    submitForm,
    setValues,
    handleSubmit,
    handleInputChange,
    handleBlur,
  };
};

export default useFormValidate;
