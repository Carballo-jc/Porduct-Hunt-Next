export default function validateLogin(values) {
  let errores = {};

  // validar el email
  if (!values.email) {
    errores.email = "El Email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errores.email = "Email no válido";
  }

  // validar el password
  if (!values.password) {
    errores.password = "El password es obligatorio";
  } else if (values.password.length < 6) {
    errores.password = "El password debe ser de al menos 6 caracteres";
  }

  return errores;
}
