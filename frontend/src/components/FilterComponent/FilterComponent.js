import React from 'react'

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Ürünleri filtrele..."
        className="p-2 border border-gray-300 rounded focus:outline-red-300 dark:bg-dMainBack dark:focus:outline-red-300"
        value={filterText}
        onChange={onFilter}
      />
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Temizle
      </button>
    </div>
  )
}

export default FilterComponent

