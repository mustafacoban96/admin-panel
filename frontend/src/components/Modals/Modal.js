import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null); // reference to the modal content

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if clicked outside
      }
    };

    if (isOpen) {
      // Only add the event listener when the modal is open
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener when the component is unmounted or modal closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Don't render the modal if isOpen is false

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close the modal if the backdrop is clicked
    >
      <div
        ref={modalRef} // Attach the ref to the modal content
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 w-3/6 max-w-4xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white pl-4 pt-2">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-all pr-5"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
