import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, getSelectedProduct, updateProduct } from "../../features/products/productSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import ErrorAlerts from "../../components/Alerts/ErrorAlerts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UpdateProductSchema } from "../../validations/ValidationSchema";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getSelectedProduct);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedProduct = {
      id: productId,
      ...(values.name && { name: values.name }),
      ...(values.description && { description: values.description }),
      ...(values.price && { price: values.price }),
      ...(values.stock && { stock: values.stock }),
    };

    try {
      await dispatch(updateProduct({ productId, updatedProduct })).unwrap();
      toast.success("Ürün başarıyla güncellendi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      await dispatch(fetchProductById(productId)).unwrap();
    } catch (error) {
      toast.error("Ürün güncellenemedi.....", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <ErrorAlerts />;
  }

  return (
    <>
      <div className="p-6 max-w-xl mx-auto bg-white dark:bg-darkBack rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-lText dark:text-darkTxtTitle">Ürün detayı</h2>

        <Formik
          initialValues={{
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || "",
            stock: product?.stock || "",
          }}
          validationSchema={UpdateProductSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-lg font-medium text-lText dark:text-darkTxtTitle mb-2" htmlFor="name">
                  Product Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-lText dark:text-darkTxtTitle mb-2" htmlFor="description">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-lText dark:text-darkTxtTitle mb-2" htmlFor="price">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-lText dark:text-darkTxtTitle mb-2" htmlFor="stock">
                  Stock
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-lIcon text-lightBack dark:text-darkTxtTitle py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetail;
