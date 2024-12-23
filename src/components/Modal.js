import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 border rounded-md shadow-md w-96 max-h-96">
                <div
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 text-lg"
                >
                    X
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
