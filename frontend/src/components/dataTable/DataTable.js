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

import React from 'react'

const DataTable = () => {
    /*
        custom features were made comment
    
    
    */ 
    // const dispatch = useDispatch();
    // const { products, isLoading, error } = useSelector(getAllProducts);
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);


    // useEffect(() => {
    //     dispatch(fetchProducts());
    //   }, [dispatch]);

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

    //   const filteredItems = products.filter(
    //     (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    //   );

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

      const handleDeleteClick = () => setOpenConfirmModal(true);
      const handleConfirmDelete = () => {
        console.log('Deleted items:', selectedRows);
        setOpenConfirmModal(false);
        setSelectedRows([]);
        };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (error) {
//     return <ErrorAlerts error="Ürünler getirilemedi..." />;
//   }

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-darkBack text-darkTxtTitle' : 'bg-lightBack text-ltxtTitle'}`}>
      <div className="flex-col justify-left mb-4">
        {selectedRows.length > 0 && (
          <button
          onClick={handleDeleteClick}
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <Delete className="mr-2" />
          Sil ({selectedRows.length})
        </button>
        )}
        <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-semibold pt-4 pl-3`}>Ürünler Listesi</div>
      </div>

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
  );
  
}

export default DataTable
