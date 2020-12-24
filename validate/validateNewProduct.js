export default function validarNewProduct(values) {
  let errores = {};

  // Validar el nombre del usuario
  if (!values.name) {
    errores.name = "El Nombre es obligatorio";
  }

  // validar empresa
  if (!values.company) {
    errores.company = "Nombre de Empresa es obligatorio";
  }

  // validar la url
  if (!values.url) {
    errores.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errores.url = "URL mal formateada o no válida";
  }

  // validar descripción.
  if (!values.description) {
    errores.description = "Agrega una descripción de tu producto";
  }

  return errores;
}
