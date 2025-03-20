'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
        {product.image.startsWith('/') ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-xs text-gray-400">{product.name}</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">฿{product.price.toLocaleString()}</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        <span className="mx-2 w-8 text-center text-gray-900 dark:text-white">{quantity}</span>
        
        <button 
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-white">฿{(product.price * quantity).toLocaleString()}</p>
        <button 
          onClick={() => removeFromCart(product.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          ลบ
        </button>
      </div>
    </div>
  );
}
