'use client';

import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { useState } from 'react';
import Link from 'next/link';

export default function Cart() {
  const { cart, clearCart, totalItems, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">ตะกร้าสินค้า</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-lg">ตะกร้าว่างเปล่า</p>
                <p className="text-sm mt-2">เลือกสินค้าที่คุณต้องการเพิ่มลงในตะกร้า</p>
              </div>
            ) : (
              cart.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">รวมทั้งสิ้น</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={clearCart}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                disabled={cart.items.length === 0}
              >
                ล้างตะกร้า
              </button>
              <Link 
                href="/checkout"
                className={`flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center ${
                  cart.items.length === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                }`}
                onClick={() => {
                  if (cart.items.length > 0) {
                    setIsOpen(false);
                  }
                }}
              >
                ชำระเงิน
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
