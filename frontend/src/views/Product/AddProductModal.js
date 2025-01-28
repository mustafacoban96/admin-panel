import React, { useState } from 'react'
import Modal from '../../components/Modals/Modal'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addProductSchema } from '../../validations/ValidationSchema';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/products/productSlice';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddProductModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            console.log(values); // Handle form values here
            await dispatch(addProduct({ product: values })).unwrap()
            navigate("/products")
            setTimeout(() => {
                toast.success('Ürün başarıyla eklendi!', {
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
            }, 100);
        } catch (error) {
            toast.error("Ürün eklenemedi.....", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    return (
        <div className="min-h-screen w-72 flex items-center justify-center bg-gray-100">
            <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
                Modal Aç
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Yeni Ürün Ekle"
            >
                <div className="bg-lightBack dark:bg-darkBack p-6 rounded-lg shadow-lg max-w-xl mx-auto">
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            price: '',
                            stock: '',
                        }}
                        validationSchema={addProductSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-lg font-medium text-lText dark:text-dText mb-2">
                                    Ürün Adı
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-lText dark:text-dText mb-2">
                                    Açıklama
                                </label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="price" className="block text-lg font-medium text-lText dark:text-dText mb-2">
                                    Fiyat
                                </label>
                                <Field
                                    type="number"
                                    id="price"
                                    name="price"
                                    className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="stock" className="block text-lg font-medium text-lText dark:text-dText mb-2">
                                    Stok
                                </label>
                                <Field
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    className="w-full px-4 py-2 border border-lText dark:border-dText rounded-md focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon bg-white dark:bg-dMainBack text-lText dark:text-darkTxtTitle"
                                />
                                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-lIcon text-lightBack dark:text-darkTxtTitle py-2 px-4 rounded-md hover:bg-lIcon dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon"
                            >
                                Ürünü Ekle
                            </button>
                        </Form>
                    </Formik>
                    <ToastContainer />
                </div>
            </Modal>
        </div>
    );
};

export default AddProductModal;
