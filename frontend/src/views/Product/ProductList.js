import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, getAllProducts } from '../../features/products/productSlice';
import { Link } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import ErrorAlerts from '../../components/Alerts/ErrorAlerts';
import { FiTrash2 } from 'react-icons/fi'; // React Icons
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal'; // Importing modal
import { FaPlus } from 'react-icons/fa';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(getAllProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Set the app element for accessibility (to fix the warning)
  useEffect(() => {
    Modal.setAppElement('#root'); // Make sure to target the correct root element
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProductId)).unwrap();
      await dispatch(fetchProducts()).unwrap();
      setIsModalOpen(false); // Close the modal after success
      toast.success('Ürün başarıyla silindi!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      
    } catch (error) {
      toast.error("Ürün silinemedi.....", {
        position: "top-right",
        autoClose: 1500,
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

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // if (error) {
  //   return <ErrorAlerts error="Ürünler getirilemedi........" />;
  // }

  return (
    <div className="min-h-screen bg-lightBack dark:bg-darkBack text-lText dark:text-darkTxtTitle">
      <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product List</h2>
          <Link
              style={{textDecoration:'none'}}
              to={'/product/add'}
              className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <span className="mr-2">Add Product</span>
              <FaPlus className="w-5 h-5" />
        </Link>
        </div>
        <div className="overflow-x-auto bg-white dark:bg-dMainBack shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-lMainBack dark:bg-dMainBack">
              <tr>
                <th>Delete</th>
                <th className="">Product Name</th>
                <th>Description</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Stock</th>
                <th className="px-4 py-2 text-center">Detail</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-y-2 border-solid border-darkBack dark:border-lMainBack"
                >
                  <td className="px-4 py-3 text-left">
                    <button
                      onClick={() => openModal(product.id)}
                      className="flex items-center justify-center p-1.5 bg-red-800 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-left">{product.name}</td>
                  <td className="px-4 py-3 text-left">{product.description}</td>
                  <td className="px-4 py-3 text-center">${product.price}</td>
                  <td className="px-4 py-3 text-center">{product.stock}</td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/product/${product.id}`}
                      className="bg-lIcon text-white py-2 px-4 rounded-md hover:bg-lIcon dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-lIcon dark:focus:ring-dIcon"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"  // Increased z-index to 50
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"  // Increased z-index to 50
      >
        <div className="bg-white dark:bg-dMainBack p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this product?</h3>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

export default ProductList;
