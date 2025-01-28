import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, getAllProducts } from '../../features/products/productSlice';
import Spinner from '../../components/Spinner/Spinner';
import ErrorAlerts from '../../components/Alerts/ErrorAlerts';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

createTheme('customTheme', {
  text: { primary: '#1f2937', secondary: '#4b5563' },
  background: { default: '#e5e7eb' },
  context: { background: '#991b1b', text: '#ffffff' },
  divider: { default: '#d1d5db' },
  button: { default: '#991b1b', hover: 'rgba(153, 27, 27, 0.8)', focus: 'rgba(153, 27, 27, 0.9)', disabled: 'rgba(153, 27, 27, 0.4)' },
  sortFocus: { default: '#991b1b' },
}, 'light');

createTheme('customDarkTheme', {
  text: { primary: '#e5e7eb', secondary: '#9ca3af' },
  background: { default: '#1e293b' },
  context: { background: '#991b1b', text: '#ffffff' },
  divider: { default: '#2c2c2c' },
  button: { default: '#e5e7eb', hover: 'rgba(229, 231, 235, 0.8)', focus: 'rgba(229, 231, 235, 0.9)', disabled: 'rgba(229, 231, 235, 0.4)' },
  sortFocus: { default: '#e5e7eb' },
}, 'dark');



const Settings = () => {
  
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(getAllProducts);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const columns = [
    { name: <strong>Ürün Adı</strong>, selector: (row) => row.name, sortable: true },
    { name: <strong>Ürün Detayı</strong>, selector: (row) => row.description, sortable: true },
    { name: <strong>Fiyat</strong>, selector: (row) => row.price, sortable: true },
    { name: <strong>Stok</strong>, selector: (row) => row.stock, sortable: true },
    {
      name: 'Ürün Detayı',
      selector: (row) => (
        <Link
          style={{textDecoration:'none'}}
          to={`/product/${row.id}`} // Route with dynamic product ID
          className="inline-block px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Detay
        </Link>
      ),
    },
  ];

  const filteredItems = products.filter(
    (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);


  /////////////////////////delete part

  const handleDeleteClick = () => setOpenConfirmModal(true);
  const handleConfirmDelete = async () => {
    try {
      // Loop through selected rows and delete each product by its ID
      for (const product of selectedRows) {
        await dispatch(deleteProduct(product.id)).unwrap();
      }
      // Fetch updated products after deletion
      await dispatch(fetchProducts()).unwrap();
      // Ensure that toast is triggered only after the deletion and fetch are done
      toast.success('Ürün(ler) başarıyla silindi!', {
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
  
    // Reset selected rows and close modal
    setOpenConfirmModal(false);
    setSelectedRows([]);
  };

  //////////////////////////////////delete part

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlerts error="Ürünler getirilemedi..." />;
  }

  return (
    <>
    <div className={`p-4 ${isDarkMode ? 'bg-darkBack text-darkTxtTitle' : 'bg-lightBack text-ltxtTitle'}`}>
      <div className="flex mb-4 justify-between px-5">
        
        <div className='w-60 rounded-md'>
        <Link
                style={{textDecoration:'none'}}
                to={'/product/add'}
                className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <span className="mr-2">Add Product</span>
                <FaPlus className="w-5 h-5" />
          </Link>
        </div>
        {selectedRows.length > 0 && (
          <button
          onClick={handleDeleteClick}
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <Delete className="mr-2" />
          Sil ({selectedRows.length})
        </button>
        )}      
      </div>
      <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-semibold pt-4 pl-3`}>Ürünler Listesi</div>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        persistTableHead
        theme={isDarkMode ? 'customDarkTheme' : 'customTheme'}
        customStyles={{
          rows: {
            style: {
              borderTop: '1px solid', // Border for every row
              borderColor: isDarkMode ? '#e5e7eb' : '#262626', // Dark or Light border color
            },
          },
          
        }}
      />

      {openConfirmModal && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isDarkMode ? 'bg-black/50' : 'bg-gray-500/50'}`}>
          <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg w-96`}>
            <div className={`text-${isDarkMode ? 'white' : 'black'} text-xl font-semibold mb-4`}>
              Ürünleri Sil
            </div>
            <div className={`text-${isDarkMode ? 'white' : 'black'} mb-6`}>
              Seçili ürünleri silmek istediğinize emin misiniz?
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                variant="contained"
                onClick={() => setOpenConfirmModal(false)}
                className={`bg-${isDarkMode ? 'gray-600' : 'gray-300'} text-${isDarkMode ? 'white' : 'black'} hover:bg-${isDarkMode ? 'gray-500' : 'gray-400'}`}
              >
                İptal
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
                className={`bg-${isDarkMode ? 'red-600' : 'red-500'} text-white hover:bg-${isDarkMode ? 'red-500' : 'red-400'}`}
              >
                Sil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    <ToastContainer/>
    </>
  );
};

export default Settings;
