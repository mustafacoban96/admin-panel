import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { UpdateProductSchema } from '../../validations/ValidationSchema'; // Validation schema
import Modal from '../../components/Modals/Modal';
import { fetchProducts, updateProduct } from '../../features/products/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast, Bounce } from 'react-toastify';

const UpdateProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [productId,setProductId] = useState(product.id);

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedProduct = {
      id: productId,
      ...(values.name && { name: values.name }),
      ...(values.description && { description: values.description }),
      ...(values.price && { price: values.price }),
      ...(values.stock && { stock: values.stock }),
    };
  
  try {
        await dispatch(updateProduct({ productId,updatedProduct })).unwrap();
          //navigate("/products");
          setTimeout(() => {
              toast.success("Ürün başarıyla güncellendi!", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                });
          },100)
          dispatch(fetchProducts())
          onClose(); // Close the modal on success      
       
      } catch (error) {
        toast.error("Ürün güncellenemedi.....", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } finally {
        setSubmitting(false);
        
      }
    };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ürünü Güncelle">
      <div className="p-6 rounded-lg shadow-lg max-w-xl mx-auto bg-lightBack dark:bg-darkBack">
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
    </Modal>
  );
};

export default UpdateProductModal;
