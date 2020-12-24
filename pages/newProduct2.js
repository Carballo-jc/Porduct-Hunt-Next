import React, { useState, useContext, useCallback } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Campo, Error, Form, InputSubmit } from "../components/ui/Form";
import { FirebaseContext } from "../firebase";
// import FileUploader from "react-firebase-file-uploader";
import Dropzone, { useDropzone } from "react-dropzone";
import Router, { useRouter } from "next/router";

import useFormValidate from "../hooks/useFormValidate";
import validateNewProduct from "../validate/validateNewProduct";

const INITIAL_STATE = {
  name: "",
  url: "",
  image: "",
  company: "",
  description: "",
};
const NewProduct = () => {
  //state de las imagenes
  const [nameimage, setNameImage] = useState("");
  const [uploader, setUploader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlimage, setUrlImage] = useState("");

  const [error, setError] = useState(null);
  const {
    values,
    errors,
    handleSubmit,
    handleInputChange,
    handleBlur,
  } = useFormValidate(INITIAL_STATE, validateNewProduct, newProduct);

  const { name, url, image, company, description } = values;
  const router = useRouter();
  //context con las operaciones del crud de firebase
  const { user, firebase } = useContext(FirebaseContext);
  async function newProduct() {
    // si el usuario no esta autenticado llevar al login
    if (!user) {
      return router.push("/login");
    }
    // crear el objeto de nuevo producto
    const product = {
      name,
      company,
      url,
      urlimage,
      description,
      votes: 0,
      comments: [],
      create: Date.now(),
      creador: {
        id: user.uid,
        name: user.displayName,
      },
      haVotado: [],
    };
    // insertarlo en la base de datos
    await firebase.db.collection("products").add(product);
    return router.push("/");
  }
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const handleUploadStart = () => {
  //   setUploader(true);
  //   setProgress(0);
  //   console.log("handleUploadStart");
  // };

  // const handleProgress = (progress) => setProgress({ progress });

  // const handleUploadError = (error) => {
  //   setUploader(error);
  //   console.error(error);
  //   console.log("handleUploadError");
  // };

  const handleUploadSuccess = ({ name }) => {
    console.log(firebase, "aqui");
    setProgress(100);
    setUploader(false);
    setNameImage(name);
    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then((url) => setUrlImage(url));
    console.log("handleUploadSuccess");
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
          Nuevo Producto
        </h1>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Información General</legend>

            <Campo>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre del Producto"
                value={name}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errors.name && <Error> El nombre es Obligatorio</Error>}
            <Campo>
              <label htmlFor="company">Empresa</label>
              <input
                type="text"
                name="company"
                id="company"
                placeholder="Nombre de tu empresa o Compañia"
                value={company}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errors.company && <Error> El nombre es Obligatorio</Error>}
            <Campo>
              <label htmlFor="image">Imagen</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  handleUploadSuccess(acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {/* <FileUploader
                accept="image/*"
                name="image"
                id="image"
                randomizeFilename
                storageRef={firebase.storage.ref("products")}
                onUploadStart={() => handleUploadStart}
                onUploadError={() => handleUploadError}
                onUploadSuccess={() => handleUploadSuccess}
                onProgress={() => handleProgress}
              /> */}
            </Campo>

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                name="url"
                placeholder="URL de tu Producto"
                id="url"
                value={url}
                onChange={handleInputChange}
              />
            </Campo>
            {errors.url && <Error>Debe Colocar una URL</Error>}
          </fieldset>
          <fieldset>
            <legend>Sobre tu Producto</legend>
            <Campo>
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errors.description && <Error>Debe Colocar una descripcion</Error>}
          </fieldset>

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Crear Producto" />
        </Form>
      </>
    </Layout>
  );
};
export default NewProduct;
